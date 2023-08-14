// receive-bid.service.ts

import { Inject } from '@nestjs/common';
import { IBid } from 'src/domain';

import { IEvent } from './workflow/event';
import { IReceiveBidPort } from './ports/in/receive-bid.port';
import { WORKFLOW_PORT, IWorkflowPort } from './ports/out/workflow.port';
import {
  IEmitBidResultPort,
  MESSAGE_SERVICE_PORT,
} from './ports/out/emit-bid-result.port';
import { Workflow } from './workflow/workflow.model';
import { WorkflowService } from './workflow/workflow.service';

export class ReceiveBidService implements IReceiveBidPort {

  constructor(
    @Inject(WORKFLOW_PORT)
    private readonly workflowPort: IWorkflowPort,
    @Inject(MESSAGE_SERVICE_PORT)
    private readonly emitBidResultPort: IEmitBidResultPort,
  ) {}

  async receiveBid(event: IEvent<IBid>): Promise<void> {
    const workflowId = event.payload.id;
    const currentWorkflow = await this.workflowPort.getWorkflow(workflowId);
    currentWorkflow.stateProcessor = event.result;

    await this.workflowPort.updateWorkflow(currentWorkflow);

    if (this.isWorkflowProcessed(currentWorkflow)) {
      await this.emitBidResultPort.emitBidResult(event);
    }
  }

  private isWorkflowProcessed(workflow: Workflow): boolean {
    return WorkflowService.isProcessed(workflow);
  }
}
