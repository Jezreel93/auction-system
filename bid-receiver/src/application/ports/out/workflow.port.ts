import { IWorkflow } from 'src/application/workflow/workflow.interface';

export interface IWorkflowPort {
  getWorkflow(id: string): Promise<IWorkflow>;
  updateWorkflow(workflow: IWorkflow): Promise<void>;
}

export const WORKFLOW_PORT = 'WORKFLOW_PORT';
