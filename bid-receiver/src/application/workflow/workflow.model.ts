import { WorkflowState } from './workflow.interface';

export class Workflow {
  id: string;
  stateProcessor: WorkflowState;

  constructor(id: string, stateProcessor: WorkflowState) {
    this.id = id;
    this.stateProcessor = stateProcessor;
  }
}
