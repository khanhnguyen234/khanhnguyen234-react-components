import * as React from 'react';
export interface CommonProps extends React.HTMLAttributes<HTMLElement> {
  component?: React.ElementType
  className?: string
  style?: React.CSSProperties
  children?: any
}