import { Entity } from '../entity';
import { UsuarioDTO } from './usuario-dto';

export interface EventoDTO extends Entity {
  idEventoPai: number;
  organizador: UsuarioDTO;
  nome: string;
  descricao: string;
  inicio: Date;
  fim: Date;
  local: string;
  preco: number;
  qtdVagas: number;
  inicioInscricoes: Date;
  fimInscricoes: Date;
}
