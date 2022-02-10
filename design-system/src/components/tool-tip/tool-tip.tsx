import { Component, Element, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'tool-tip',
  styleUrl: 'tool-tip.scss',
  shadow: true,
})
export class ToolTip {
  @Prop() base: HTMLElement;
  @Prop() horizontalPos: 'left' | 'center' | 'right' = 'center';
  @Prop() verticalPos: 'top' | 'bottom' | 'auto' = 'auto';
  @Element() el: HTMLElement;

  setPosition() {
    this.setHorizontalPosition();
    this.el.classList.add(this.setVerticalPosition());
  }

  setVerticalPosition(): string {
    const elHeight = this.el.getBoundingClientRect().height;

    const baseTop = this.base.getBoundingClientRect().top;
    const baseBottom = this.base.getBoundingClientRect().bottom;

    const remainingSpaceTop = baseTop - window.scrollY;
    const topPos = baseTop + elHeight + 'px';
    const botPos = baseBottom + 'px';

    let position = '';

    if (this.verticalPos === 'top') {
      this.el.style.top = topPos;
      position = 'top';
    } else if (this.verticalPos === 'bottom') {
      this.el.style.top = botPos;
      position = 'bottom';
    } else if (remainingSpaceTop - elHeight >= 0) {
      this.el.style.top = topPos;
      position = 'top';
    } else {
      this.el.style.top = botPos;
      position = 'bottom';
    }

    return position;
  }

  setHorizontalPosition() {
    const elWidth = this.el.getBoundingClientRect().width;
    const baseLeft = this.base.getBoundingClientRect().left;
    const baseRight = this.base.getBoundingClientRect().right;
    const baseWidth = this.base.getBoundingClientRect().width;

    const center = baseLeft + (baseWidth - elWidth) / 2;

    if (this.horizontalPos === 'left') {
      this.el.style.left = baseLeft + 'px';
    } else if (this.horizontalPos === 'right') {
      this.el.style.left = baseRight - elWidth + 'px';
    } else if (center < 0) {
      this.el.style.left = '10px';
    } else if (center + elWidth > window.innerWidth) {
      this.el.style.right = '10px';
    } else {
      this.el.style.left = center + 'px';
    }
  }

  componentDidLoad() {
    this.setPosition();
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
