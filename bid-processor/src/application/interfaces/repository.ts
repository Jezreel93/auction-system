export interface Repository<T> {
  update(entity: T): Promise<T>;
  getById(id: string): Promise<T>;
}
