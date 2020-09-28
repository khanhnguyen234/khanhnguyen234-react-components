import * as React from "react";

import camelCaseToKebabCase from "../../utils/camelToKebabCase";
import merge from "../../utils/merge";
import cx from "../../utils/classnames";

import { CommonProps } from "../BaseComponent";
import * as styles from "./styles.scss";

function memoize(fn: (arg: any) => any): any {
  const cache = {};

  return (arg: any) => {
    if (cache[arg] === undefined) {
      cache[arg] = fn(arg);
    }

    return cache[arg];
  };
}

const spacingKeys = [
  "m",
  "mt",
  "mr",
  "mb",
  "ml",
  "mx",
  "my",
  "p",
  "pt",
  "pr",
  "pb",
  "pl",
  "px",
  "py",
  "margin",
  "marginTop",
  "marginRight",
  "marginBottom",
  "marginLeft",
  "marginX",
  "marginY",
  "padding",
  "paddingTop",
  "paddingRight",
  "paddingBottom",
  "paddingLeft",
  "paddingX",
  "paddingY",
];

const properties = {
  m: "margin",
  p: "padding",
};

const directions = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"],
};

const aliases = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py",
};

// memoize() impact:
// From 300,000 ops/sec
// To 350,000 ops/sec
const getCssProperties = memoize((prop) => {
  // It's not a shorthand notation.
  if (prop.length > 2) {
    if (aliases[prop]) {
      prop = aliases[prop];
    } else {
      return [prop];
    }
  }

  const [a, b] = prop.split("");
  const property = properties[a];
  const direction = directions[b] || "";
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  return Array.isArray(direction)
    ? direction.map((dir) => property + dir)
    : [property + direction];
});

function getValue(propValue: string | number): string | number {
  if (typeof propValue === "string") {
    return propValue;
  }

  const transformed = Math.abs(propValue);

  if (propValue >= 0) {
    return transformed;
  }

  return -transformed;
}

function getStyleFromPropValue(cssProperties: any, breakpoint?: any): any {
  return (propValue: any) =>
    cssProperties.reduce((acc: any, cssProperty: any) => {
      const spacingKey = camelCaseToKebabCase(cssProperty);
      const spacingValue = getValue(propValue);
      const spacingClassName = breakpoint
        ? // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          styles[`spacing-${breakpoint}-${spacingKey}-${spacingValue}`]
        : // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          styles[`spacing-${spacingKey}-${spacingValue}`];

      acc[spacingClassName] = !!spacingValue;
      return acc;
    }, {});
}

function spacing(props: any, breakpoint?: any): any {
  return Object.keys(props)
    .map((prop) => {
      // Using a hash computation over an array iteration could be faster, but with only 28 items,
      // it's doesn't worth the bundle size.
      if (!spacingKeys.includes(prop)) {
        return null;
      }

      const cssProperties = getCssProperties(prop);
      const styleFromPropValue = getStyleFromPropValue(
        cssProperties,
        breakpoint
      );

      const propValue = props[prop];
      return styleFromPropValue && styleFromPropValue(propValue);
    })
    .reduce(merge, {});
}

interface SpacingKey {
  /**
   * The short-key of margin
   */
  m?: number;
  /**
   * The short-key of marginTop
   */
  mt?: number;
  /**
   * The short-key of marginRight
   */
  mr?: number;
  /**
   * The short-key of marginBottom
   */
  mb?: number;
  /**
   * The short-key of marginLeft
   */
  ml?: number;
  /**
   * The short-key of marginX
   */
  mx?: number;
  /**
   * The short-key of marginY
   */
  my?: number;
  /**
   * The short-key of padding
   */
  p?: number;
  /**
   * The short-key of paddingTop
   */
  pt?: number;
  /**
   * The short-key of paddingRight
   */
  pr?: number;
  /**
   * The short-key of paddingBottom
   */
  pb?: number;
  /**
   * The short-key of paddingLeft
   */
  pl?: number;
  /**
   * The short-key of paddingX
   */
  px?: number;
  /**
   * The short-key of paddingY
   */
  py?: number;
  /**
   * Property sets the margin area on all four sides of an element
   */
  margin?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginX?: number;
  marginY?: number;
  padding?: number;
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingX?: number;
  paddingY?: number;
}

interface BoxProps extends SpacingKey {}
interface BoxProps extends CommonProps {
  xs?: SpacingKey;
  sm?: SpacingKey;
  md?: SpacingKey;
  xl?: SpacingKey;
}

const defaultProps: BoxProps = {
  component: "div",
};

const defaultBreakpoint = ["xs", "sm", "md", "lg", "xl"];

export const Box = React.forwardRef((props: BoxProps, ref: any) => {
  const _props = { ...defaultProps, ...props };

  const {
    component: Component,
    className,
    xs,
    sm,
    md,
    xl,
    style,
    children,
    ...rest
  } = _props;

  const styledBreakPoint = defaultBreakpoint.map((key) =>
    spacing(Object.assign({}, _props[key]), key)
  );

  const classOfComponent = cx(
    styles.Box,
    spacing(Object.assign({}, rest)),
    ...styledBreakPoint,
    className
  );

  return (
    <Component className={classOfComponent} style={style} ref={ref}>
      {children}
    </Component>
  );
});

Box.displayName = "Box";

export default Box;
