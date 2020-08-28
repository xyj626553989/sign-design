import React, { FC } from 'react';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);
type Theme = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark';
export interface IconProps extends FontAwesomeIconProps {
  theme?: Theme;
  className?: string;
}

const Icon: FC<IconProps> = (properties) => {
  const { className, theme, ...properties_ } = properties;
  const classes = classNames('s-icon', className, {
    [`icon-${theme}`]: theme,
  });
  return <FontAwesomeIcon className={classes} {...properties_} />;
};
export default Icon;
