import { Meta, Story } from '@storybook/web-components';
import { Components } from '@yoobic/design-system';
import { html } from 'lit-html';

export default {
  title: 'Post Filter',
} as Meta;

const Template: Story<Components.PostFilter> = () => {
  return html`<post-filter></post-filter>`;
};

export const Default: Story<Components.PostFilter> = Template.bind({});
Default.args = {};
