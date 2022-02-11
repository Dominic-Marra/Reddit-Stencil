import { Component, Fragment, h, Host, Prop, State } from '@stencil/core';

import DownArrowIcon from '../../assets/icons/arrow-down.svg';
import UpArrowIcon from '../../assets/icons/arrow-up.svg';
import BookMarkIcon from '../../assets/icons/bookmark.svg';
import HideIcon from '../../assets/icons/eye-off.svg';
import TextIcon from '../../assets/icons/file-text.svg';
import FlagIcon from '../../assets/icons/flag.svg';
import MaxIcon from '../../assets/icons/maximize-2.svg';
import CommentIcon from '../../assets/icons/message-square.svg';
import MinIcon from '../../assets/icons/minimize-2.svg';
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

  @Prop() mode: 'card' | 'compact' | 'classic' = 'card';

  @State() expanded: boolean;

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

        <p class="vote-count">{this.post.voteCount || 'Vote'}</p>

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
        {this.mode === 'compact' && (
          <p class="points-comments">
            <span>{this.post.voteCount} points</span>
            &middot;
            <span>{this.post.commentCount} comments</span>
          </p>
        )}

        <p class="sub">
          {this.mode === 'card' && <img src={this.post.sub.icon} alt={`Sub icon for ${this.post.sub.name}`} />}
          {this.post.sub.name}
        </p>

        <p class="user">&middot; Posted by {this.post.user.name}</p>
        {this.post.awards?.length && this.renderAwards()}
        {this.mode !== 'compact' && this.renderCardButton('sub-btn', 'Join')}
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
      <h2 class="award-name">${award.name}</h2>
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
  renderPostContent() {
    return (
      <section class={`body ${this.post.type}`}>
        {this.post.body.text && <div innerHTML={this.post.body.text}></div>}
        {this.post.body.image && <img src={this.post.body.image} />}
        {this.post.body.link && (
          <div class="link-contents">
            <a href={this.post.body.link.url}>{this.post.body.link.url}</a>

            {this.post.body.link.type === 'image' && <img class="link-image" src={this.post.body.link.image} />}

            {this.post.body.link.type === 'site' && this.renderPostThumbnail()}

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
  renderPostTitle() {
    return (
      <div class="title">
        <h2>{this.post.title}</h2>

        {this.post.tags?.length && (
          <ul class="tags">
            {this.post.tags.map((tag) => (
              <li class="tag">{tag}</li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  /**
   * Renders the article for the post card
   *
   * @returns
   *    HTMLArticleElement
   */
  renderPostArticle() {
    return (
      <article>
        {this.mode === 'card' && this.renderPostTitle()}
        {this.renderPostContent()}
      </article>
    );
  }

  renderBottomBar() {
    return (
      <div class="bottom-bar">
        {this.mode !== 'compact' && this.renderVoteBar()}
        {this.mode === 'classic' && this.renderExpandButton()}

        {this.renderCommmentButton()}

        {this.renderSubMenuButton(
          <Fragment>
            <i innerHTML={ShareIcon}></i>
            <span>Share</span>
          </Fragment>,
          ['Copy Link', 'Embed'],
          'share'
        )}

        {this.renderCardButton(
          'bottom-button save',
          <Fragment>
            <i innerHTML={BookMarkIcon}></i>
            <span>Save</span>
          </Fragment>
        )}

        {this.mode === 'classic' &&
          this.renderCardButton(
            'bottom-button hide',
            <Fragment>
              <i innerHTML={HideIcon}></i>
              <span>Hide</span>
            </Fragment>
          )}

        {this.mode === 'classic' &&
          this.renderCardButton(
            'bottom-button report',
            <Fragment>
              <i innerHTML={FlagIcon}></i>
              <span>Report</span>
            </Fragment>
          )}

        {this.renderSubMenuButton(<i innerHTML={MoreIcon}></i>, ['Hide', 'Report'], 'more-normal')}
        {this.renderSubMenuButton(<i innerHTML={MoreIcon}></i>, ['Save', 'Hide', 'Report'], 'more-some')}
        {this.renderSubMenuButton(<i innerHTML={MoreIcon}></i>, ['Copy Link', 'Embed', 'Save', 'Hide', 'Report'], 'more-all')}
      </div>
    );
  }

  renderCommmentButton() {
    return this.renderCardButton(
      'comments',
      <Fragment>
        <i innerHTML={CommentIcon}></i>
        <span>{this.post.commentCount}</span>
        <span>Comments</span>
      </Fragment>,
      'Go to comments'
    );
  }

  renderExpandButton() {
    return (
      <button onClick={() => (this.expanded = !this.expanded)} aria-label={this.expanded ? 'Minimize' : 'Expand'} class="expand-button">
        <i innerHTML={this.expanded ? MinIcon : MaxIcon}></i>
      </button>
    );
  }

  renderSubMenuButton(children: any, subOptions: Array<any>, classes?: string) {
    return (
      <button
        class={`sub-menu-button ${classes}`}
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

  renderPostThumbnail() {
    return (
      <div class="thumbnail">
        {this.post.type === 'link' && <img class="thumb-img" src={this.post.body.link.thumbnail} />}
        {this.post.type === 'text' && <i class="thumb-icon" innerHTML={TextIcon}></i>}
      </div>
    );
  }

  renderCardMode() {
    return (
      <Fragment>
        {this.renderVoteBar()}
        <div class="left">
          {this.renderTopBar()}
          {this.renderPostArticle()}
          {this.renderBottomBar()}
        </div>
      </Fragment>
    );
  }

  renderClassicMode() {
    return (
      <Fragment>
        {this.renderVoteBar()}

        {this.renderPostThumbnail()}

        <div class="left">
          {this.renderPostTitle()}
          {this.renderTopBar()}
          {this.renderBottomBar()}
        </div>

        {this.renderBottomBar()}

        {this.expanded === true && this.renderPostArticle()}
      </Fragment>
    );
  }

  renderCompactMode() {
    return (
      <Fragment>
        {this.renderVoteBar()}

        <div class="left-wrapper">
          <div class="left">
            {this.renderPostTitle()}
            {this.renderTopBar()}
          </div>

          {this.renderSubMenuButton(<i innerHTML={MoreIcon}></i>, ['Copy Link', 'Embed', 'Save', 'Hide', 'Report'], 'more-all')}
          {this.renderExpandButton()}
          {this.renderCommmentButton()}
        </div>

        {this.expanded === true && this.renderPostArticle()}
      </Fragment>
    );
  }

  render() {
    return (
      <Host>
        <section role="link" class={`post-card ${this.mode}`} tabindex={-1}>
          {this.mode === 'card' && this.renderCardMode()}
          {this.mode === 'classic' && this.renderClassicMode()}
          {this.mode === 'compact' && this.renderCompactMode()}
        </section>
      </Host>
    );
  }
}
