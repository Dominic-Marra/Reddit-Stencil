import { newSpecPage } from '@stencil/core/testing';

import { FrontPage } from '../front-page';

describe('front-page', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [FrontPage],
      html: `<front-page></front-page>`,
    });
    expect(page.root).toEqualHtml(`
      <front-page>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </front-page>
    `);
  });
});
