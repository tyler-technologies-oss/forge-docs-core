import React, { useEffect, useRef, FC } from 'react';
import { Code } from '../code/Code';

import styles from './CodeSwitcher.module.scss';
import { ITabBarComponent, IViewSwitcherComponent } from '@tylertech/tyler-components-web';

interface CodeSwitcherArgs {
  codeHtml: string;
  codeTs: string;
  codeBlazor: string;
  codeScss: string;
} 

export const CodeSwitcher: FC<CodeSwitcherArgs> = ({
  codeHtml = '',
  codeTs = '',
  codeBlazor = '',
  codeScss = '',
}) => {
  const viewSwitcherRef = useRef<IViewSwitcherComponent>();

  const TabHtml: FC = () => codeHtml !== '' ? <tcw-tab>HTML</tcw-tab> : null;
  
  const TabTs: FC = () => codeTs !== '' ? <tcw-tab>TS</tcw-tab> : null;
  
  const TabScss: FC = () => codeScss !== '' ? <tcw-tab>SCSS</tcw-tab> : null;
  
  const TabBlazor: FC = () => codeBlazor !== '' ? <tcw-tab>Blazor</tcw-tab> : null;
  
  const CodeHtml: FC = () => codeHtml !== '' ? <tcw-view><Code className={'language-html'}>{codeHtml}</Code></tcw-view> : null;
  
  const CodeTs: FC = () => codeTs !== '' ? <tcw-view><Code className={'language-ts'}>{codeTs}</Code></tcw-view> : null;
  
  const CodeScss: FC = () => codeScss !== '' ? <tcw-view><Code className={'language-scss'}>{codeScss}</Code></tcw-view> : null;
  
  const CodeBlazor: FC = () => codeBlazor !== '' ? <tcw-view><Code className={'language-aspnet'}>{codeBlazor}</Code></tcw-view> : null;

  const TabBar: FC = () => {
    const tabBarRef = useRef<ITabBarComponent>();

    useEffect(() => {
      const tabBar = tabBarRef.current as ITabBarComponent;
      const viewSwitcher = viewSwitcherRef.current as IViewSwitcherComponent;
      viewSwitcher.index = 0;
      tabBar.activeTab = 0;
      tabBar.addEventListener('tcw-tab-bar-activate', onTabChanged as EventListenerOrEventListenerObject);

      function onTabChanged(evt: CustomEvent) {
        viewSwitcher.index = evt.detail.index;
      }
    });

    return (
      <tcw-tab-bar layout-mode="clustered" focus-on-activate="false" ref={tabBarRef}>
        <TabHtml/>
        <TabTs/>
        <TabScss/>
        <TabBlazor/>
      </tcw-tab-bar>
    );
  };

  const ViewSwitcher: FC = () => {
    return (
      <tcw-view-switcher ref={viewSwitcherRef}>
        <CodeHtml/>
        <CodeTs/>
        <CodeScss/>
        <CodeBlazor/>
      </tcw-view-switcher>
    );
  };

  const CodeExamples: FC = () => {
    const hasCode = codeHtml !== '' || codeTs !== '' || codeScss !== '';
    return hasCode ? (<div className={styles.codeExamples}>
      <TabBar/>
      <ViewSwitcher/>      
    </div>) : null;
  };

  return (<CodeExamples/>);
};

