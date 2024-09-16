import Estoque from "../estoqueEntity";
import { expect, it, describe, beforeAll } from 'vitest'
import { ProdutoEstoque } from "../estoqueEntity";
import Produto from "../../produtos/produtoEntity";
import { beforeEach } from "node:test";
import { randomUUID, UUID } from "node:crypto";

describe('EstoqueEntity', () => {
  let estoque: Estoque;

  const produtos = [{
    produto: {
      id: randomUUID(),
      nome: 'Produto 1',
      _preco: 10,
      descricao: 'Descrição do produto 1',
    } as unknown as Produto,
    quantidade: 10,
  }, {
    produto: {
      id: randomUUID(),
      nome: 'Produto 2',
      _preco: 20,
      descricao: 'Descrição do produto 2',
    } as unknown as Produto,
    quantidade: 20,
  }]

  beforeAll(() => {
    estoque = new Estoque();
  })

  it('deve adicionar produtos', () => {
    estoque.produtos = produtos;

    expect(estoque.produtos.length).toBe(2);
    expect(estoque.produtos[0].produto.id).toBe(produtos[0].produto.id);
    expect(estoque.produtos[0].quantidade).toBe(10);
  })

  it('deve remover produtos', () => {
    estoque.produtos = produtos;

    estoque.removerProdutos([{ id: produtos[0].produto.id as UUID, quantidade: 5 }]);

    expect(estoque.produtos.length).toBe(2);
    expect(estoque.produtos[0].quantidade).toBe(5);
  })

  it('nao deve remover produtos que nao existem', () => {
    estoque.produtos = produtos;

    estoque.removerProdutos([{ id: randomUUID(), quantidade: 5 }]);

    expect(estoque.produtos.length).toBe(2);
  })

  it('nao deve remover produtos com quantidade maior que a existente', () => {
    estoque.produtos = produtos;

    estoque.removerProdutos([{ id: produtos[0].produto.id as UUID, quantidade: 15 }]);

    expect(estoque.produtos.length).toBe(2);
    expect(estoque.produtos[0].quantidade).toBe(0);
  })
})