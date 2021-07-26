import React, { useState, useContext, useEffect, FC } from 'react';
import Highlight, { defaultProps, Language, PrismTheme } from 'prism-react-renderer';
import { copyToClipboard } from '@tyler-components-web/core';
import styled from 'styled-components';

 /* @ts-ignore */
import Prism from "prism-react-renderer/prism";

import { ThemeContext } from '../../core/ThemeContext';
import { CopyIconButton }  from '../copy-icon-button/CopyIconButton';
import prismThemeLight from '../../common/PrismThemeLight';
import prismThemeDark from '../../common/PrismThemeDark';
import { showToast } from '../../utils/toast';

// prism-react-renderer does not export Token.
type Token = {
  types: string[];
  content: string;
  empty?: boolean;
};

const StyledContainer = styled.div`
  position: relative;
`;

// Add more languages to prism-react-renderer
((typeof global !== "undefined" ? global : window) as any).Prism = Prism;

require("prismjs/components/prism-csharp");
require("prismjs/components/prism-aspnet");

export interface CodeArgs {
  className?: string;
  expanded?: boolean;
}

export const Code: FC<CodeArgs> = ({ children, className: classNameProp = '', expanded }) => {
  let isExpandable = false;
  const [hasMoreThanNineLines, setHasMoreThanNineLines] = useState(false);
  const [shouldShowMore, setShouldShowMore] = useState(expanded);
  const [isCopyVisible, setCopyVisibility] = useState(false);
  const themeState = useContext(ThemeContext);
  const language = classNameProp.replace(/language-/, '') as Language;

  function copyCode() {
    copyToClipboard(children as string);
    showToast('Code copied');
  }

  function removeTrailingEmptyLine(lines: Token[][]) {
    const [lastLine] = lines.splice(-1);
    if (lastLine[0].empty) {
      return lines;
    }
    return [...lines, lastLine];
  };

  function getLines(lines: Token[][]) {
    const withoutTrailingEmpty = removeTrailingEmptyLine(lines);

    if (withoutTrailingEmpty.length > 9) {
      isExpandable = true;
    }

    if (shouldShowMore) {
      return withoutTrailingEmpty;
    }

    return withoutTrailingEmpty.slice(0, 9);
  }

  function showCopyButton() {
    setCopyVisibility(true);
  }

  function hideCopyButton() {
    setCopyVisibility(false);
  }

  useEffect(() => {
    setHasMoreThanNineLines(isExpandable);
  }, [setHasMoreThanNineLines, isExpandable]);

  return (
    <StyledContainer onMouseEnter={showCopyButton} onMouseLeave={hideCopyButton}>
      <Highlight
        {...defaultProps}
        code={(children as string).trim()}
        language={language}
        theme={themeState.theme === 'light' ? prismThemeLight as PrismTheme : prismThemeDark as PrismTheme}>
        {({className, style, tokens, getLineProps, getTokenProps}) => (
          <>
            {isCopyVisible && <CopyIconButton onCopy={copyCode} />}
            <pre className={className} style={style}>
              {getLines(tokens).map((line, i) => (
                <div {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
              {hasMoreThanNineLines && (
                <tcw-button class="tyl-forge-react__snippet-btn">
                  <button type="button" onClick={() => setShouldShowMore(!shouldShowMore)}>
                    {shouldShowMore ? <span>Show less</span> : <span>Show more</span>}
                    <i className="tyler-icons">
                      {shouldShowMore ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
                    </i>
                  </button>
                </tcw-button>
              )}
            </pre>
          </>
        )}
      </Highlight>
    </StyledContainer>
  );
};
