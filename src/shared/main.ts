import Caixa from '../modules/caixa/entityCaixa';
import Produto from '../modules/produtos/produtoEntity';
import Estoque from '../modules/estoque/estoqueEntity';
import { FuncionarioBuilder, GerenteBuilder } from '../modules/funcionario/builders';
import BackupManegerCaixa from '../modules/caixa/backupManegerCaixa';
import AdicionaProdutoNoCaixa from '../modules/caixa/useCase/adicionaProduto';

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

estoque.produtos = [
  {produto, quantidade: 10},
  {produto: produto2, quantidade: 20},
  {produto: produto3, quantidade: 4}
];

const adicionaProdutoAoCaixa = new AdicionaProdutoNoCaixa(caixa01);


backupManegerCaixa.backup();
adicionaProdutoAoCaixa.execute(produto, 2);

backupManegerCaixa.backup();
adicionaProdutoAoCaixa.execute(produto2, 3);

backupManegerCaixa.backup();
adicionaProdutoAoCaixa.execute(produto3, 2);

backupManegerCaixa.restore(1);
backupManegerCaixa.showMementos();

backupManegerCaixa.backup();
adicionaProdutoAoCaixa.execute(produto3, 2);

caixa01.finalizarCompra();

console.log(estoque.produtos)



