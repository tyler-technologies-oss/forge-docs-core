import { ForgeIconButton, ForgeTooltip } from '@tylertech/forge-react';
import React, { FC, MouseEventHandler } from 'react';

export interface CopyIconButtonArgs {
  onCopy: MouseEventHandler<HTMLButtonElement>;
}

export const CopyIconButton: FC<CopyIconButtonArgs> = ({ onCopy }) => (
  <ForgeIconButton class="forge-docs-core__copy-button">
    <button type="button" className="tyler-icons" onClick={onCopy}>content_copy</button>
    <ForgeTooltip position="bottom">Copy code snippet</ForgeTooltip>
  </ForgeIconButton>
);
