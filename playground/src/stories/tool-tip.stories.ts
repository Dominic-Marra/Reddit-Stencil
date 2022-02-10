import { Meta, Story } from '@storybook/web-components';
import { Components } from '@yoobic/design-system';

export default {
  title: 'Tool Tip',
} as Meta;

const Template: Story<Components.ToolTip> = ({ base }) => {
  const tooltip = document.createElement('tool-tip');
  tooltip.base = base;
  return tooltip;
};

const base = document.createElement('div');
document.body.appendChild(base);

export const Default: Story<Components.ToolTip> = Template.bind({});
Default.args = {
  base: base,
};
