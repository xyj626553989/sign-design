import { FC } from 'react';
import Menu, { MenuProps as MenuProperties } from './Menu';
import SubMenu, { SubMenuProps as SubMenuProperties } from './SubMenu';
import MenuItem, { MenuItemProps as MenuItemProperties } from './MenuItem';

export type MenuComponent = FC<MenuProperties> & {
  Item: FC<MenuItemProperties>;
  SubMenu: FC<SubMenuProperties>;
};
const TransMenu = Menu as MenuComponent;
TransMenu.Item = MenuItem;
TransMenu.SubMenu = SubMenu;

export default TransMenu;
