export interface IEvent<T> {
  key: string;
  payload: T;
  result: State;
}

export enum State {
  // COMPLETED = 'COMPLETED', PUEDE GATILLARSE LUEGO DE PROCESSED y mover a una BD quitandola de redis, no alcanzo a implementar
  PROCESSED = 'PROCESSED',
  PENDING = 'PENDING',
  FAILED = 'FAILED',
}
