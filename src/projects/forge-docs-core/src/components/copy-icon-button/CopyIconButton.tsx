import { ForgeIcon, ForgeIconButton, ForgeTooltip } from '@tylertech/forge-react';
import { IconRegistry } from '@tylertech/forge';
import { tylIconContentCopy } from '@tylertech/tyler-icons/standard';
import React, { FC, MouseEventHandler, useEffect } from 'react';

export interface CopyIconButtonArgs {
  onCopy: MouseEventHandler<HTMLButtonElement>;
}

export const CopyIconButton: FC<CopyIconButtonArgs> = ({ onCopy }) => {
  useEffect(() => {
    IconRegistry.define(tylIconContentCopy);
  }, []);

  return (
    <ForgeIconButton class="forge-docs-core__copy-button">
      <button type="button" onClick={onCopy}>
        <ForgeIcon name="content_copy" />
      </button>
      <ForgeTooltip position="bottom">Copy code snippet</ForgeTooltip>
    </ForgeIconButton>
  );
};
