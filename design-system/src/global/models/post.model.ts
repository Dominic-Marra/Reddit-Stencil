export interface Post {
  user: {
    name: string;
  };
  sub: {
    name: string;
    icon: string;
  };
  title: string;
  tags?: Array<string>;
  posted: string;
  voteCount?: string;
  locked?: boolean;
  awards?: Array<{
    count: number;
    name: string;
    description: string;
    icon: string;
  }>;
  type: 'text' | 'media' | 'link';
  body?: {
    text?: string;
    image?: string;
    link?: {
      url: string;
      type: 'image' | 'video' | 'site';
      thumbnail?: string;
      image?: string;
    };
  };
  commentCount: string;
}
