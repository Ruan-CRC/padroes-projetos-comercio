import MementoInterface from "../../../shared/modules/mementoInterface";
import { ProdutoCaixa } from "../entityCaixa";

class MementoCaixa implements MementoInterface {
  constructor(
    private readonly _name: string,
    private readonly _date: Date,
    private readonly produtos: Array<ProdutoCaixa> = [],
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