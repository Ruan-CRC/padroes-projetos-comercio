import { randomUUID, UUID } from "crypto";
import Produto from "../produtos/produtoEntity";
import somaTotal from "../../shared/utils/somaTotal";

class Estoque {
  private readonly _id: UUID = randomUUID();
  private quantidadeProdutos: number = 0;
  private _produtos: Array<Produto> = [];

  constructor() {}

  set produtos(produtos: Array<Produto>) {
    this._produtos = produtos;
    this.quantidadeProdutos = produtos.length;
  }

  get produtos(): Array<Produto> {
    return this._produtos;
  }

  get quantidadeTotalProdutos(): number {
    return this.quantidadeProdutos;
  }

  get valorTotal(): number {
    const total = somaTotal(this._produtos);
    return total;
  }

  removerProdutos(ids: Array<UUID>): void {
    this._produtos = this._produtos.filter((produto) => !ids.includes(produto.id as UUID));
    this.quantidadeProdutos = this._produtos.length;
  }
}

export default Estoque;