import type { WidgetType } from '../types/widget.type';

export interface WidgetDefinition {
  type: WidgetType;
  name: string;
  icon: string;
  category: string;
  description: string;
  defaultData: Record<string, unknown>;
  settingsSchema: Record<string, unknown>;
  dependencies?: string[];
}

export class WidgetRegistry {
  private widgets: Map<WidgetType, WidgetDefinition> = new Map();

  register(widget: WidgetDefinition): void {
    this.widgets.set(widget.type, widget);
  }

  unregister(type: WidgetType): void {
    this.widgets.delete(type);
  }

  getAll(): WidgetDefinition[] {
    return Array.from(this.widgets.values());
  }

  getByType(type: WidgetType): WidgetDefinition | undefined {
    return this.widgets.get(type);
  }

  getByCategory(category: string): WidgetDefinition[] {
    return Array.from(this.widgets.values()).filter(w => w.category === category);
  }

  getCategories(): string[] {
    const categories = new Set<string>();
    this.widgets.forEach(widget => categories.add(widget.category));
    return Array.from(categories);
  }

  has(type: WidgetType): boolean {
    return this.widgets.has(type);
  }
}
