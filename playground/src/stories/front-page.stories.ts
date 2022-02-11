import { Meta, Story } from '@storybook/web-components';
import { Components } from '@yoobic/design-system';
import { html } from 'lit-html';

export default {
  title: 'Front Page',
} as Meta;

const Template: Story<Components.FrontPage> = () => {
  return html`<front-page></front-page>`;
};

export const Default: Story<Components.FrontPage> = Template.bind({});
Default.args = {};
