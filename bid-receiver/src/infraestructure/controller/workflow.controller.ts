import { Controller, Get, Param } from '@nestjs/common';
import { IWorkflow } from 'src/application/workflow/workflow.interface';
import { RedisWorkflowService } from '../redis/redis-workflow.service';

@Controller('/workflow')
export class WorkflowController {
  constructor(
    private readonly redis: RedisWorkflowService, // TODO: Por tiempo no lo hice por ports, pero debería ser un port
  ) {}

  @Get(':id')
  async getWorkflow(@Param('id') id: string): Promise<IWorkflow> {
    const workflow = await this.redis.getWorkflow(id);
    return workflow;
  }
}
