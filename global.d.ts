/* eslint-disable */
import Prism from "prism-react-renderer";


declare global {
  declare module '*.scss';

  export namespace JSX {
    interface IntrinsicElements {
      // TODO (DerekMoss): replace any with proper types for TCW to JSX.IntrinsicElements
      "tcw-button": any,
      "tcw-card": any,
      "tcw-divider": any,
      "tcw-icon-button": any,
      "tcw-label-value": any,
      "tcw-tab": any,
      "tcw-tab-bar": any,
      "tcw-tooltip": any,
      "tcw-view": any,
      "tcw-view-switcher": any,
    }
  }
  interface Window { Prism: Prism; }
}

// window.Prism = window.Prism || {};

// defineCustomElements(window);
