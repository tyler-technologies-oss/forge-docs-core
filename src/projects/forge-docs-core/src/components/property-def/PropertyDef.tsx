import React, { FC } from 'react';
import dashify from 'dashify';
import { ForgeCard, ForgeLabelValue } from '@tylertech/forge-react';

export interface IEmptiableLabelValue {
  label?: string;
  name?: string;
  empty?: boolean;
  dashifyValue?: boolean;
}

export const EmptiableLabelValue: FC<IEmptiableLabelValue> = ({ label = '', name = '', empty = true, dashifyValue = false }) => (
  <ForgeLabelValue {...empty && {empty: true}}>
    <span slot="label">{label}</span>
    {!empty && <span slot="value">{(dashifyValue ? dashify(name) : name)}</span>}
    {empty && <span slot="value">n/a</span>}
  </ForgeLabelValue>
);

export interface IPropertyDefName {
  name?: string;
  prop?: boolean;
  attr?: boolean;
}

export const PropertyDefName: FC<IPropertyDefName> = ({ name = '', prop, attr }) => (
  <div className="forge-docs-core__property-def-name">
    <span className="forge-typography--headline5">{(prop ? 'Property:' : 'Attribute:')}</span>
    <span className="forge-typography--headline5">{(!prop && attr ? dashify(name) : name)}</span>
  </div>
);

export interface IPropertyDef extends IPropertyDefName {
  type?: string;
  defaultValue?: string;
}

export const PropertyDef: FC<IPropertyDef> = ({ name, prop = true, attr = true, type, defaultValue, children }) => (
  <ForgeCard outlined style={{'--forge-card-padding': 0}}>
    <div className="forge-docs-core__property-def">
      <PropertyDefName name={name} prop={prop} attr={attr} />
      <div className="forge-docs-core__property-def-header">
        {!prop && attr && <EmptiableLabelValue label="Property" name={name} empty={!!prop === false} />}
        {prop && <EmptiableLabelValue label="Attribute" name={name} empty={!!attr === false} dashifyValue />}
        {type && (
          <ForgeLabelValue>
            <span slot="label">Type</span>
            <code slot="value" className="forge-docs-core__inline-code">{type}</code>
          </ForgeLabelValue>
        )}
        {defaultValue && (
          <ForgeLabelValue>
            <span slot="label">Default</span>
            <code slot="value" className="forge-docs-core__inline-code">{defaultValue}</code>
          </ForgeLabelValue>
        )}
      </div>
      {children}
    </div>
  </ForgeCard>
);
