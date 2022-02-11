import { Component, Event, EventEmitter, h, Host, State } from '@stencil/core';

@Component({
  tag: 'post-filter',
  styleUrl: 'post-filter.scss',
  shadow: true,
})
export class PostFilter {
  @State() currentFilter: { value: string; option?: string } = {
    value: 'hot',
    option: 'ca',
  };
  @State() currentMode: 'card' | 'classic' | 'compact' = 'card';
  @Event() newMode: EventEmitter<'card' | 'classic' | 'compact'>;

  private filters = [
    {
      label: 'Hot',
      value: 'hot',
      options: [
        { label: 'Canada', value: 'ca' },
        { label: 'USA', value: 'us' },
        { label: 'Europe', value: 'eu' },
      ],
    },
    {
      label: 'New',
      value: 'new',
    },
    {
      label: 'Top',
      options: [
        { label: 'Now', value: 'now' },
        { label: 'Today', value: 'today', default: true },
        { label: 'This Week', value: 'week' },
      ],
    },
  ];

  private modes = [
    {
      label: 'Card',
      value: 'card',
    },
    {
      label: 'Classic',
      value: 'classic',
    },
    {
      label: 'Compact',
      value: 'compact',
    },
  ];

  setFilter(filter) {
    if (this.currentFilter.value === filter.value) return;

    this.currentFilter = {
      value: filter.value,
    };

    if (filter.options?.length) {
      const defaultOption = filter.options.find((option) => option.default);
      const value = defaultOption ? defaultOption.value : filter.options[0].value;

      this.setFilterOption(value);
    }
  }

  setFilterOption(value) {
    if (this.currentFilter.option === value) return;

    this.currentFilter = { ...this.currentFilter, option: value };
  }

  renderFilter(filter) {
    return (
      <div class="filter">
        <button class={this.currentFilter.value === filter.value ? 'selected' : ''} onClick={() => this.setFilter(filter)}>
          {filter.label}
        </button>
        {this.currentFilter.value === filter.value && filter.options?.length && (
          <button class="options-button" onClick={(e) => this.renderSubMenu(e.currentTarget as HTMLElement, this.createFilterOptions(filter.options))}>
            {filter.options.find((option) => option.value === this.currentFilter.option).label}
          </button>
        )}
      </div>
    );
  }

  createFilterOptions(options) {
    const optionList = document.createElement('ul');

    options.forEach((option) => {
      const optionItem = document.createElement('li');
      const optionBtn = document.createElement('button');
      optionBtn.textContent = option.label;
      if (this.currentFilter.option === option.value) optionBtn.classList.add('selected');

      optionBtn.addEventListener('click', () => this.setFilterOption(option.value));
      optionItem.append(optionBtn);
      optionList.append(optionItem);
    });

    return optionList;
  }

  renderSubMenu(base: HTMLElement, content: string | HTMLElement) {
    let menu = base.parentElement.querySelector('tool-tip');

    if (menu) {
      document.dispatchEvent(new window.Event('click'));
      return;
    }

    menu = document.createElement('tool-tip');
    menu.classList.add('sub-menu');
    menu.base = base;
    menu.horizontalPos = 'left';
    menu.verticalPos = 'bottom';

    if (typeof content === 'string') menu.innerHTML = content;
    else menu.append(content);

    const destroy = (e) => {
      if (e && menu.parentElement.contains(e.path[0]) && !menu.contains(e.path[0])) return;

      menu.parentElement.removeChild(menu);
      document.removeEventListener('click', destroy);
      base.removeEventListener('click', destroy);
    };

    base.parentElement.append(menu);

    document.addEventListener('click', destroy);
  }

  renderModes() {
    return (
      <div class="mode-container filter">
        <button class="mode-button" onClick={(e) => this.renderSubMenu(e.currentTarget as HTMLElement, this.createModeOptions(this.modes))}>
          {this.modes.find((mode) => mode.value === this.currentMode).label}
        </button>
      </div>
    );
  }

  createModeOptions(modes) {
    const modeList = document.createElement('ul');

    modes.forEach((mode) => {
      const modeItem = document.createElement('li');
      const modeBtn = document.createElement('button');
      modeBtn.textContent = mode.label;
      if (this.currentMode === mode.value) modeBtn.classList.add('selected');

      modeBtn.addEventListener('click', () => this.setMode(mode.value));
      modeItem.append(modeBtn);
      modeList.append(modeItem);
    });

    return modeList;
  }

  setMode(mode: 'card' | 'compact' | 'classic') {
    this.currentMode = mode;
    this.newMode.emit(mode);
  }

  render() {
    return (
      <Host>
        {this.filters.map((filter) => this.renderFilter(filter))}
        {this.renderModes()}
      </Host>
    );
  }
}
