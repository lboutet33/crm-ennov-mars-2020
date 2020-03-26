import { StateClient } from '../enums/state-client.enum';

export interface ClientsI {
  id: number;
  name: string;
  email: string;
  state: StateClient;
}
