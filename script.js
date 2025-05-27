document.addEventListener("DOMContentLoaded", () => {
  const botoesFiltro = document.querySelectorAll(".filtro-btn");
  const categorias = document.querySelectorAll(".categoria");
  const botoesAdicionar = document.querySelectorAll(".produto button");
  const carrinhoItens = document.getElementById("carrinho-itens");
  const totalEl = document.getElementById("total");
  const finalizarBtn = document.getElementById("finalizar");

  let total = 0;

  //Categorias com botão ativo
  botoesFiltro.forEach(botao => {
    console.log(botoesFiltro);
    botao.addEventListener("click", () => {
      console.log("cliqueiAqui");
      botoesFiltro.forEach(btn => btn.classList.remove("ativo"));
      botao.classList.add("ativo");

      const categoriaSelecionada = botao.dataset.categoria;

      categorias.forEach(categoria => {
        categoria.style.display = 
          categoriaSelecionada === "todos" || categoria.classList.contains(categoriaSelecionada)
          ? "block"
          : "none";
      });
    });
  });

  // Adicionar o produto no carrinho com botão "Remover"
  botoesAdicionar.forEach(botao => {
    botao.addEventListener("click", () => {
      const produto = botao.parentElement;
      const nome = produto.querySelector("h3").textContent;
      const precoTexto = produto.querySelector("p").textContent;
      const preco = parseFloat(precoTexto.replace("R$", "").replace(",", "."));

      // Criar elemento de item no carrinho
      const item = document.createElement("div");
      item.classList.add("item-carrinho");
      item.innerHTML = `
        <span>${nome} - R$ ${preco.toFixed(2).replace(".", ",")}</span>
        <button class="remover">Remover</button>
      `;
      carrinhoItens.appendChild(item);

      total += preco;
      atualizarTotal();

      // Remover item
      item.querySelector(".remover").addEventListener("click", () => {
        item.remove();
        total -= preco;
        atualizarTotal();
      });
    });
  });

  // Atualiza o valor total no carrinho
  function atualizarTotal() {
    totalEl.textContent = total.toFixed(2).replace(".", ",");
  }

  // Finalizar compra
  finalizarBtn.addEventListener("click", () => {
    if (total === 0) {
      alert("Seu carrinho está vazio!");
      return;
    }

    alert("Compra finalizada com sucesso!");
    carrinhoItens.innerHTML = "";
    total = 0;
    atualizarTotal();
  });
});
