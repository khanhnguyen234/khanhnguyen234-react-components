import * as React from 'react';
import Button from '@material-ui/core/Button';
import { CommonProps } from '../BaseComponent'
import cn from '../../utils/classnames'
import * as styles from './styles.scss';

// CommonProps React.HTMLAttributes<HTMLElement> conflict with material-ui
// interface ButtonProps extends CommonProps {}
interface ButtonProps {
  disabled?: boolean;
  className?: string
  children?: any
  onClick: () => void
}

export const ButtonExt = React.forwardRef((props: ButtonProps, ref) => {
  const {    
    className,
    children,
    disabled,
    ...rest
  } = props
  
  const classOfComponent = cn(
    styles.button,
    className,
  )
  
  return (
    <Button 
      variant="contained"
      color="primary"
      className={classOfComponent}
      {...rest}
    >
      {children}
    </Button>
  );
})

ButtonExt.displayName = 'ButtonExt'

export default ButtonExt
