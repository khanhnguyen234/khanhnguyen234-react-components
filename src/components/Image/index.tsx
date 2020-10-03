import * as React from "react";
import { CommonProps } from "../BaseComponent";
import cn from "../../utils/classnames";
import * as styles from "./styles.scss";

interface ImageProps extends CommonProps {
  src: string;
  fallback?: string;
}

export const Image = React.forwardRef((props: ImageProps, ref) => {
  const { src, fallback, className, ...rest } = props;

  const classOfComponent = cn(styles.imgCpn, className);

  return <img src={src} className={classOfComponent} {...rest} />;
});

Image.displayName = "Image";

export default Image;
