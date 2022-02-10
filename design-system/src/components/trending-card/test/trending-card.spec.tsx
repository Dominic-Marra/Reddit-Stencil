import { newSpecPage } from '@stencil/core/testing';

import { TrendingCard } from '../trending-card';

describe('trending-card', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TrendingCard],
      html: `<trending-card></trending-card>`,
    });
    expect(page.root).toEqualHtml(`
      <trending-card>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </trending-card>
    `);
  });
});
