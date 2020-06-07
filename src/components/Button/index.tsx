import * as React from 'react';
import Button from '@material-ui/core/Button';
import { CommonProps } from '../BaseComponent'
import cn from '../../utils/classnames'
import * as styles from './styles.scss';

interface ButtonProps extends CommonProps {
  onClick?: () => void;
  disabled?: boolean;
}

export const ButtonExt = React.forwardRef((props: ButtonProps, ref) => {
  const {    
    className,
    children,
    disabled
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
      {...props}
    >
      {children}
    </Button>
  );
})

ButtonExt.displayName = 'ButtonExt'

export default ButtonExt
