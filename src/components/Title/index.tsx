import * as React from 'react';
import cn from 'classnames'
import * as styles from './styles.scss';

export const Title = (props) => {
  const {    
    className,
    children,
  } = props

  const classOfComponent = cn(
    styles.title,
    className,
  )

  return (
    <p 
      className={classOfComponent}
      {...props}
    >
      {children || 'This is red title'}
    </p>
  );
}

export default Title