import { randomUUID, UUID } from "node:crypto";

enum permissoes {
  Caixa = 'Caixa',
  Estoque = 'Estoque',
  Gerente = 'Gerente',
}

export class Funcionario {
  private _id: UUID = randomUUID();
  protected permissoes: Array<string> = [];
  private nome: string;
  private salario: number

  constructor(nome: string, salario: number) {
    this.nome = nome;
    this.salario = salario;
    this.permissoes = [permissoes.Caixa, permissoes.Estoque];
  }

  get id(): UUID {
    return this._id;
  }

  get Funcionario(): Funcionario {
    return this;
  }

}

export class Gerente extends Funcionario {
  constructor(nome: string, salario: number) {
    super(nome, salario);
    this.permissoes = [permissoes.Caixa, permissoes.Estoque, permissoes.Gerente];
  }
}
