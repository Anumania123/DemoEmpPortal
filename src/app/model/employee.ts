import { Address } from './address';
import { Company } from './company';

export class Employee {
  Id: number;
  Name: string;
  username: string;
  firstName: string;
  lastName: string;
  Email: string;
  Address: Address;
  Phone: string;
  webSite: string;
  company: string;
  token?: string;
}
