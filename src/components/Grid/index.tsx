import * as React from 'react';
import csstype from 'csstype';
import cx from '../../utils/classnames';
import { CommonProps } from '../BaseComponent';
import { GridBreakpoint, GridSize } from './types';
import * as styles from './styles.scss';

export * from './types';

interface GridProps extends GridBreakpoint, CommonProps {
  container?: boolean;
  item?: boolean;
  spacing?: number;
  nowrap?: boolean;
  direction?: csstype.FlexDirectionProperty;
  justifyContent?: csstype.JustifyContentProperty;
  alignItem?: csstype.AlignItemsProperty;
}

const defaultProps: GridProps = {
  component: 'div',
  container: false,
  item: false,
  nowrap: false,
};

export const Grid = React.forwardRef((props: GridProps, ref: any) => {
  const {
    component: Component,
    className,
    container,
    item,
    nowrap,
    direction,
    justifyContent,
    alignItem,
    xs,
    lg,
    xl,
    md,
    sm,
    spacing,
    ...rest
  } = { ...defaultProps, ...props };

  const classOfComponent = cx(className, {
    [styles.grid]: container,
    [styles.item]: item,
    [styles.wrap]: !nowrap,
    [styles[direction]]: !!direction,
    [styles[`s-${spacing}`]]: !!spacing,
    [styles[`justify-${justifyContent}`]]: !!justifyContent,
    [styles[`align-${alignItem}`]]: !!alignItem,
    [styles[`xs-${xs as string}`]]: xs !== undefined,
    [styles[`sm-${sm as string}`]]: sm !== undefined,
    [styles[`md-${md as string}`]]: md !== undefined,
    [styles[`lg-${lg as string}`]]: lg !== undefined,
    [styles[`xl-${xl as string}`]]: xl !== undefined,
  });

  return <Component className={classOfComponent} {...rest} ref={ref} />;
});

Grid.displayName = 'Grid';

export default Grid;
