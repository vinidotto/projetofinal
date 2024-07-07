export interface Avaliacao {
    id?: number;
    avaliador_id: number;
    equipe_id: number;
    notas: {
      originalidade: number;
      impacto: number;
      execucao: number;
      apresentacao: number;
      viabilidade: number;
    };
  }