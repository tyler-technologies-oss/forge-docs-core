import React, { FC } from 'react';
import Markdown from 'markdown-to-jsx';
import { styled } from '@storybook/theming'
import { codeCommon } from '../typography/shared';
import { Args, CssCustomProperty, TableAnnotation } from "./types";
import { ArgValue } from './ArgValue';
import { ArgControl, ArgControlProps } from './ArgControl';

export interface CssCustomPropertyRowProps {
  row: CssCustomProperty;
  arg: any;
  updateArgs?: (args: Args) => void;
  compact?: boolean;
  expandable?: boolean;
  initialExpandedArgs?: boolean;
}

const Name = styled.span({ fontWeight: 'bold' });

const Required = styled.span(({ theme }) => ({
  color: theme.color.negative,
  fontFamily: theme.typography.fonts.mono,
  cursor: 'help',
}));

const Description = styled.div(({ theme }) => ({
  '&&': {
    p: {
      margin: '0 0 10px 0',
    },
    a: {
      color: theme.color.secondary,
    },
  },

  code: codeCommon({ theme }),

  '& code': {
    margin: 0,
    display: 'inline-block',
  },
}));

const StyledTd = styled.td<{ expandable: boolean }>(({ theme, expandable }) => ({
  paddingLeft: expandable ? '40px !important' : '20px !important',
}));

export const CssCustomPropertyRow: FC<CssCustomPropertyRowProps> = (props) => {
  const { row, updateArgs, compact, expandable, initialExpandedArgs } = props;
  const { name, description } = row;
  const table = (row.table || {}) as TableAnnotation;
  const type = table.type || row.type;
  const defaultValue = table.defaultValue || row.defaultValue;
  const required = row.type?.required;
  const hasDescription = description != null && description !== '';

  return (
    <tr>
      <StyledTd expandable={expandable ? expandable : false}>
        <Name>{name}</Name>
        {required ? <Required title="Required">*</Required> : null}
      </StyledTd>
      {compact ? null : (
        <td>
          {hasDescription && (
            <Description>
              <Markdown>{description ? description : ''}</Markdown>
            </Description>
          )}
        </td>
      )}
      {compact ? null : (
        <td>
          <ArgValue value={defaultValue} initialExpandedArgs={initialExpandedArgs} />
        </td>
      )}
      {updateArgs ? (
        <td>
          <ArgControl {...(props as ArgControlProps)} />
        </td>
      ) : null}
    </tr>
  );
}