import { newSpecPage } from '@stencil/core/testing';

import { PostFilter } from '../post-filter';

describe('post-filter', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [PostFilter],
      html: `<post-filter></post-filter>`,
    });
    expect(page.root).toEqualHtml(`
      <post-filter>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </post-filter>
    `);
  });
});
