export interface Evento {
  id: number;
  idEventoPai: number;
  idOrganizador: number;
  nome: string;
  descricao: string;
  dataInicio: Date;
  dataFim: Date;
  local: string;
  preco: number;
  qtdVagas: number;
  dataInicioInscricao: Date;
  dataFimInscricao: Date;
}
