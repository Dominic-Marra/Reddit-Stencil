import { newE2EPage } from '@stencil/core/testing';

describe('tool-tip', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<tool-tip></tool-tip>');

    const element = await page.find('tool-tip');
    expect(element).toHaveClass('hydrated');
  });
});
