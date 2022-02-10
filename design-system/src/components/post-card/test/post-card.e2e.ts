import { newE2EPage } from '@stencil/core/testing';

describe('post-card', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<post-card></post-card>');

    const element = await page.find('post-card');
    expect(element).toHaveClass('hydrated');
  });
});
