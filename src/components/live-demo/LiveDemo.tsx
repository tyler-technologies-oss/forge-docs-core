import React, { FC } from 'react';
import classnames from 'classnames';
import { CodeSwitcher } from '../code-switcher/CodeSwitcher';

import styles from './LiveDemo.module.scss';

interface LiveDemoArgs {
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
    styles.container,
    {
      [styles.containerDense]: dense,
      [styles.containerLayoutRow]: layout === 'row',
      [styles.containerLayoutColumn]: layout === 'column',
    }
  );

  const demoContainerClasses = classnames(
    styles.inner,
    {
      [styles.innerPadded]: padded    
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
