import { newSpecPage } from '@stencil/core/testing';

import { ToolTip } from '../tool-tip';

describe('tool-tip', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ToolTip],
      html: `<tool-tip></tool-tip>`,
    });
    expect(page.root).toEqualHtml(`
      <tool-tip>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </tool-tip>
    `);
  });
});
