import React, { FC } from 'react';
import dashify from 'dashify';

interface IEmptiableLabelValue {
  label: string;
  name: string;
  empty: boolean;
  dashifyValue?: boolean;
}

const EmptiableLabelValue: FC<IEmptiableLabelValue> = ({ label, name, empty, dashifyValue = false }) => {
  return (
    <tcw-label-value {...empty && {empty: true}}>
      <span slot="label">{label}</span>
      {!empty && <span slot="value">{(dashifyValue ? dashify(name) : name)}</span>}
      {empty && <span slot="value">n/a</span>}
    </tcw-label-value>
  );
};

interface IPropertyDefName {
  name: string;
  prop?: boolean;
  attr?: boolean;
}

const PropertyDefName: FC<IPropertyDefName> = ({ name, prop, attr }) => {
  return (
    <div className="tyl-storybook__property-def-name">
      <span className="tyl-typography--headline5">{(prop ? 'Property:' : 'Attribute:')}</span>
      <span className="tyl-typography--headline5">{(!prop && attr ? dashify(name) : name)}</span>
    </div>
  );
};

interface IPropertyDef extends IPropertyDefName {
  type: string;
  defaultValue: string;
}

export const PropertyDef: FC<IPropertyDef> = ({ name, prop = true, attr = true, type, defaultValue, children }) => {
  return (
    <tcw-card outlined has-padding="false">
      <div className="tyl-storybook__property-def">
        <PropertyDefName name={name} prop={prop} attr={attr} />
        <div className="tyl-storybook__property-def-header">
          {!prop && attr && <EmptiableLabelValue label="Property" name={name} empty={!!prop === false} />}
          {prop && <EmptiableLabelValue label="Attribute" name={name} empty={!!attr === false} dashifyValue />}
          {type && <tcw-label-value>
            <span slot="label">Type</span>
            <code slot="value" className="tyl-storybook__inline-code">{type}</code>
          </tcw-label-value>}
          {defaultValue && <tcw-label-value>
            <span slot="label">Default</span>
            <code slot="value" className="tyl-storybook__inline-code">{defaultValue}</code>
          </tcw-label-value>}
        </div>
        {children}
      </div>
    </tcw-card>
  );
};
