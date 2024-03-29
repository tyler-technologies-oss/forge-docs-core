import { ForgeButton } from '@tylertech/forge-react';
import React, { FC, ButtonHTMLAttributes } from 'react';

export type ButtonType =
  'raised'
  | 'elevated'
  | 'outlined'
  | 'dense'
  | 'raised-dense'
  | 'elevated-dense'
  | 'outlined-dense';

export interface LinkButtonArgs extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  iconClass?: string;
  icon?: string;
  text?: string;
  buttonType?: ButtonType;
}

export const LinkButton: FC<LinkButtonArgs> = ({ children, href = '', iconClass = 'tyler-icons', icon, text, buttonType = 'raised', type }) => (
  <a href={href}>
    <ForgeButton type={buttonType}>
      <button type={type}>
        {icon && <i className={iconClass}>{icon}</i>}
        {text || children}
      </button>
    </ForgeButton>
  </a>
);
