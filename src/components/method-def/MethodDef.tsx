import React, { FC } from 'react';

export interface MethodDefArgs {
  name?: string;
}

export const MethodDef: FC<MethodDefArgs> = ({ name = '', children }) => {
  return (
    <tcw-card outlined has-padding="false">
      <div className="tyl-forge-react__method-def">
        <div>
          <code className="tyl-forge-react__inline-code">{name}</code>        
        </div>
        {children}
      </div>
    </tcw-card>
  );
};
