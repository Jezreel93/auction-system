import { Workflow } from './workflow.model';
import { WorkflowState } from './workflow.interface';

export class WorkflowService {
  static create(id: string): Workflow {
    return new Workflow(id, WorkflowState.PENDING);
  }

  static isProcessed(workflow: Workflow): boolean {
    return workflow.stateProcessor === WorkflowState.PROCESSED;
  }
}
