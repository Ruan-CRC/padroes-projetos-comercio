import { randomUUID, UUID } from "crypto";
import Produto from "../produtos/produtoEntity";
import somaTotal from "../../shared/utils/somaTotal";
import Estoque from "../estoque/estoqueEntity";
import { Funcionario } from '../funcionario/entityFuncionario';
import MementoCaixa from "./mementos/mementoCaixa";
import MementoInterface from "../../shared/modules/mementoInterface";

interface ProdutoCaixa {
  produto: Produto;
  quantidade: number;
}

class Caixa {
  private readonly id?: UUID;
  private _saldo: number = 0;
  private _produtos: Array<ProdutoCaixa> = [];
  private _funcionario: Funcionario;
  private indexMemento: number = 0;

  constructor(
    private estoque: Estoque,
    funcionario: Funcionario,
    id?: UUID
  ) {
    this.id = id || randomUUID();
    this._funcionario = funcionario;
  }

  get produtos(): Array<ProdutoCaixa> | string {
    if (!this._produtos) {
      return 'Nenhum produto adicionado';
    }

    return this._produtos;
  }

  get funcionario(): Funcionario {
    return this._funcionario;
  }

  saldo(): number {
    if (!this._produtos) {
      return 0;
    }
    
    const total = somaTotal(this._produtos.map((produto) => produto.produto));

    return total;
  }

  setProduto(produto: ProdutoCaixa) {
    if (!this._produtos.find(p => p.produto.id === produto.produto.id)) {
      this._produtos.push(produto);
      return;
    }

    this._produtos.forEach((prod) => {
      if (prod.produto.id === produto.produto.id) {
        prod.quantidade += produto.quantidade;
      }
    });
  }

  removeProduto(id: UUID): void {
    this._produtos = this._produtos.filter((produto) => produto.produto.id !== id);
  }

  finalizarCompra(): void {
    const produtosIdsEQuantidade = this._produtos.map((produto) => ({
      id: produto.produto.id as UUID,
      quantidade: produto.quantidade
    }));

    this.estoque.removerProdutos(produtosIdsEQuantidade);

    this._produtos = [];
  }

  trocarFuncionario(funcionario: Funcionario): void {
    this._funcionario = funcionario;
  }

  save(): Readonly<MementoInterface> {
    this.indexMemento += 1;
    const date = new Date();

    const prodtos = this._produtos.map((prod) => prod.produto.getProduto());

    return new MementoCaixa(`my-state-${this.indexMemento}`, date, prodtos);
  }

  restoreState(memento: MementoInterface): void {
    const caixaMemento = memento as MementoCaixa;
    const estado = caixaMemento.getEstado();
    
    if (Array.isArray(estado)) {
      this._produtos.map((prod) => {
        this.removeProduto(prod.produto.id as UUID);
      });
    } else {
      console.log('Estado inválido');
    }
  }
}

export default Caixa;