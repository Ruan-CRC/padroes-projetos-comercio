import MementoInterface from "../../../shared/modules/mementoInterface";
import Produto from "../../produtos/produtoEntity";

class MementoCaixa implements MementoInterface {
  constructor(
    private readonly _name: string,
    private readonly _date: Date,
    private produtos: Array<Produto> | string,
  ) { }

  get name(): string {
    return this._name;
  }

  get date(): Date {
    return this._date;
  }

  getEstado() {
    return this.produtos;
  }
}

export default MementoCaixa;