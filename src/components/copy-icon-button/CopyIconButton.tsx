import React, { FC, MouseEventHandler } from 'react';

export interface CopyIconButtonArgs {
  onCopy: MouseEventHandler<HTMLButtonElement>;
}

export const CopyIconButton: FC<CopyIconButtonArgs> = ({ onCopy }) => {
  return (
    <tcw-icon-button class="tyl-forge-react__copy-button">
      <button type="button" className="tyler-icons" onClick={onCopy}>content_copy</button>
      <tcw-tooltip position="bottom">Copy code snippet</tcw-tooltip>
    </tcw-icon-button>
  );
};
