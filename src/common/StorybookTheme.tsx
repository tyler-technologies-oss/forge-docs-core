import React, { FC, useEffect, useState } from 'react';
import addons from '@storybook/addons';

// your theme provider
import { ThemeContext } from '../core/ThemeContext';

// get channel to listen to event emitter
const channel = addons.getChannel();

// create a component that listens for the DARK_MODE event
export const ThemeWrapper: FC = (props) => {
  // this example uses hook but you can also use class component as well
  const [isDark, setDark] = useState(false);

  useEffect(() => {
    // listen to DARK_MODE event
    channel.on('DARK_MODE', setDark);
    return () => channel.off('DARK_MODE', setDark);
  }, [channel, setDark]);

  // render your custom theme provider
  return (
    <ThemeContext.Provider value={{ theme: isDark ? 'dark' : 'light' }}>
      {props.children}
    </ThemeContext.Provider>
  );
}

