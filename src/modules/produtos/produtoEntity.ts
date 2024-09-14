import { UUID, randomUUID } from 'node:crypto';

class Produto {
  private readonly _id?: UUID;
  private nome: string;
  private _preco: number;
  private descricao: string;

  constructor(nome: string, preco: number, descricao: string, id?: UUID) {
    this._id = id ?? randomUUID();
    this.nome = nome;
    this._preco = preco;
    this.descricao = descricao;
  }

  getProduto(): Produto {
    return this;
  }

  set preco(preco: number) {
    this._preco = preco;
  }

  get preco(): number {
    return this._preco;
  }

  get id(): UUID | string {
    if (!this._id) {
      return 'Produto não encontrado';
    }

    return this._id;
  }
  
}

export default Produto;