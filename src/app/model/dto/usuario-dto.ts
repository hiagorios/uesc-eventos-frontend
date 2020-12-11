import { PerfilDTO } from './perfil-dto';
export interface UsuarioDTO {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  perfil: PerfilDTO;
}
