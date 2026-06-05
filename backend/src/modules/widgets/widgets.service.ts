import { Injectable } from '@nestjs/common';
import { WidgetRegistry } from './widget-registry';

@Injectable()
export class WidgetsService {
  private readonly registry = new WidgetRegistry();

  getAllWidgets() {
    return this.registry.getAll();
  }

  getWidgetByType(type: string) {
    return this.registry.getByType(type);
  }

  getWidgetsByCategory(category: string) {
    return this.registry.getByCategory(category);
  }

  getCategories() {
    return this.registry.getCategories();
  }
}
