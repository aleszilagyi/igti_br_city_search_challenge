export interface UnF {
  ID: string;
  Sigla: string;
  Nome: string;
}

export interface Cities {
  ID: string;
  Nome: string;
  Estado: string;
}

export interface StatesUF {
  ID: string;
  Nome: string;
  Estado: string;
}

export interface TotalCities {
  name: string;
  amount: number;
  state?: string;
}
