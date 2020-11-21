import { Entity } from '../entity';

export interface EventoFormDTO extends Entity {
  idEventoPai: number;
  idOrganizador;
  nome: string;
  descricao: string;
  local: string;
  preco: number;
  qtdVagas: number;
  inicio: Date;
  fim: Date;
  inicioInscricoes: Date;
  fimInscricoes: Date;
  idsMinistrantes: number[];
}
