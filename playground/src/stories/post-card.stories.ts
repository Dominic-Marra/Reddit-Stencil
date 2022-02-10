import { Meta, Story } from '@storybook/web-components';
import { Components } from '@yoobic/design-system';

export default {
  title: 'Post Card',
} as Meta;

const Template: Story<Components.PostCard> = ({ post }) => {
  const card = document.createElement('post-card');
  card.post = post;
  return card;
};

export const Default: Story<Components.PostCard> = Template.bind({});
Default.args = {
  post: {
    voteCount: '100',
    tags: ['Lorem'],
    posted: '10 day ago',
    title: 'Lorem Ipsum',
    commentCount: '10.0K',
    type: 'text',
    awards: [
      {
        count: 2,
        name: 'Lorem',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        icon: 'https://preview.redd.it/award_images/t5_22cerq/klvxk1wggfd41_Helpful.png?width=32&height=32&crop=smart&auto=webp&s=e50908c50d797edd935ba8b5d9f0fb1372ff0bae',
      },
    ],
    user: {
      name: 'u/MarcusRex73',
    },
    sub: {
      name: 'r/LoremIpsum',
      icon: 'https://styles.redditmedia.com/t5_2qt55/styles/communityIcon_n3wnthi7sy331.png',
    },
    body: {
      text:
        `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue varius dui at euismod. Suspendisse nisl massa, ultricies quis molestie quis, ullamcorper eget elit. Proin vestibulum non erat vitae placerat. Vestibulum fermentum eros vitae ligula elementum volutpat. Donec venenatis elit sit amet dolor rhoncus, ultrices commodo turpis pellentesque. Integer auctor, ligula vitae suscipit ultricies, sapien mi tincidunt sapien, non pharetra lectus sem ut lectus. Duis efficitur tellus eu urna consequat efficitur. Vestibulum a massa ut risus rutrum vulputate posuere posuere dolor. Suspendisse nibh enim, sagittis ut lacus quis, volutpat volutpat diam. Nunc elementum, mi in tempus malesuada, lectus odio porttitor dui, non fringilla velit nibh sed erat. Integer lacinia massa lacus, sed sollicitudin augue imperdiet in. Aliquam ac laoreet est. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse at accumsan quam. Mauris et luctus sem. Nulla finibus scelerisque felis et ultricies.</p>` +
        `<p>Proin ligula mi, placerat ut augue id, gravida auctor nunc. Integer pharetra blandit sodales. Suspendisse nec orci ut dolor egestas rhoncus scelerisque nec lorem. Integer posuere leo id laoreet lacinia. Donec cursus tincidunt varius. Praesent at ante at lacus commodo condimentum sed eget lacus. Cras eu nulla mauris. Proin id arcu imperdiet, pulvinar tellus at, lobortis nulla. Ut odio arcu, viverra nec est ut, efficitur dictum turpis. Aenean placerat congue enim eu faucibus. Vivamus sodales at metus ac finibus. Nullam tincidunt ligula dolor, et lacinia magna accumsan id. Sed nec nibh vitae orci ornare finibus at sit amet risus. Proin congue, risus vel tempor efficitur, quam justo vestibulum elit, vel eleifend quam turpis at turpis. Praesent varius laoreet interdum. Ut id diam ut mi vehicula lobortis nec eu risus.</p>`,
    },
  },
};
