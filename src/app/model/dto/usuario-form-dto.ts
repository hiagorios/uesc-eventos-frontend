import { Entity } from '../entity';
import { PerfilDTO } from './perfil-dto';

export interface UsuarioFormDTO extends Entity {
    id: number;
    nome: string;
    email: string;
    senha: string;
    cpf: string;
    perfilId: number;
}
