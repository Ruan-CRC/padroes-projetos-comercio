import Produto from "../produtoEntity";

class AdicionarProduto {
  constructor(private produtoRepository: ProdutoRepository) {}

  async execute(produto: Produto): Promise<void> {
    await this.produtoRepository.adicionar(produto);
  }
}

export default AdicionarProduto;