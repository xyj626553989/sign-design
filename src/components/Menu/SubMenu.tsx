import React, { FunctionComponentElement, useState, FC, useContext, useCallback, ReactElement } from 'react';
import classNames from 'classnames';
import Transition from '../Transition';
import MenuContext, { MenuContextProps as MenuContextProperties } from './MenuContext';
import { MenuItemProps as MenuItemProperties } from './MenuItem';
import Icon from '../Icon';

export interface SubMenuProps {
  index?: string;
  title: string | ReactElement;
  className?: string;
}
let timer: any;
const SubMenu: FC<SubMenuProps> = (properties) => {
  const { index, title, className, children } = properties;
  const context = useContext<MenuContextProperties>(MenuContext);
  const openedSubmenu = context.defaultOpenedSubmenu as string[];
  const isOpened = index && context.mode === 'vertical' ? openedSubmenu.includes(index) : false;
  const [opened, setOpened] = useState<boolean>(isOpened);
  const classes = classNames('menu-item submenu-item', className, {
    'menu-item-active': context.index === index,
    'is-opened': opened,
    'is-vertical': context.mode === 'vertical',
  });
  const handleMouse = useCallback((event: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer);
    event.preventDefault();
    timer = setTimeout(() => {
      setOpened(toggle);
    }, 300);
  }, []);
  const handleClick = useCallback(() => {
    setOpened(!opened);
  }, [opened]);
  const clickEvents =
    context.mode === 'vertical'
      ? {
          onClick: handleClick,
        }
      : {};
  const hoverEvents =
    context.mode !== 'vertical'
      ? {
          onMouseEnter: (event: React.MouseEvent) => {
            handleMouse(event, true);
          },
          onMouseLeave: (event: React.MouseEvent) => {
            handleMouse(event, false);
          },
        }
      : {};
  const renderChildren = useCallback(() => {
    const subMenuClasses = classNames('s-submenu', {
      'menu-opened': opened,
    });
    const childrenComponent = React.Children.map(children, (child, i: number) => {
      const childElement = child as FunctionComponentElement<MenuItemProperties>;
      const { displayName } = childElement.type;
      if (displayName === 'MenuItem') {
        return React.cloneElement(childElement, {
          index: `${index}-${i}`,
        });
      }
      console.error('Warning: Menu has a child which is not MenuItem component');
      return null;
    });
    return (
      <Transition in={opened} unmountOnExit timeout={300} animation="zoom-in-top">
        <ul className={subMenuClasses}>{childrenComponent}</ul>
      </Transition>
    );
  }, [children, index, opened]);

  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents}>
        {title} <Icon size="sm" icon="angle-down" className="arrow-icon" />
      </div>
      {renderChildren()}
    </li>
  );
};

SubMenu.displayName = 'SubMenu';
export default SubMenu;
