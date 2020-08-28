import { createContext } from 'react';
import { mode } from './Menu';

export type MenuTheme = 'light' | 'dark';
export interface MenuContextProps {
  index: string;
  onSelect?: (selectIndex: string) => void;
  mode?: mode;
  defaultOpenedSubmenu?: string[];
}
const MenuContext = createContext<MenuContextProps>({ index: '0' });
export default MenuContext;
