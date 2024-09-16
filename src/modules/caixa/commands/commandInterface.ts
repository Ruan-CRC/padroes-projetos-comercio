export interface CommandCaixa {
  execute(parans?: any): void;
  undo(parans?: any): void;
}