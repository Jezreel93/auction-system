import { InjectRedis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { IWorkflowPort } from 'src/application/ports/out/workflow.port';
import { IWorkflow } from 'src/application/workflow/workflow.interface';

@Injectable()
export class RedisWorkflowService implements IWorkflowPort {
  private readonly keyPrefix = 'bid-receiver:workflow:';

  constructor(@InjectRedis() private readonly redis: Redis) {}

  async getWorkflow(id: string): Promise<IWorkflow> {
    const key = this.getKey(id);
    const workflow = await this.redis.get(key);
    return JSON.parse(workflow);
  }

  async updateWorkflow(workflow: IWorkflow): Promise<void> {
    const key = this.getKey(workflow.id);
    await this.redis.set(key, JSON.stringify(workflow));
  }

  private getKey(id: string): string {
    return `${this.keyPrefix}${id}`;
  }
}
