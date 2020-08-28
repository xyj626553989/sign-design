import React, { FC, ReactElement, InputHTMLAttributes } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  disabled?: boolean;
  size?: 'lg' | 'sm';
  icon?: IconProp;
  prepend?: string | ReactElement;
  append?: string | ReactElement;
}

const Input: FC<InputProps> = (properties) => {
  const { size, prepend, append, ...properties_ } = properties;

  // 计算className
  return <input {...properties_} />;
};
export default Input;
