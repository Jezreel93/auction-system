export interface Publisher {
  publish<T>(topic: string, message: T): Promise<void>;
}
