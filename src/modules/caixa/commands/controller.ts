import { CommandCaixa } from "./commandInterface";

class ControllerCaixa {
  private commands: { [k: string]: any } = {};

  addCommand(name: string, command: any) {
    if (this.commands[name]) {
      throw new Error('Command already exists');
    };

    this.commands[name] = command;
  }

  executeCommand(name: string) {
    if (!this.commands[name]) {
      throw new Error('Command not found');
    };

    this.commands[name].execute();
  }

  undoCommand(name: string) {
    if (!this.commands[name]) {
      throw new Error('Command not found');
    };

    this.commands[name].undo();
  }
}

export default ControllerCaixa;