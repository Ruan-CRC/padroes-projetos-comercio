import { randomUUID, UUID } from "crypto";
import Produto from "../produtos/produtoEntity";
import Estoque from "../estoque/estoqueEntity";
import { Funcionario } from '../funcionario/entityFuncionario';
import MementoCaixa from "./mementos/mementoCaixa";
import MementoInterface from "../../shared/modules/mementoInterface";

export interface ProdutoCaixa {
  produto: Produto;
  quantidade: number;
}

class Caixa {
  private readonly id?: UUID;
  private _saldo: number = 0;
  private _produtos: Array<ProdutoCaixa> = [];
  private indexMemento: number = 0;

  constructor(
    private estoque: Estoque,
    private _funcionario: Funcionario,
    id?: UUID
  ) {
    this.id = id || randomUUID();
  }

  get produtos(): Array<ProdutoCaixa> | string {
    if (this._produtos.length === 0) {
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

    const quantidadeValorProdutos = this._produtos.map((produto) => {
      return {
        preco: produto.produto.preco,
        quantidade: produto.quantidade
      }
    })

    return quantidadeValorProdutos.reduce((acc, item) => {
      return acc + item.preco * item.quantidade;
    }, 0);
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

  removeProduto(id: UUID, quantidade: number): void {
    const produto = this._produtos.find((produto) => produto.produto.id === id);

    if (!produto) {
      throw new Error('Produto não encontrado no caixa');
    }

    if (produto.quantidade === quantidade) {
      this._produtos = this._produtos.filter((produto) => produto.produto.id !== id);
      return;
    }

    produto.quantidade -= quantidade;
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

    return new MementoCaixa(`my-state-${this.indexMemento}`, date, this._produtos);
  }

  restoreState(memento: MementoInterface): void {
    const caixaMemento = memento as MementoCaixa;
    const estado = caixaMemento.getEstado();
    
    if (Array.isArray(estado)) {
      this._produtos.map((prod) => {
        this.removeProduto(prod.produto.id as UUID, prod.quantidade);
      });
    } else {
      console.log('Estado inválido');
    }
  }
}

export default Caixa;