import { UUID } from "crypto";
import Produto from "../../produtos/produtoEntity";
import Caixa from "../entityCaixa";
import { CommandCaixa } from "./commandInterface";

class AddRemoveProdutoCaixaCommand {
  constructor(private readonly caixa: Caixa) {}

  execute(produto: Produto, quantidade: number = 1): void {
    this.caixa.setProduto({
      produto,
      quantidade
    });
  }

  undo(produtoId: UUID, quantidade: number) {
    this.caixa.removeProduto(produtoId, quantidade);
  }
}

export default AddRemoveProdutoCaixaCommand;