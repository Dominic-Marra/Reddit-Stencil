import { Component, h, Host, Prop } from '@stencil/core';

import { TrendingPost } from '../../global/models/trending-post';

@Component({
  tag: 'trending-card',
  styleUrl: 'trending-card.scss',
  shadow: true,
})
export class TrendingCard {
  @Prop() post: TrendingPost;

  render() {
    return (
      <Host>
        <a href="#">
          <figure>
            <img class="bg-image" src={this.post.image} alt={`Image for ${this.post.title}`} />

            <figcaption>
              <h2>{this.post.title}</h2>
              <p>{this.post.description}</p>
              <div class="sub">
                <img src={this.post.sub.image} alt={`Icon for ${this.post.sub.name}`}></img>
                {this.post.sub.name} and more
              </div>
            </figcaption>
          </figure>
        </a>
      </Host>
    );
  }
}
