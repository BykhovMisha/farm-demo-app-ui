export class PageModel<T> {
  public totalCount: number;
  public items: T[];

  public constructor(page: Partial<PageModel<T>>) {
    this.totalCount = page.totalCount ?? 0;
    this.items = page.items ?? [];
  }
}
