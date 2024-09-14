import { Funcionario } from "./entityFuncionario";
import BuilderFuncionario from "./interfaceBuilderFuncionario";

export class FuncionarioBuilder implements BuilderFuncionario {
  private nome!: string;
  private salario: number = 0;

  setNome(nome: string): BuilderFuncionario {
    this.nome = nome;
    return this;
  }
  setSalario(salario: number): BuilderFuncionario {
    this.salario = salario;
    return this;
  }

  build(): Funcionario {
    return new Funcionario(this.nome, this.salario);
  }

}

export class GerenteBuilder implements BuilderFuncionario {
  private nome!: string;
  private salario: number = 0;

  setNome(nome: string): BuilderFuncionario {
    this.nome = nome;
    return this;
  }

  setSalario(salario: number): BuilderFuncionario {
    this.salario = salario;
    return this;
  }
  
  build(): Funcionario {
    return new Funcionario(this.nome, this.salario);
  }
}