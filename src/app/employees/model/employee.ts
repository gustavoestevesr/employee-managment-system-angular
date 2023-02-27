import { Address } from './address';
export interface Employee {
  // ordem de importância
  photo: string;
  name: string;
  email: string;
  cpf: string;
  address: Address;
  active: string;
  hiringDate: string;
}
