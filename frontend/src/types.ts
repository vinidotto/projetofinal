export interface Equipe {
    id: string;
    nome: string;
  }
  
  export interface Avaliador {
    id: string;
    nome: string;
  }
  
  export interface Avaliacao {
    id: string;
    equipe_id: string;
    avaliador_id: string;
    nota: number;
  }
  

  export interface Nota {
    originalidade?: number;
    impacto?: number;
    execucao?: number;
    apresentacao?: number;
    viabilidade?: number;
  }
  
  export interface Avaliacao {
    id: string;
    equipe_id: string;
    avaliador_id: string;
    notas: Nota;
    comentario?: string;
  }