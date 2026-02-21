import { Component, computed, signal } from '@angular/core';
import menuData from './menu-data.json';

type MenuItem = {
  id: number;
  name: string;
  value: number;
};

type MenuType = {
  id: string;
  label: string;
  items: MenuItem[];
};

const MENU_TYPES = menuData.types as MenuType[];

type MenuItemWithType = MenuItem & { type: string };

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  template: `
    <main class="menu-page">
      <header class="menu-header">
        <h2 class="menu-header__title">Раздел: {{ selectedType() }}</h2>
        <div class="menu-header__summary">
          <span>Выбрано пунктов: {{ selectedCount() }}</span>
          <span>Общее значение: {{ selectedSum() }}</span>
        </div>
      </header>

      <aside class="menu-sidebar">
        <nav class="menu-sidebar__nav">
          @for (type of types(); track type.id) {
            <button
              class="menu-sidebar__link"
              [class.is-active]="selectedType() === type.id"
              (click)="setType(type.id)"
              type="button"
            >
              {{ type.label }}
            </button>
          }
        </nav>
      </aside>

      <section class="menu-content">
        <div class="menu-list">
          @for (item of filteredItems(); track item.id) {
            <label class="menu-item">
              <input
                type="checkbox"
                [checked]="isSelected(item.id)"
                (change)="toggle(item.id, $any($event).target.checked)"
              />
              <div class="menu-item__text">
                <div class="menu-item__name">{{ item.name }}</div>
                <div class="menu-item__value">Value: {{ item.value }}</div>
              </div>
            </label>
          }
        </div>

      </section>
    </main>
  `
})
export class MenuComponent {
  readonly types = signal<MenuType[]>(MENU_TYPES);
  readonly items = computed<MenuItemWithType[]>(() =>
    this.types().flatMap((type) =>
      type.items.map((item) => ({ ...item, type: type.id }))
    )
  );
  readonly selectedIds = signal<Set<number>>(new Set());
  readonly selectedType = signal<string>(MENU_TYPES[0]?.id ?? '');

  readonly filteredItems = computed(() =>
    this.items().filter((item) => item.type === this.selectedType())
  );

  readonly selectedItems = computed(() =>
    this.filteredItems().filter((item) => this.selectedIds().has(item.id))
  );

  readonly selectedCount = computed(() => this.selectedItems().length);

  readonly selectedSum = computed(() =>
    this.selectedItems().reduce((sum, item) => sum + item.value, 0)
  );

  isSelected(id: number): boolean {
    return this.selectedIds().has(id);
  }

  toggle(id: number, checked: boolean): void {
    const next = new Set(this.selectedIds());
    if (checked) {
      next.add(id);
    } else {
      next.delete(id);
    }
    this.selectedIds.set(next);
  }

  setType(type: string): void {
    this.selectedType.set(type);
  }
}
