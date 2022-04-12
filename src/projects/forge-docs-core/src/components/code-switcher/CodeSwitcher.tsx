import React, { useEffect, useRef, FC } from 'react';
import { Code } from '../code/Code';
import { ITabBarComponent, IViewSwitcherComponent } from '@tylertech/forge';
import { ForgeTab, ForgeTabBar, ForgeView, ForgeViewSwitcher } from '@tylertech/forge-react';

export interface CodeSwitcherArgs {
  codeHtml: string;
  codeTs: string;
  codeScss: string;
};

export const CodeSwitcher: FC<CodeSwitcherArgs> = ({
  codeHtml = '',
  codeTs = '',
  codeScss = ''
}) => {
  const viewSwitcherRef = useRef<IViewSwitcherComponent>();
  const TabHtml: FC = () => codeHtml !== '' ? <ForgeTab>HTML</ForgeTab> : null;
  const TabTs: FC = () => codeTs !== '' ? <ForgeTab>TS</ForgeTab> : null;
  const TabScss: FC = () => codeScss !== '' ? <ForgeTab>SCSS</ForgeTab> : null;
  const CodeHtml: FC = () => codeHtml !== '' ? <ForgeView><Code className={'language-html'}>{codeHtml}</Code></ForgeView> : null;
  const CodeTs: FC = () => codeTs !== '' ? <ForgeView><Code className={'language-ts'}>{codeTs}</Code></ForgeView> : null;
  const CodeScss: FC = () => codeScss !== '' ? <ForgeView><Code className={'language-scss'}>{codeScss}</Code></ForgeView> : null;

  const TabBar: FC = () => {
    const tabBarRef = useRef<ITabBarComponent>();

    useEffect(() => {
      const tabBar = tabBarRef.current as ITabBarComponent;
      const viewSwitcher = viewSwitcherRef.current as IViewSwitcherComponent;
      viewSwitcher.index = 0;
      tabBar.activeTab = 0;
      tabBar.addEventListener('forge-tab-bar-activate', onTabChanged as EventListenerOrEventListenerObject);

      function onTabChanged(evt: CustomEvent): void {
        viewSwitcher.index = evt.detail.index;
      }
    });

    return (
      <ForgeTabBar layout-mode="clustered" focus-on-activate="false" ref={tabBarRef}>
        <TabHtml/>
        <TabTs/>
        <TabScss/>
      </ForgeTabBar>
    );
  };

  const ViewSwitcher: FC = () => (
    <ForgeViewSwitcher ref={viewSwitcherRef}>
      <CodeHtml/>
      <CodeTs/>
      <CodeScss/>
    </ForgeViewSwitcher>
  );

  const CodeExamples: FC = () => {
    const hasCode = codeHtml !== '' || codeTs !== '' || codeScss !== '';
    return hasCode ? (<div className={'code-examples'}>
      <TabBar />
      <ViewSwitcher />
    </div>) : null;
  };

  return <CodeExamples />;
};

