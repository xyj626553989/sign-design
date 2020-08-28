import React from 'react';
import { action } from '@storybook/addon-actions';
import { Story, Meta } from '@storybook/react/types-6-0';
import Button, { ButtonProps as ButtonProperties } from '.';

export default {
  title: 'Components/Button',
  component: Button,
} as Meta;
const Template: Story<ButtonProperties> = (properties) => (
  <Button onClick={action('button-click')} {...properties}>
    Button
  </Button>
);
export const Default = Template.bind({});
export const Primary = Template.bind({});
export const Danger = Template.bind({});
export const Link = Template.bind({});
export const Large = Template.bind({});
export const Sm = Template.bind({});
export const Disabled = Template.bind({});
export const LinkDisabled = Template.bind({});
export const Block = Template.bind({});
Block.args = {
  block: true,
};
Primary.args = {
  btnType: 'primary',
};
Danger.args = {
  btnType: 'danger',
};
Link.args = {
  btnType: 'link',
  href: '//www.baidu.com',
};
Large.args = {
  size: 'lg',
};
Sm.args = {
  size: 'sm',
};
Disabled.args = {
  disabled: true,
};
LinkDisabled.args = {
  btnType: 'link',
  href: '//www.baidu.com',
  disabled: true,
};
