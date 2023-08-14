import { WorkflowState } from './workflow.interface';

export interface IEvent<T> {
  key: string;
  payload: T;
  result: WorkflowState;
}
