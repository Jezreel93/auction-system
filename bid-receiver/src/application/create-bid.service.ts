// filename: create-bid.service.ts

import { Inject } from '@nestjs/common';
import { Bid, IBid } from 'src/domain';
import { ICreateBidPort } from './ports/in/create-bid.port';
import { BID_PUBLISHER_PORT, IBidPublisherPort } from './ports/out/bid.port';
import { ID_GENERATOR_PORT, IDGeneratorPort } from './ports/out/id-generator-port';
import { WORKFLOW_PORT, IWorkflowPort } from './ports/out/workflow.port';
import { IEvent } from './workflow/event';
import { WorkflowService } from './workflow/workflow.service';
import { WorkflowState } from './workflow/workflow.interface';

export class CreateBidService implements ICreateBidPort {

  constructor(
    @Inject(BID_PUBLISHER_PORT) private readonly bidPublisher: IBidPublisherPort,
    @Inject(ID_GENERATOR_PORT) private readonly idGeneratorService: IDGeneratorPort,
    @Inject(WORKFLOW_PORT) private readonly workflowService: IWorkflowPort,
  ) {}

  async createBid(bidData: IBid): Promise<string> {
    const generatedId = this.idGeneratorService.generateId();
    const bid = new Bid({ ...bidData, id: generatedId });

    const workflowInstance = WorkflowService.create(generatedId);
    await this.workflowService.updateWorkflow(workflowInstance);

    const bidEvent: IEvent<IBid> = {
      key: bid.auctionId,
      payload: bid,
      result: WorkflowState.PENDING,
    };

    await this.bidPublisher.createBid(bidEvent);
    return generatedId;
  }
}
