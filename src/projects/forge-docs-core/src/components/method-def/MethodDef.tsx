import { ForgeCard } from '@tylertech/forge-react';
import React, { FC } from 'react';

export interface MethodDefArgs {
  name?: string;
}

export const MethodDef: FC<MethodDefArgs> = ({ name = '', children }) => (
  <ForgeCard outlined style={{'--forge-card-padding': 0}}>
    <div className="forge-docs-core__method-def">
      <div>
        <code className="forge-docs-core__inline-code">{name}</code>
      </div>
      {children}
    </div>
  </ForgeCard>
);
