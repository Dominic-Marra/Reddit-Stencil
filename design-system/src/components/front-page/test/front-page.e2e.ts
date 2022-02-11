import { newE2EPage } from '@stencil/core/testing';

describe('front-page', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<front-page></front-page>');

    const element = await page.find('front-page');
    expect(element).toHaveClass('hydrated');
  });
});
