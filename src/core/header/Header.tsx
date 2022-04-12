import { PropsWithChildren, useEffect } from 'react';
import { IconRegistry } from '@tylertech/forge';
import { ForgeAppBar, ForgeAppBarMenuButton, ForgeIcon } from '@tylertech/forge-react';
import { tylIconForgeLogo } from '@tylertech/tyler-icons/custom';

export interface HeaderProps {
  onToggleMenu: () => void;
  slot: string;
}

function Header(props: PropsWithChildren<HeaderProps>): JSX.Element {
  useEffect(() => {
    IconRegistry.define(tylIconForgeLogo);
  }, []);

  return (
    <ForgeAppBar title-text="Forge Docs Core" {...props}>
      <ForgeAppBarMenuButton slot="start" onClick={props.onToggleMenu} />
      <ForgeIcon slot="logo" name="forge_logo" />
    </ForgeAppBar>
  );
}

export default Header;
