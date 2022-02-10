import { newE2EPage } from '@stencil/core/testing';

describe('trending-card', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<trending-card></trending-card>');

    const element = await page.find('trending-card');
    expect(element).toHaveClass('hydrated');
  });
});
