import { Component, Fragment, h, Host, Prop } from '@stencil/core';

import DownArrowIcon from '../../assets/icons/arrow-down.svg';
import UpArrowIcon from '../../assets/icons/arrow-up.svg';
import BookMarkIcon from '../../assets/icons/bookmark.svg';
import CommentIcon from '../../assets/icons/message-square.svg';
import MoreIcon from '../../assets/icons/more-horizontal.svg';
import ShareIcon from '../../assets/icons/share-2.svg';
import { Post } from '../../global/models/post.model';

@Component({
  tag: 'post-card',
  styleUrl: 'post-card.scss',
  shadow: true,
})
export class PostCard {
  /** The post data for the post card */
  @Prop() post: Post;

  /**
   * Renders a button for the post card'
   *
   * @param classes
   *    classes to use on the button
   * @param children
   *    inner children of the button
   * @param label
   *    label of the button
   * @returns
   *    HTMLButtonElement
   */
  renderCardButton(classes?: string, children?: HTMLElement | string, label?: string) {
    return (
      <button class={classes} aria-label={label}>
        {children}
      </button>
    );
  }

  /**
   * Renders the vote bar for the post card
   *
   * @returns
   *    HTMLDivElement
   */
  renderVoteBar() {
    return (
      <div class="vote-bar">
        {this.renderCardButton('vote upvote', <i innerHTML={UpArrowIcon}></i>, 'Upvote post')}

        {this.post.voteCount || 'Vote'}

        {this.renderCardButton('vote downvote', <i innerHTML={DownArrowIcon}></i>, 'Downvote post')}
      </div>
    );
  }

  /**
   * Renders the top bar for the post card
   *
   * @returns
   *  HTMLDivElement
   */
  renderTopBar() {
    return (
      <div class="top-bar">
        <p class="sub">
          <img src={this.post.sub.icon} alt={`Sub icon for ${this.post.sub.name}`} />
          {this.post.sub.name}
        </p>
        &middot;
        <p>Posted by {this.post.user.name}</p>
        {this.post.awards?.length && this.renderAwards()}
        {this.renderCardButton('sub-btn', 'Join')}
      </div>
    );
  }

  /**
   * Renders the awards for the post
   *
   * @returns
   *    HTMLUListElement
   */
  renderAwards() {
    return (
      <ul class="awards">
        {this.post.awards.slice(0, 3).map((award) => {
          let tooltip: HTMLElement;

          return (
            <li
              class="award"
              onMouseEnter={(e) => {
                tooltip = this.displayAwardToolTip(e.currentTarget as HTMLElement, award);
              }}
              onMouseLeave={(e) => {
                if (tooltip) (e.currentTarget as HTMLElement).removeChild(tooltip);
              }}
            >
              <img src={award.icon} alt={`Icon for ${award.icon}`} />
              {award.count > 1 && award.count}
            </li>
          );
        })}
      </ul>
    );
  }

  /**
   * Displays the tooltip for the hovered award
   *
   * @param base
   *      Award
   * @param award
   *      Award data
   * @returns
   *      HTMLToolTipElement
   */
  displayAwardToolTip(base: HTMLElement, award: any) {
    const tooltip = document.createElement('tool-tip') as any;
    tooltip.base = base;

    tooltip.innerHTML = `
      <img src="${award.icon}"></img>
      <h2>${award.name}</h2>
      <p>${award.description}</p>
      <a href="#">How do I award?</a>`;

    base.appendChild(tooltip);

    return tooltip;
  }

  /**
   * Renders the body section for the post cards article
   *
   * @returns
   *    HTMLSectionElement
   */
  renderArticleBody() {
    return (
      <section class={`body ${this.post.type}`}>
        {this.post.body.text && <div innerHTML={this.post.body.text}></div>}
        {this.post.body.image && <img src={this.post.body.image} />}
        {this.post.body.link && (
          <div class="link-contents">
            <a href={this.post.body.link.url}>{this.post.body.link.url}</a>

            {this.post.body.link.type === 'image' && <img class="link-image" src={this.post.body.link.image} />}

            {this.post.body.link.type === 'site' && <img class="link-thumbnail" src={this.post.body.link.thumbnail} />}

            {this.post.body.link.type === 'video' && <iframe src={this.post.body.link.url} height="512" width="100%"></iframe>}
          </div>
        )}
      </section>
    );
  }

  /**
   * Renders the header for the post cards article
   *
   * @returns
   *    HTMLHeaderElement
   */
  renderArticleHeader() {
    return (
      <header class="title">
        <h2>{this.post.title}</h2>

        {this.post.tags?.length && (
          <ul class="tags">
            {this.post.tags.map((tag) => (
              <li class="tag">{tag}</li>
            ))}
          </ul>
        )}
      </header>
    );
  }

  /**
   * Renders the article for the post card
   *
   * @returns
   *    HTMLArticleElement
   */
  renderArticle() {
    return (
      <article>
        {this.renderArticleHeader()}
        {this.renderArticleBody()}
      </article>
    );
  }

  renderBottomBar() {
    return (
      <div class="bottom-bar">
        {this.renderCardButton(
          null,
          <Fragment>
            <i innerHTML={CommentIcon}></i>
            {this.post.commentCount} Comments
          </Fragment>,
          'Go to comments'
        )}

        {this.renderSubMenuButton(
          <Fragment>
            <i innerHTML={ShareIcon}></i>
            Share
          </Fragment>,
          ['Copy Link', 'Embed']
        )}

        {this.renderCardButton(
          null,
          <Fragment>
            <i innerHTML={BookMarkIcon}></i>
            Save
          </Fragment>
        )}

        {this.renderSubMenuButton(<i innerHTML={MoreIcon}></i>, ['Hide', 'Report'])}
      </div>
    );
  }

  renderSubMenuButton(children: any, subOptions) {
    return (
      <button
        class="sub-menu-button"
        onFocus={(e) =>
          this.displaySubMenuOptions(
            e.currentTarget as HTMLElement,
            `<ul class="sub-menu">
            ${subOptions.map((option) => `<li>${option}</li>`).join('')}
          </ul>`
          )
        }
      >
        {children}
      </button>
    );
  }

  displaySubMenuOptions(base: HTMLElement, innerHTML: string) {
    const tooltip = document.createElement('tool-tip') as any;
    tooltip.base = base;
    tooltip.horizontalPos = 'left';
    tooltip.verticalPos = 'bottom';

    tooltip.innerHTML = innerHTML;

    base.appendChild(tooltip);

    const removeSubMenuOptions = () => {
      tooltip.parentElement.removeChild(tooltip);
      base.removeEventListener('blur', removeSubMenuOptions);
    };

    base.addEventListener('blur', removeSubMenuOptions);

    return tooltip;
  }

  render() {
    return (
      <Host>
        <section role="link" class="post-card" tabindex={-1}>
          {this.renderVoteBar()}

          <div class="left">
            {this.renderTopBar()}
            {this.renderArticle()}
            {this.renderBottomBar()}
          </div>
        </section>
      </Host>
    );
  }
}
