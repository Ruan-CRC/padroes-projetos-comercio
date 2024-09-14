import { Funcionario } from "./entityFuncionario";

interface BuilderFuncionario {
  setNome(nome: string): BuilderFuncionario;
  setSalario(salario: number): BuilderFuncionario;
  build(): Funcionario;
}

export default BuilderFuncionario;