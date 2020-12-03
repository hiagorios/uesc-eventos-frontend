import { Entity } from '../entity';
import { EventoDTO } from './evento-dto';
import { UsuarioDTO } from './usuario-dto';

export interface EventoListDTO extends Entity {
  eventoPai: EventoDTO;
  organizador: UsuarioDTO;
  nome: string;
  descricao: string;
  imagem: string;
  inicio: Date;
  fim: Date;
  local: string;
  preco: number;
  qtdVagas: number;
  vagasRestantes: number;
  inicioInscricoes: Date;
  fimInscricoes: Date;
}
