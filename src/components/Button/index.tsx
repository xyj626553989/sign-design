import React, { ButtonHTMLAttributes, forwardRef, AnchorHTMLAttributes } from 'react';
import classNames from 'classnames';

export type ButtonSize = 'lg' | 'sm';
export type ButtonType = 'primary' | 'default' | 'danger' | 'link';

interface BaseButtonProps {
  className?: string;
  disabled?: boolean;
  size?: ButtonSize;
  btnType?: ButtonType;
  href?: string;
  isLoading?: boolean;
  block?: boolean;
}
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLButtonElement>;
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLAnchorElement>;
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
const InternalButton: React.ForwardRefRenderFunction<unknown, ButtonProps> = (properties, reference) => {
  const { btnType, disabled, size, children, href, className, block, ...properties_ } = properties;
  const buttonReference = (reference as any) || React.createRef<HTMLElement>();
  const classes = classNames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === 'link' && disabled,
    [`btn-block`]: block,
  });
  /**
   * link
   */
  if (btnType === 'link' && href) {
    return (
      <a className={classes} href={href} ref={buttonReference} {...properties_}>
        {children}
      </a>
    );
  }
  /**
   * button
   */
  return (
    <button ref={buttonReference} disabled={disabled} className={classes} {...properties_}>
      {children}
    </button>
  );
};
const Button = forwardRef<unknown, ButtonProps>(InternalButton);
Button.defaultProps = {
  disabled: false,
  btnType: 'default',
  type: 'button',
};
export default Button;
