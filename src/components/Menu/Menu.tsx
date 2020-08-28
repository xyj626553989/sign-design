import React, { CSSProperties, FC, useState, useCallback } from 'react';
import classNames from 'classnames';
import MenuContext, { MenuTheme, MenuContextProps as MenuContextProperties } from './MenuContext';
import { MenuItemProps as MenuItemProperties } from './MenuItem';

export type mode = 'horizontal' | 'vertical';
export interface MenuProps {
  defaultIndex?: string;
  className?: string;
  mode?: mode;
  style?: CSSProperties;
  theme?: MenuTheme;
  onSelect?: (selectedIndex: string) => void;
  defaultOpenedSubmenu?: string[];
}

const Menu: FC<MenuProps> = (properties) => {
  const { className, theme, mode, style, children, onSelect, defaultIndex, defaultOpenedSubmenu } = properties;
  const [currentActive, setCurrentActive] = useState<string>(defaultIndex);
  const classes = classNames('s-menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical',
    [`menu-${theme}`]: theme !== undefined,
  });
  const handleClick = useCallback(
    (index: string) => {
      setCurrentActive(index);
      if (onSelect) {
        onSelect(index);
      }
    },
    [onSelect],
  );
  const contextValue: MenuContextProperties = {
    onSelect: handleClick,
    index: currentActive || '0',
    mode,
    defaultOpenedSubmenu,
  };
  const renderChildren = () => {
    return React.Children.map(children, (child, index: number) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProperties>;
      const { displayName } = childElement.type;
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement, {
          index: index.toString(),
        });
      }
      console.error('Warning: Menu has a child which is not MenuItem or SubMenu component');
      return null;
    });
  };
  return (
    <ul data-testid="menu" className={classes} style={style}>
      <MenuContext.Provider value={contextValue}>{renderChildren()}</MenuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
  theme: 'light',
  defaultOpenedSubmenu: [],
};

export default Menu;
