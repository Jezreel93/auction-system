import { v4 as uuidv4 } from 'uuid';
import { IDGeneratorPort } from 'src/application/ports/out/id-generator-port';

export class IdGenerator implements IDGeneratorPort {
  generateId(): string {
    return uuidv4();
  }
}
