import React from 'react';
import { render, RenderResult, fireEvent, cleanup, waitFor } from '@testing-library/react';
import Menu, { MenuProps as MenuProperties } from './Menu';
import MenuItem from './MenuItem';
import SubMenu from './SubMenu';

const testProperties: MenuProperties = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test',
};
const testVerProperties: MenuProperties = {
  defaultIndex: '0',
  mode: 'vertical',
};
const getMenu = (properties: MenuProperties) => {
  return (
    <Menu {...properties}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>xyj</MenuItem>
      <SubMenu title="dropdown">
        <MenuItem>drop1</MenuItem>
      </SubMenu>
    </Menu>
  );
};
const createStyleFile = () => {
  const cssFile = `
    .s-submenu {
      display:none
    }
    .s-submenu.menu-opened {
      display:block
    }
  `;
  const style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = cssFile;
  return style;
};
let wrapper: RenderResult;
let menuElement: HTMLElement;
let activeElement: HTMLElement;
let disabledElement: HTMLElement;
describe('test Menu and MenuItem component', () => {
  beforeEach(() => {
    wrapper = render(getMenu(testProperties));
    wrapper.container.append(createStyleFile());
    menuElement = wrapper.getByTestId('menu');
    activeElement = wrapper.getByText('active');
    disabledElement = wrapper.getByText('disabled');
  });
  it('should render the correct MenuItem and Menu based on default props', () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass('s-menu test');
    expect(menuElement.querySelectorAll(':scope > li').length).toEqual(4);
    expect(activeElement).toHaveClass('menu-item menu-item-active');
    expect(disabledElement).toHaveClass('menu-item menu-item-disabled');
  });
  it('click item should change active and call the right callback', () => {
    const thirdItem: HTMLElement = wrapper.getByText('xyj');
    fireEvent.click(thirdItem);
    expect(thirdItem).toHaveClass('menu-item-active');
    expect(activeElement).not.toHaveClass('menu-item-active');
    expect(testProperties.onSelect).toHaveBeenCalledWith('2');
    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass('menu-item-active');
    expect(testProperties.onSelect).not.toHaveBeenCalledWith('1');
  });
  it('should render vertical mode when mode is set to vertical', () => {
    cleanup();
    wrapper = render(getMenu(testVerProperties));
    menuElement = wrapper.getByTestId('menu');
    expect(menuElement).toHaveClass('menu-vertical');
  });

  it('should show dropdown items when hover on subMenu', async () => {
    expect(wrapper.queryByText('drop1')).not.toBeVisible();
    const dropdownElement = wrapper.getByText('dropdown');
    fireEvent.mouseEnter(dropdownElement);
    await waitFor(() => {
      expect(wrapper.queryByText('drop1')).toBeVisible();
    });
    fireEvent.click(wrapper.getByText('drop1'));
    expect(testProperties.onSelect).toHaveBeenCalledWith('3-0');
    fireEvent.mouseLeave(dropdownElement);
    await waitFor(() => {
      expect(wrapper.queryByText('drop1')).not.toBeVisible();
    });
  });
});
