import * as React from 'react';
import cn from '../../utils/classnames'
import * as styles from './styles.scss';

export const Title = (props) => {
  const {    
    className,
    children,
    ...rest
  } = props

  const classOfComponent = cn(
    styles.title,
    className,
  )

  return (
    <p 
      className={classOfComponent}
      {...rest}
    >
      {children || 'This is red title'}
    </p>
  );
}

export default Title