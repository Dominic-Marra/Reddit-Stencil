import { Meta, Story } from '@storybook/web-components';
import { Components } from '@yoobic/design-system';
import { html } from 'lit-html';

export default {
  title: 'Navbar',
} as Meta;

const Template: Story<Components.NavBar> = () => {
  return html`<nav-bar></nav-bar>`;
};

export const Default: Story<Components.NavBar> = Template.bind({});
Default.args = {};
