import { nanoid } from 'nanoid';
import { IIdProvider } from '@ratatouille/modules/core/id-provider';

export class SystemIdProvider implements IIdProvider {
  generate(): string {
    return nanoid();
  }
}
