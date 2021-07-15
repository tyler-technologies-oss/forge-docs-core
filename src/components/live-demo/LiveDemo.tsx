import React, { FC } from 'react';
import classnames from 'classnames';
import { CodeSwitcher } from '../code-switcher/CodeSwitcher';

// import styles from './LiveDemo.module.scss';

export interface LiveDemoArgs {
  padded: boolean;
  layout: string;
  dense: boolean;
  codeHtml: string;
  codeTs: string;
  codeBlazor: string;
  codeScss: string;
  fullWidth: boolean;
} 

export const LiveDemo: FC<LiveDemoArgs> = ({
  children,
  padded = true,
  layout = 'row',
  dense = false,
  codeHtml = '',
  codeTs = '',
  codeBlazor = '',
  codeScss = '',
  fullWidth = false
}) => {
  const containerClasses = classnames(
    'container',
    {
      'container--dense': dense,
      'container--layout-row': layout === 'row',
      'container--layout-column': layout === 'column',
    }
  );

  const demoContainerClasses = classnames(
    'inner',
    {
      'inner--padded': padded    
    }
  );

  return (
    <div className={containerClasses}>
      <div className={demoContainerClasses}>
        <div style={{width: fullWidth ? '100%' : 'auto'}}>{children}</div>
      </div>
      <CodeSwitcher codeHtml={codeHtml} codeTs={codeTs} codeScss={codeScss} codeBlazor={codeBlazor}/>
    </div>
  );
};
