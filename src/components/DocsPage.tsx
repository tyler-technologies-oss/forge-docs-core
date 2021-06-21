import React, { FC } from 'react';
import { 
  Title, 
  Subtitle, 
  Description, 
  Primary, 
  PRIMARY_STORY, 
  ArgsTable, 
  Stories 
} from '@storybook/addon-docs/blocks';


export const DocsPage: FC = () => (
  <>
    <Title />
    <Subtitle />
    <Description />
    <Primary />
    <ArgsTable story={PRIMARY_STORY} />
    <Stories />
  </>
);
