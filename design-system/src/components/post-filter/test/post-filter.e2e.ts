import { newE2EPage } from '@stencil/core/testing';

describe('post-filter', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<post-filter></post-filter>');

    const element = await page.find('post-filter');
    expect(element).toHaveClass('hydrated');
  });
});
