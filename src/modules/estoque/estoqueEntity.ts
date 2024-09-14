import { randomUUID, UUID } from "crypto";
import Produto from "../produtos/produtoEntity";
import somaTotal from "../../shared/utils/somaTotal";

interface ProdutoEstoque {
  produto: Produto;
  quantidade: number;
}

interface removerProdutos {
  id: UUID;
  quantidade: number;
}

class Estoque {
  private readonly _id: UUID = randomUUID();
  private _produtos: Array<ProdutoEstoque> = [];

  constructor() {}

  set produtos(produtos: Array<ProdutoEstoque>) {
    for (const produto of produtos) {
      const produtoExistente = this._produtos.find(
        (p) =>
          'produto' in p && (p as ProdutoEstoque).produto.id === (produto as ProdutoEstoque).produto.id
      );
      
      if (!produtoExistente) {
        this._produtos.push(produto);
      }
    }
  }

  get produtos(): Array<ProdutoEstoque> {
    return this._produtos;
  }

  get quantidadeTotalProdutos(): number {
    return this._produtos.reduce((total, produto) => {
      if ('quantidade' in produto) {
        return total + produto.quantidade;
      }
      return total + 1;
    }, 0);
  }

  get valorTotalEstoque(): number {
    return somaTotal(
      this._produtos.map((produto) =>
        'produto' in produto ? produto.produto : produto
      )
    );
  }

  removerProdutos(produto: Array<removerProdutos>): void {
    produto.forEach((prod) => {
      const produtoIndex = this._produtos.findIndex(
        (p) => 'produto' in p && p.produto.id === prod.id
      );
      if (produtoIndex === -1) {
        return;
      }

      this._produtos[produtoIndex].quantidade -= prod.quantidade;

      if (this._produtos[produtoIndex].quantidade <= 0) {
        this._produtos.splice(produtoIndex, 1);
      }
    });
  }
  
  
}

export default Estoque;
