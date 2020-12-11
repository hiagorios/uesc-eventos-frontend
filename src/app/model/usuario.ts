import { Perfil } from './perfil';
export interface Usuario {
  id: number;
  nome: string;
  email: string;
  senha: string;
  perfil: Perfil;
  cpf: string;
}
