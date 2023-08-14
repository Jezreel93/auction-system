export interface IWorkflow {
  id: string;
  stateProcessor: WorkflowState;
}

export enum WorkflowState {
  // COMPLETED = 'COMPLETED', PUEDE GATILLARSE LUEGO DE PROCESSED y mover a una BD quitandola de redis, no alcanzo a implementar
  PROCESSED = 'PROCESSED',
  PENDING = 'PENDING',
  FAILED = 'FAILED',
}
