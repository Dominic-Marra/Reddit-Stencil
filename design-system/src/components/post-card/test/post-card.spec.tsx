import { newSpecPage } from '@stencil/core/testing';

import { PostCard } from '../post-card';

describe('post-card', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [PostCard],
      html: `<post-card></post-card>`,
    });
    expect(page.root).toEqualHtml(`
      <post-card>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </post-card>
    `);
  });
});
