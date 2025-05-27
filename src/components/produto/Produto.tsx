export interface ProdutoProps {
  nome: string;
  preco: number;
  imagem: string;
  onAddToCart: () => void;
}

const Produto = ({ nome, preco, imagem, onAddToCart }: ProdutoProps) => {
  return (
    <div className="produto-card">
      <img src={imagem} alt={nome} />
      <h3>{nome}</h3>
      <p>R$ {preco.toFixed(2)}</p>
      <button onClick={onAddToCart}>Adicionar ao Carrinho</button>
    </div>
  );
};

export default Produto;
