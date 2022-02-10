import { Meta, Story } from '@storybook/web-components';
import { Components } from '@yoobic/design-system';

export default {
  title: 'Trending Card',
} as Meta;

const Template: Story<Components.TrendingCard> = ({ post }) => {
  const card = document.createElement('trending-card');
  card.post = post;
  return card;
};

export const Default: Story<Components.TrendingCard> = Template.bind({});
Default.args = {
  post: {
    title: 'Razzie Awards 2022',
    description: 'LeBron James receives a Razzie nomination for Space Jam: A New Legacy',
    sub: {
      name: 'r/nba',
      image: 'https://styles.redditmedia.com/t5_2qo4s/styles/communityIcon_1podsfdai4301.png?width=256&s=90f8734cee5cfb8e06306013d830d43e31d68f27',
    },
    image: 'https://external-preview.redd.it/Ir8f-0v2zZjhY1QO7BQsPLve0EX77Y2uoJbL-HhIpZc.jpg?auto=webp&s=5ec2e262b565bb859ac8d0dd93dc8e70d1a4983b',
  },
};
