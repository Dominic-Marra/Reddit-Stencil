import { Component, h, Host, State } from '@stencil/core';

import { posts } from '../../global/data/posts.data';
import { trendingPosts } from '../../global/data/trending.data';

@Component({
  tag: 'front-page',
  styleUrl: 'front-page.scss',
  shadow: true,
})
export class FrontPage {
  @State() query = '';
  @State() postMode: 'card' | 'classic' | 'compact' = 'card';

  renderTrendingPosts() {
    return (
      <section class="trending-posts">
        <h2 class="section-title">Trending Posts</h2>

        <div class="trending-posts-wrapper">
          {trendingPosts.map((post) => (
            <trending-card class="trending-post" post={post}></trending-card>
          ))}
        </div>
      </section>
    );
  }

  renderPosts() {
    let postsToRender = posts;

    if (this.query) postsToRender = postsToRender.filter((post) => post.title.toLocaleLowerCase().includes(this.query.toLocaleLowerCase()));

    return (
      <section class="posts">
        <h2 class="section-title">Popular Posts</h2>

        <post-filter onNewMode={(e) => (this.postMode = e.detail)}></post-filter>

        <div class={`posts-wrapper ${this.postMode}`}>
          {postsToRender.map((post) => (
            <post-card class="post" mode={this.postMode} post={post}></post-card>
          ))}
        </div>
      </section>
    );
  }

  setSearch(query: string) {
    const cleanSearch: string = query.trim();

    if ((this.query && !cleanSearch) || cleanSearch) this.query = cleanSearch;
  }

  render() {
    return (
      <Host>
        <nav-bar onSearch={(e) => this.setSearch(e.detail)} class="nav-bar"></nav-bar>
        <main>
          {this.renderTrendingPosts()}
          {this.renderPosts()}
        </main>
      </Host>
    );
  }
}
