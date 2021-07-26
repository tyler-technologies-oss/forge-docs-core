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
  buttonType?: ButtonType
}

export const LinkButton: FC<LinkButtonArgs> = ({ children, href = '', iconClass = 'tyler-icons', icon, text, buttonType = 'raised', type }) => {
  return (
    <a href={href}>
      <tcw-button type={buttonType}>
        <button type={type}>
          {icon && <i className={iconClass}>{icon}</i>}
          {text || children}
        </button>
      </tcw-button>
    </a>
  );
};
