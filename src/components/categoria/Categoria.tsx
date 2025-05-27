interface ProdutoProps {
  nome: string;
  preco: number;
  imagem: string;
}

interface CategoriaProps {
  id: string;
  titulo: string;
  produtos: ProdutoProps[];
  aoAdicionar: (produto: ProdutoProps) => void;
}

const Categoria = ({ id, titulo, produtos, aoAdicionar }: CategoriaProps) => {
  return (
    <section id={id} className="categoria">
      <h3>{titulo}</h3>
      <div className="produtos-container">
        {produtos.map(produto => (
          <div key={produto.nome} className="produto">
            <img src={produto.imagem} alt={produto.nome} />
            <h3>{produto.nome}</h3>
            <p>R$ {produto.preco.toFixed(2)}</p>
            <button onClick={() => aoAdicionar(produto)}>Adicionar ao carrinho</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categoria;
