import MementoInterface from "../../../shared/modules/mementoInterface";
import Caixa from "../entityCaixa";
import MementoCaixa from "./mementoCaixa";

class BackupManegerCaixa {
  private mementos: Array<MementoInterface> = [];

  constructor(
    private readonly caixa: Caixa,
  ) {}

  backup(): void {
    this.mementos.push(this.caixa.save());
  }

  restore(quantidade: number = 1): void {
    if (quantidade <= 0 || quantidade > this.mementos.length) {
      console.log('Quantidade inválida ou backups não encontrados');
      return;
    }

    this.mementos.splice(-quantidade);

    const mementoMaisRecenteQueRestou = this.mementos[this.mementos.length - 1];

    this.caixa.restoreState(mementoMaisRecenteQueRestou);
  }
  

  showMementos(): void {
    this.mementos.forEach((memento, index) => {
      const mementoCaixa = memento as MementoCaixa;
      console.log(`Backup ${index + 1}: ${mementoCaixa.name} em ${mementoCaixa.date} - Produtos: ${mementoCaixa.getEstado()}`);
    });
  }
}

export default BackupManegerCaixa;