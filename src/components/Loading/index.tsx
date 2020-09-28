import * as React from "react";
import cx from "../../utils/classnames";
import { CommonProps } from "../BaseComponent";
import { LoadingTypes, BackdropVariant } from "./types";
import * as styles from "./styles.scss";

export * from "./types";

interface LoadingProps extends CommonProps {
  type?: LoadingTypes;
  variant?: BackdropVariant;
  imageUrl?: string;
}

const defaultProps: LoadingProps = {
  component: "div",
  type: LoadingTypes.container,
  variant: BackdropVariant.grey,
  className: null,
};

export const Loading = React.forwardRef((props: LoadingProps, ref: any) => {
  const {
    component: Component,
    className,
    type,
    variant,
    imageUrl,
    ...rest
  } = {
    ...defaultProps,
    ...props,
  };

  const classOfLoading = cx(styles.loading, styles[`type-${type}`], className);

  return (
    <div
      className={cx(styles.backdrop, className, {
        [styles[variant]]: !!styles[variant],
      })}
    >
      <div {...rest} className={classOfLoading}>
        {imageUrl ? (
          <img src={imageUrl} className={styles.image} />
        ) : (
          <div className={styles.circle} />
        )}
      </div>
    </div>
  );
});

Loading.displayName = "Loading";

export default Loading;
