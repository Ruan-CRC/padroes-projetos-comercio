interface item {
  preco: number;
  [key: string]: any;
}

export default function somaTotal(itens: Array<item>): number {
  const total = itens.reduce((acc, item) => {
    return acc + item.preco;
  }, 0);

  return total;
}
