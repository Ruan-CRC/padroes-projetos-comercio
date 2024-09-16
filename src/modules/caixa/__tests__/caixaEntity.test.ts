import { expect, it, describe, beforeEach } from 'vitest'
import Caixa from '../entityCaixa'
import Estoque from '../../estoque/estoqueEntity'
import Produto from '../../produtos/produtoEntity'
import { FuncionarioBuilder } from '../../funcionario/builder/builders'
import { UUID } from 'crypto'

describe('CaixaEntity', () => {
  const funcionario = new FuncionarioBuilder()
    .setNome('João')
    .setSalario(2000)
    .build()

  const produto = new Produto('Produto 1', 10, 'descricao Produto 1')
  const produto01 = new Produto('Produto 2', 20, 'descricao Produto 2')

  let estoque: Estoque
  let caixa: Caixa

  beforeEach(() => {
    estoque = new Estoque()
    caixa = new Caixa(estoque, funcionario)
  })

  it('deve criar um caixa', () => {
    expect(caixa.produtos).toBe('Nenhum produto adicionado');
    expect(caixa.funcionario).toBe(funcionario);
    expect(caixa.saldo()).toBe(0);
  })

  it('deve adicionar produto ao caixa', () => {
    estoque.produtos = [{ produto, quantidade: 10 }, { produto: produto01, quantidade: 10 }]

    caixa.setProduto({ produto, quantidade: 3 })
    caixa.setProduto({ produto: produto01, quantidade: 2 })

    expect(caixa.produtos).toEqual([{ produto, quantidade: 3 }, { produto: produto01, quantidade: 2 }]);
    expect(caixa.saldo()).toBe(70);
  })

  it('deve ser possivel adicionar o mesmo produto ao caixa', () => {
    estoque.produtos = [{ produto, quantidade: 10 }]

    caixa.setProduto({ produto, quantidade: 3 })
    caixa.setProduto({ produto, quantidade: 2 })

    expect(caixa.produtos).toEqual([{ produto, quantidade: 5 }]);
    expect(caixa.saldo()).toBe(50);
  })

  it('deve retornar saldo 0 quando não houver produtos', () => {
    expect(caixa.saldo()).toBe(0);
  })

  it('deve ser possivel remover um produto do caixa', () => {
    estoque.produtos = [{ produto, quantidade: 10 }]

    caixa.setProduto({ produto, quantidade: 3 })
    caixa.setProduto({ produto, quantidade: 2 })

    caixa.removeProduto(produto.id as UUID, 2)

    expect(caixa.produtos).toEqual([{ produto, quantidade: 3 }]);
    expect(caixa.saldo()).toBe(30);
  })

  it('deve retornar erro ao tentar remover um produto que não existe no caixa', () => {
    estoque.produtos = [{ produto, quantidade: 10 }]

    caixa.setProduto({ produto, quantidade: 3 })

    expect(() => {
      caixa.removeProduto(produto01.id as UUID, 2)
    }).toThrowError('Produto não encontrado no caixa');
  })

  it('deve ser possivel finalizar a compra', () => {
    estoque.produtos = [{ produto, quantidade: 10 }]

    caixa.setProduto({ produto, quantidade: 3 })

    caixa.finalizarCompra()

    expect(caixa.produtos).toBe('Nenhum produto adicionado');
    expect(caixa.saldo()).toBe(0);
    expect(estoque.produtos).toEqual([{ produto, quantidade: 7 }]);
  })
})