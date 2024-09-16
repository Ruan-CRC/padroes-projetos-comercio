import BackupManegerCaixa from "../mementos/backupManegerCaixa";

class AlteraEstadoCaixaCommand {
  constructor(private readonly backupManegerCaixa: BackupManegerCaixa) {}

  execute() {
    this.backupManegerCaixa.backup();
  }

  undo(quantidade: number): void {
    this.backupManegerCaixa.restore(quantidade)
  }
}

export default AlteraEstadoCaixaCommand;