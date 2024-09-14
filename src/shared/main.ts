import Caixa from '../modules/caixa/entityCaixa';
import Produto from '../modules/produtos/produtoEntity';
import Estoque from '../modules/estoque/estoqueEntity';
import { FuncionarioBuilder, GerenteBuilder } from '../modules/funcionario/builders';
import BackupManegerCaixa from '../modules/caixa/backupManegerCaixa';

const estoque = new Estoque();

const funcionario = new FuncionarioBuilder()
  .setNome('João')
  .setSalario(2000)
  .build()

const gerente = new GerenteBuilder()
  .setNome('João')
  .setSalario(5000)
  .build()

const produto = new Produto('Produto 1', 10, 'Descrição do produto 1');
const produto2 = new Produto('Produto 2', 20, 'Descrição do produto 2');
const produto3 = new Produto('Produto 3', 30, 'Descrição do produto 3');

const caixa01 = new Caixa(estoque, funcionario);

const backupManegerCaixa = new BackupManegerCaixa(caixa01);




estoque.produtos = [produto, produto2, produto3];

backupManegerCaixa.backup();
caixa01.setProduto(produto);

backupManegerCaixa.backup();
caixa01.setProduto(produto2);

backupManegerCaixa.backup();
caixa01.setProduto(produto3);

console.log(caixa01.produtos)


backupManegerCaixa.backup();
backupManegerCaixa.restore(2);

backupManegerCaixa.showMementos();
console.log(caixa01.produtos)


