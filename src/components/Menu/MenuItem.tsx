/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { CSSProperties, FC, useContext, useCallback } from 'react';
import classNames from 'classnames';
import MenuContext, { MenuContextProps as MenuContextProperties } from './MenuContext';

export interface MenuItemProps {
  index?: string;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
}

const MenuItem: FC<MenuItemProps> = (properties) => {
  const { index, disabled, className, style, children } = properties;
  const context = useContext<MenuContextProperties>(MenuContext);
  const classes = classNames('menu-item', className, {
    'menu-item-disabled': disabled,
    'menu-item-active': context.index === index,
  });
  const handleClick = useCallback(() => {
    if (context.onSelect && !disabled && typeof index === 'string') {
      context.onSelect(index);
    }
  }, [index, disabled, context]);
  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  );
};
MenuItem.displayName = 'MenuItem';
export default MenuItem;
