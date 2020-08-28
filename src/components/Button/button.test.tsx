import React from 'react';
import { render } from '@testing-library/react';
import Button, { ButtonProps as ButtonProperties } from '.';

beforeEach(() => {
  jest.useFakeTimers();
});
afterEach(() => {
  jest.useRealTimers();
});
const createElement = (properties: ButtonProperties) => {
  const wrapper = render(
    <Button data-testid="button" {...properties}>
      Nice
    </Button>,
  );
  const element = wrapper.getByTestId('button');
  return element;
};
describe('test Button Component', () => {
  it('should render the correct default button', () => {
    const element = createElement({});
    expect(element).toBeTruthy();
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual('BUTTON');
    expect(element).toHaveClass('btn btn-default');
  });
  it('should render the correct based on different props', () => {
    const danger = createElement({ btnType: 'danger' });
    expect(danger).toHaveClass('btn-danger');
  });
  it('should render alink when btnType equals link and href is provided', () => {
    const element = createElement({ href: '//www.baidu.com', btnType: 'link' });
    expect(element.tagName).toEqual('A');
    expect(element).toHaveAttribute('href');
  });
  it('should render disabled when disabled is true', () => {
    const element = createElement({ disabled: true });
    expect(element).toBeDisabled();
  });
});
