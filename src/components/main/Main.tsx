import React, { useState, useEffect } from "react";
import Categoria from "../categoria/Categoria";
import "../../../styles.css";

interface ProdutoProps {
  nome: string;
  preco: number;
  imagem: string;
}

interface CategoriaProps {
  id: string;
  titulo: string;
  produtos: ProdutoProps[];
}

interface ItemCarrinho extends ProdutoProps {
  quantidade: number;
}

const Main: React.FC = () => {
  const categorias: CategoriaProps[] = [
    {
      id: "blusas",
      titulo: "Blusas & Camisas",
      produtos: [
        { nome: "Camisa Boho Chic Roxa", preco: 119.90, imagem: "./assets/img/camisa-roxa.jpeg" },
        { nome: "Camisa Feminina em Tricoline Bege", preco: 239.99, imagem: "./assets/img/camisa-feminina-tricoline-bege.jpg" },
        { nome: "Camisa Feminina Oversized Azul", preco: 239.99, imagem: "./assets/img/camisa-feminina-oversized-azul.jpg" },
        { nome: "Blusa Estampada Verde", preco: 129.99, imagem: "./assets/img/blusa-estampada-verde.jpg" },
        { nome: "Blusa Under Seamless Vermelho", preco: 69.99, imagem: "./assets/img/blusa-under-vermelho.jpg" },
        { nome: "Blusa Polo feminina Listrada", preco: 259.99, imagem: "./assets/img/blusa-polo-feminina-listrada.jpg" },
      ],
    },
    {
      id: "calcas",
      titulo: "Calças",
      produtos: [
        { nome: "Calça Alfaiataria Preta", preco: 349.99, imagem: "/assets/img/calca-alfaiataria-preta.jpg" },
        { nome: "Calça Contrastes Marrom", preco: 200.00, imagem: "./assets/img/calca-contrastes-marrom.jpg" },
        { nome: "Calça Sarja Prata", preco: 499.00, imagem: "./assets/img/calca-sarja-prata.jpg" },
        { nome: "Calça Cintura Alta Vermelho Anos 90", preco: 279.99, imagem: "./assets/img/calca-cintura-alta-vermelho.jpg" },
        { nome: "Calça Jeans Reta Cintura Alta", preco: 239.99, imagem: "./assets/img/calca-jeans-reta-cintura-alta.jpg" },
        { nome: "Calça Reta Cintura Alta Linho Rosa", preco: 239.99, imagem: "./assets/img/calca-reta-linho-rosa.jpg" },
      ],
    },
    {
      id: "vestidos",
      titulo: "Vestidos",
      produtos: [
        { nome: "Vestido Amarelo", preco: 750.41, imagem: "./assets/img/vestido-amarelo.jpg" },
        { nome: "Vestido Estampado Folhagem Longo", preco: 239.90, imagem: "./assets/img/vestido-folhagem.jpg" },
        { nome: "Vestido Bordado Flower", preco: 249.99, imagem: "./assets/img/vestido-flower.jpg" },
        { nome: "Vestido Fino Marias Rosa", preco: 159.99, imagem: "./assets/img/vestido-marias-rosa.jpg" },
        { nome: "Vestido Midi Decote V Creme", preco: 299.99, imagem: "./assets/img/vestido-midi-creme.jpg" },
        { nome: "Vestido Evasê Caqui", preco: 299.99, imagem: "./assets/img/vestido-evase-caqui.jpg" },
      ],
    },
    {
      id: "esportiva",
      titulo: "Moda Esportiva",
      produtos: [
        { nome: "Camiseta Esportiva", preco: 79.90, imagem: "./assets/img/camiseta-esportiva.jpg" },
        { nome: "Casaco Powercool", preco: 359.90, imagem: "./assets/img/casaco-powercool.jpg" },
        { nome: "Casaco Feeling", preco: 529.90, imagem: "./assets/img/casaco-feeling.jpg" },
        { nome: "Bermuda Esportiva Biker Verde", preco: 139.99, imagem: "./assets/img/bermuda-esportiva-biker-verde.jpg" },
        { nome: "Bermuda Esportiva Biker Laranja", preco: 139.99, imagem: "./assets/img/bermuda-esportiva-biker-laranja.jpg" },
        { nome: "Top Esportivo Nadador Preto", preco: 119.99, imagem: "./assets/img/top-esportivo-nadador-preto.jpg" },
      ],
    },
  ];

  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string>("todos");

  const [carrinho, setCarrinho] = useState<ItemCarrinho[]>(() => {
    const carrinhoSalvo = localStorage.getItem("carrinho");
    return carrinhoSalvo ? JSON.parse(carrinhoSalvo) : [];
  });

  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
  }, [carrinho]);

  function alterarCategoria(categoriaId: string) {
    setCategoriaSelecionada(categoriaId);
  }

  const categoriasFiltradas =
    categoriaSelecionada === "todos"
      ? categorias
      : categorias.filter(cat => cat.id === categoriaSelecionada);

  function adicionarAoCarrinho(produto: ProdutoProps) {
    setCarrinho(prevCarrinho => {
      const itemExistente = prevCarrinho.find(item => item.nome === produto.nome);

      if (itemExistente) {
        return prevCarrinho.map(item =>
          item.nome === produto.nome ? { ...item, quantidade: item.quantidade + 1 } : item
        );
      } else {
        return [...prevCarrinho, { ...produto, quantidade: 1 }];
      }
    });
  }

  function removerDoCarrinho(nomeProduto: string) {
    setCarrinho(prevCarrinho => prevCarrinho.filter(item => item.nome !== nomeProduto));
  }

  const totalCarrinho = carrinho.reduce(
    (total, item) => total + item.preco * item.quantidade,
    0
  );

  return (
    <>
      <header>
        <h1>Loja Lau Styllus</h1>
        <nav>
          <ul>
            <li><a href="#produtos">Produtos</a></li>
            <li><a href="#sobre">Sobre Nós</a></li>
            <li><a href="#contato">Contato</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <section id="produtos">
          <h2>Produtos mais vendidos</h2>

          <div className="filtros">
            <button
              type="button"
              className={`filtro-btn ${categoriaSelecionada === "todos" ? "ativo" : ""}`}
              onClick={() => alterarCategoria("todos")}
            >
              Todos
            </button>
            {categorias.map(cat => (
              <button
                key={cat.id}
                type="button"
                className={`filtro-btn ${categoriaSelecionada === cat.id ? "ativo" : ""}`}
                onClick={() => alterarCategoria(cat.id)}
              >
                {cat.titulo}
              </button>
            ))}
          </div>

          {categoriasFiltradas.map(categoria => (
            <Categoria
              key={categoria.id}
              id={categoria.id}
              titulo={categoria.titulo}
              produtos={categoria.produtos}
              aoAdicionar={adicionarAoCarrinho}
            />
          ))}
        </section>

        <section id="carrinho">
          <h2>Carrinho de Compras</h2>
          <div id="carrinho-itens">
            {carrinho.length === 0 && <p>Carrinho vazio.</p>}
            {carrinho.map(item => (
              <div key={item.nome} className="item-carrinho">
                <span>{item.nome} (x{item.quantidade})</span>
                <span>R$ {(item.preco * item.quantidade).toFixed(2)}</span>
                <button className="remover" onClick={() => removerDoCarrinho(item.nome)}>Remover</button>
              </div>
            ))}
          </div>
          <p>Total: R$ <span id="total">{totalCarrinho.toFixed(2)}</span></p>
          <button id="finalizar" onClick={() => alert("Compra finalizada!")}>Finalizar Compra</button>
        </section>

        <section id="sobre">
          <h2>Sobre Nós</h2>
          <p>
            Somos uma loja referência no mercado da moda por oferecer as melhores
            roupas com tecidos de qualidade e para todos os estilos.
          </p>
        </section>

        <section id="contato">
          <h2>Contato</h2>
          <p>Email: contato@lojalaustyllus.com.br</p>
          <p>Telefone: (11) 94893-8928</p>
        </section>
      </main>

      <footer>
        &copy; 2025 Loja de Roupas Lau Styllus
      </footer>
    </>
  );
};

export default Main;
