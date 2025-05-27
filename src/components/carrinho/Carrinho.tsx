import type { ProdutoProps } from "../produto/Produto";


interface CarrinhoProps {
  itens: ProdutoProps[];
}

const Carrinho = ({ itens }:CarrinhoProps) => {
  const total = itens.reduce((acc, item) => acc + item.preco, 0);

  return (
    <section className="carrinho">
      <h2>Carrinho de Compras</h2>
      {itens.length === 0 && <p>Seu carrinho está vazio.</p>}
      <ul className="carrinho-lista">
        {itens.map((item, i) => (
          <li key={i}>
            {item.nome} - R$ {item.preco.toFixed(2)}
          </li>
        ))}
      </ul>
      <p><strong>Total:</strong> R$ {total.toFixed(2)}</p>
      <button disabled={itens.length === 0}>Finalizar Compra</button>
    </section>
  );
};

export default Carrinho;
