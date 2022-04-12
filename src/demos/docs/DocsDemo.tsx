import { ForgeDivider } from '@tylertech/forge-react';
import { Blockquote, Code, CodeSwitcher, LinkButton, MethodDef, PropertyDef } from 'src/projects/forge-docs-core/src';

export function DocsDemo(): JSX.Element {
  return (
    <>
      <h2 className="forge-typography--title">Docs example</h2>
      <p>
        This is an example of what using the docs components in this library could look like in a documentation page.
      </p>

      <ForgeDivider />
      <h3 className="forge-typography--subtitle2" style={{marginTop: '24px'}}>Blockquote</h3>
      <Blockquote>This is some important information to draw the user to.</Blockquote>

      <ForgeDivider />
      <h3 className="forge-typography--subtitle2" style={{marginTop: '24px'}}>Code</h3>
      <Code>
        This is an awesome code snippet!
      </Code>

      <ForgeDivider />
      <h3 className="forge-typography--subtitle2" style={{marginTop: '24px'}}>CodeSwitcher</h3>
      <CodeSwitcher
        codeHtml={`
<div>Click the other tabs!</div>
        `}
        codeTs={`
if (isForge()) {
  console.log('Awesome!');
}
        `}
        codeScss={`
.wife {
  right: 100%;
  margin: 0%;
}
        `}>
        Test
      </CodeSwitcher>
      <br/>

      <ForgeDivider />
      <h3 className="forge-typography--subtitle2" style={{marginTop: '24px'}}>LinkButton</h3>
      <LinkButton href="https://forge.tylertech.com">
        Go somewhere cool
      </LinkButton>
      <br/>
      <br/>

      <ForgeDivider />
      <h3 className="forge-typography--subtitle2" style={{marginTop: '24px'}}>PropertyDef</h3>
      <PropertyDef name="CoolProperty" type="boolean" defaultValue="true">
        <p>This is an awesome description.</p>
      </PropertyDef>

      <ForgeDivider />
      <h3 className="forge-typography--subtitle2" style={{marginTop: '24px'}}>MethodDev</h3>
      <MethodDef name="isForge(): boolean;">
        <p>This is an awesome description.</p>
      </MethodDef>
    </>
  );
}
