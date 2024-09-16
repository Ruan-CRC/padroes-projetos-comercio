import { describe, it, expect, beforeEach } from 'vitest'
import { Funcionario, Gerente } from '../entityFuncionario'
import { randomUUID } from 'node:crypto'

describe('Funcionario Entity', () => {
  let funcionario: Funcionario

  beforeEach(() => {
    funcionario = new Funcionario('João', 1200)
  })

  it('deve criar um funcionário com nome e salário', () => {
    const novoFuncionario = new Funcionario('Maria', 1500)

    expect(novoFuncionario.Funcionario).toBeInstanceOf(Funcionario)
    expect(novoFuncionario.Funcionario['nome']).toBe('Maria')
    expect(novoFuncionario.Funcionario['salario']).toBe(1500)
  })

  it('deve gerar um UUID automaticamente para o funcionário', () => {
    const funcionarioId = funcionario.id

    expect(funcionarioId).toBeTypeOf('string')
    expect(funcionarioId).toHaveLength(36) // Verifica o comprimento do UUID
  })

  it('deve ter permissões padrões de Caixa e Estoque', () => {
    expect(funcionario.Funcionario['permissoes']).toEqual(['Caixa', 'Estoque'])
  })

  it('deve manter as permissões após criação', () => {
    const permissaoEsperada = ['Caixa', 'Estoque']

    expect(funcionario.Funcionario['permissoes']).toEqual(permissaoEsperada)
  })
})

describe('Gerente Entity', () => {
  let gerente: Gerente

  beforeEach(() => {
    gerente = new Gerente('Carlos', 3000)
  })

  it('deve criar um gerente com nome e salário', () => {
    expect(gerente.Funcionario).toBeInstanceOf(Gerente)
    expect(gerente.Funcionario['nome']).toBe('Carlos')
    expect(gerente.Funcionario['salario']).toBe(3000)
  })

  it('deve gerar um UUID automaticamente para o gerente', () => {
    const gerenteId = gerente.id

    expect(gerenteId).toBeTypeOf('string')
    expect(gerenteId).toHaveLength(36) // Verifica o comprimento do UUID
  })

  it('deve atribuir permissões de Caixa, Estoque e Gerente ao criar um gerente', () => {
    const permissoesEsperadas = ['Caixa', 'Estoque', 'Gerente']

    expect(gerente.Funcionario['permissoes']).toEqual(permissoesEsperadas)
  })

  it('deve manter as permissões após criação', () => {
    const permissoesEsperadas = ['Caixa', 'Estoque', 'Gerente']

    expect(gerente.Funcionario['permissoes']).toEqual(permissoesEsperadas)
  })
})
