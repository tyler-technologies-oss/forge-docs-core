import React, { FC, MouseEventHandler } from 'react';

interface CopyIconButtonArgs {
  onCopy: MouseEventHandler<HTMLButtonElement>;
}

const CopyIconButton: FC<CopyIconButtonArgs> = ({ onCopy }) => {
  return (
    <tcw-icon-button class="tyl-forge__copy-button">
      <button type="button" className="tyler-icons" onClick={onCopy}>content_copy</button>
      <tcw-tooltip position="bottom">Copy code snippet</tcw-tooltip>
    </tcw-icon-button>
  );
};

export default CopyIconButton;