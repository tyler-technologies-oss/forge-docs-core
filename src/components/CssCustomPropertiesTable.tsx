import React, { FC } from 'react';
import pickBy from 'lodash/pickBy';
import { ResetWrapper, TableWrapper, Icons } from '@storybook/components';
import { styled } from '@storybook/theming';
import { Args, CssCustomProperties, CssCustomProperty } from './types';
import { opacify, darken } from 'polished';
import { CssCustomPropertyRow } from './CssCustomPropertyRow';
import { SectionRow } from './SectionRow';

const ResetButton = styled.button(({ theme }) => ({
  border: 0,
  borderRadius: '3em',
  cursor: 'pointer',
  display: 'inline-block',
  overflow: 'hidden',
  padding: '3px 8px',
  transition: 'all 150ms ease-out',
  verticalAlign: 'top',
  userSelect: 'none',
  margin: 0,

  backgroundColor: theme.base === 'light' ? '#EAF3FC' : theme.color.border,
  boxShadow:
    theme.base === 'light'
      ? `${theme.color.border} 0 0 0 1px inset`
      : `${theme.color.darker}  0 0 0 1px inset`,
  color: theme.color.secondary,

  '&:hover': {
    background: theme.base === 'light' ? darken(0.03, '#EAF3FC') : opacify(0.1, theme.color.border),
  },

  '&:focus': {
    boxShadow: `${theme.color.secondary} 0 0 0 1px inset`,
    outline: 'none',
  },

  svg: {
    display: 'block',
    height: 14,
    width: 14,
  },
}));

const ControlHeadingWrapper = styled.span({
  display: 'flex',
  justifyContent: 'space-between',
});

export enum CssCustomPropertiesTableError {
  NO_COMPONENT = "No component found.",
  CSS_CUSTOM_PROPERTY_UNSUPPORTED = "Css custom property unsupported. See Css custom property documentation for your framework."
}

export type SortType = 'alpha' | 'requiredFirst' | 'none';
type SortFn = (a: CssCustomProperty, b: CssCustomProperty) => number;

const sortFns: Record<SortType, SortFn> = {
  alpha: (a: CssCustomProperty, b: CssCustomProperty) => a.name.localeCompare(b.name),
  requiredFirst: (a: CssCustomProperty, b: CssCustomProperty) =>
    Number(!!b.type?.required) - Number(!!a.type?.required) || a.name.localeCompare(b.name),
  none: () => 0,
};

export interface CssCustomPropertiesTableRowProps {
  rows: CssCustomProperties;
  args?: Args;
  updateArgs?: (args: Args) => void;
  resetArgs?: (argNames?: string[]) => void;
  compact?: boolean;
  inAddonPanel?: boolean;
  initialExpandedArgs?: boolean;
  sort?: SortType;
}

export interface CssCustomPropertiesTableErrorProps {
  error?: CssCustomPropertiesTableError;
}

export type CssCustomPropertiesTableProps = CssCustomPropertiesTableRowProps | CssCustomPropertiesTableErrorProps;

type Rows = CssCustomProperty[];
type Subsection = Rows;
type Section = {
  ungrouped: Rows;
  subsections: Record<string, Subsection>;
};
type Sections = {
  ungrouped: Rows;
  ungroupedSubsections: Record<string, Subsection>;
  sections: Record<string, Section>;
};

const groupRows = (rows: CssCustomProperties, sort: SortType) => {
  const sections: Sections = { ungrouped: [], ungroupedSubsections: {}, sections: {} };
  if (!rows) return sections;

  Object.entries(rows).forEach(([key, row]) => {
    const { category, subcategory } = row?.table || {};
    if (category) {
      const section = sections.sections[category] || { ungrouped: [], subsections: {} };
      if (!subcategory) {
        section.ungrouped.push({ key, ...row });
      } else {
        const subsection = section.subsections[subcategory] || [];
        subsection.push({ key, ...row });
        section.subsections[subcategory] = subsection;
      }
      sections.sections[category] = section;
    } else if (subcategory) {
      const subsection = sections.ungroupedSubsections[subcategory] || [];
      subsection.push({ key, ...row });
      sections.ungroupedSubsections[subcategory] = subsection;
    } else {
      sections.ungrouped.push({ key, ...row });
    }
  });

  // apply sort
  const sortFn = sortFns[sort];

  const sortSubsection = (record: Record<string, Subsection>) => {
    if (!sortFn) return record;
    return Object.keys(record).reduce<Record<string, Subsection>>(
      (acc, cur) => ({
        ...acc,
        [cur]: record[cur].sort(sortFn),
      }),
      {}
    );
  };

  const sorted = {
    ungrouped: sections.ungrouped.sort(sortFn),
    ungroupedSubsections: sortSubsection(sections.ungroupedSubsections),
    sections: Object.keys(sections.sections).reduce<Record<string, Section>>(
      (acc, cur) => ({
        ...acc,
        [cur]: {
          ungrouped: sections.sections[cur].ungrouped.sort(sortFn),
          subsections: sortSubsection(sections.sections[cur].subsections),
        },
      }),
      {}
    ),
  };

  return sorted;
}

export const CssCustomPropertiesTable: FC<CssCustomPropertiesTableProps> = (props) => {
  const { error } = props as CssCustomPropertiesTableErrorProps;
  if (error) {
    return (
      <div>{error}</div>
    );
  }

  const { 
    rows,
    args,
    updateArgs,
    resetArgs,
    compact,
    inAddonPanel,
    initialExpandedArgs,
    sort = 'none',
  } = props as CssCustomPropertiesTableRowProps;
  const groups = groupRows(
    pickBy(rows, (row: CssCustomProperty) => !row?.table?.disable),
    sort
  );

  if (
    groups.ungrouped.length === 0 &&
    Object.entries(groups.sections).length === 0 &&
    Object.entries(groups.ungroupedSubsections).length === 0
  ) {
    return (
      <div>No css custom properties for this component</div>
    );
  }

  let colSpan = 1;
  if (updateArgs) colSpan += 1;
  if (!compact) colSpan += 2;
  const expandable = Object.keys(groups.sections).length > 0;

  const common = { updateArgs, compact, inAddonPanel, initialExpandedArgs };
  return (
    <ResetWrapper>
      <TableWrapper className="docblock-csscustompropertiestable">
        <thead className="docblock-csscustompropertiestable-head">
          <tr>
            <th>Name</th>            
            {compact ? null : <th>Description</th>}
            {compact ? null : <th>Default</th>}           
            {updateArgs ? (
              <th>
                <ControlHeadingWrapper>
                  Control{' '}
                  {resetArgs && (
                    <ResetButton onClick={() => resetArgs()} title="Reset controls">
                      <Icons icon="sync" aria-hidden />
                    </ResetButton>
                  )}
                </ControlHeadingWrapper>
              </th>
            ) : null}
          </tr>
        </thead>
        <tbody className="docblock-csscustompropertiestable-body">
          {groups.ungrouped.map((row) => (
            <CssCustomPropertyRow key={row.key} row={row} arg={args && args[row.key]} {...common} />
          ))}

          {Object.entries(groups.ungroupedSubsections).map(([subcategory, subsection]) => (
            <SectionRow key={subcategory} label={subcategory} level="subsection" colSpan={colSpan}>
              {subsection.map((row) => (
                <CssCustomPropertyRow
                  key={row.key}
                  row={row}
                  arg={args && args[row.key]}
                  expandable={expandable}
                  {...common}
                />
              ))}
            </SectionRow>
          ))}
        </tbody>
      </TableWrapper>
    </ResetWrapper>
  );
}