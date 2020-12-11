import { Entity } from './entity';
export interface Perfil extends Entity{
  nome: string;
  permissions: any[];
}
