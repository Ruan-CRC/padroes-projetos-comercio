import Produto from "../../produtos/produtoEntity";
import Caixa from "../entityCaixa";

class AdicionaProdutoNoCaixa {
  constructor(
    private readonly caixa: Caixa
  ) {}

  execute(produto: Produto, quantidade: number = 1): void {
    this.caixa.setProduto({
      produto,
      quantidade
    });
  }
}

export default AdicionaProdutoNoCaixa;