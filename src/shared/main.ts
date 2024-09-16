import Caixa from '../modules/caixa/entityCaixa';
import Produto from '../modules/produtos/produtoEntity';
import Estoque from '../modules/estoque/estoqueEntity';
import { FuncionarioBuilder, GerenteBuilder } from '../modules/funcionario/builder/builders';
import BackupManegerCaixa from '../modules/caixa/mementos/backupManegerCaixa';
import ControllerCaixa from '../modules/caixa/commands/controller';
import AlteraEstadoCaixaCommand from '../modules/caixa/commands/alterarEstadoCaixa';

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
  {produto: produto3, quantidade: 30}
];

const alteraEstadoCaixaCommand = new AlteraEstadoCaixaCommand(backupManegerCaixa);
const controllerCaixa = new ControllerCaixa();

controllerCaixa.addCommand('estadoCompra', alteraEstadoCaixaCommand);

controllerCaixa.executeCommand('estadoCompra')
caixa01.setProduto({ produto, quantidade: 5 })

controllerCaixa.executeCommand('estadoCompra')
caixa01.setProduto({ produto: produto2, quantidade: 15 })

controllerCaixa.executeCommand('estadoCompra')
caixa01.setProduto({ produto: produto2, quantidade: 5 })

controllerCaixa.executeCommand('estadoCompra')
controllerCaixa.undoCommand('estadoCompra')

caixa01.finalizarCompra();

console.log(estoque.produtos)



