import React, { FC } from 'react'
import { MDXProvider } from '@mdx-js/react';

import {
  Blockquote,
  Code,
  CodeSwitcher,
  ContentDivider,
  ImageBlock,
  LinkButton,
  LiveDemo,
  MethodDef,
  PageSection,
  PropertyDef,
} from '../components';
import { ThemeWrapper } from './StorybookTheme';


export const TcwStorybookMdxComponents = {
  wrapper: ({ children, ...props }: any) => {
    return <div>{children}</div>;
  },
  h1: (props: any) => <h1 {...props} className="tyl-typography--title">{props.children}</h1>,
  h2: (props: any) => <h2 {...props} className="tyl-typography--headline5 tyl-storybook--header1">{props.children}</h2>,
  h3: (props: any) => <h3 {...props} className="tyl-typography--subtitle1-secondary tyl-storybook--header2">{props.children}</h3>,
  p: (props: any) => <p {...props} className="tyl-typography--body1 tyl-storybook--body1" />,
  section: (props: any) => <section {...props} className="tyl-storybook__section">{props.children}</section>,
  blockquote: (props: any) => <Blockquote {...props} />,
  hr: (props: any) => <ContentDivider {...props} />,
  inlineCode: (props: any) => <ThemeWrapper><code className="tyl-storybook__inline-code">{props.children}</code></ThemeWrapper>,
  code: (props: any) => <ThemeWrapper><Code {...props} /></ThemeWrapper>,
  pre: (props: any) => <div {...props}></div>,
  CodeSwitcher: (props: any) => <ThemeWrapper><CodeSwitcher {...props}/></ThemeWrapper>,
  ContentDivider,
  ImageBlock,
  LiveDemo,
  LinkButton,
  MethodDef,
  PropertyDef,
  PageSection,
};

export const TcwStorybookMdxProvider: FC = ({ children }) => {
  return <MDXProvider components={TcwStorybookMdxComponents}>{children}</MDXProvider>;
};