import { describe, it, expect, beforeEach } from 'vitest'
import Produto from '../produtoEntity'
import { randomUUID } from 'node:crypto'

describe('Produto Entity', () => {
  let produto: Produto

  beforeEach(() => {
    produto = new Produto('Produto Teste', 50, 'Descrição Teste')
  })

  it('deve criar um produto com nome, preço e descrição', () => {
    const novoProduto = new Produto('Produto 1', 100, 'Descrição do Produto 1')
    
    expect(novoProduto.getProduto().preco).toBe(100)
    expect(novoProduto.getProduto()).toMatchObject({
      nome: 'Produto 1',
      preco: 100,
      descricao: 'Descrição do Produto 1'
    })
  })

  it('deve ter um UUID gerado automaticamente ao criar um produto', () => {
    const produtoUUID = produto.id

    expect(produtoUUID).toBeTypeOf('string')
    expect(produtoUUID).toHaveLength(36)  // Verifica se o UUID tem o comprimento correto
  })

  it('deve aceitar um UUID ao criar um produto', () => {
    const uuid = randomUUID()
    const produtoComUUID = new Produto('Produto 2', 150, 'Descrição do Produto 2', uuid)

    expect(produtoComUUID.id).toBe(uuid)
  })

  it('deve atualizar o preço do produto', () => {
    produto.preco = 200

    expect(produto.preco).toBe(200)
  })

  it('deve retornar o produto com todas as suas informações', () => {
    const resultado = produto.getProduto()

    expect(resultado.preco).toBe(50)
    expect(resultado).toMatchObject({
      nome: 'Produto Teste',
      preco: 50,
      descricao: 'Descrição Teste'
    })
  })
})
