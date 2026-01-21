const produtos = [
  {
    id: 1,
    nome: "Teclado Mecânico RGB",
    preco: 120.0,
    imagem: "./assets/teclado-removebg-preview.png",
  },
  {
    id: 2,
    nome: "Headset Gamer",
    preco: 250.5,
    imagem: "./assets/heaset-removebg-preview.png",
  },
  {
    id: 3,
    nome: "Monitor 24pol",
    preco: 900.0,
    imagem: "./assets/monitor-removebg-preview.png",
  },
  {
    id: 4,
    nome: "Mousepad Gigante",
    preco: 45.0,
    imagem: "./assets/mousepad-removebg-preview.png",
  },
  {
    id: 5,
    nome: "Mouse sem fio",
    preco: 85.0,
    imagem: "./assets/mouse-removebg-preview.png",
  },
  {
    id: 6,
    nome: "Webcam Full HD",
    preco: 180.0,
    imagem: "./assets/webcam-removebg-preview.png",
  },
];

const vitrine = document.querySelector(".vitrine");

const memoria = localStorage.getItem('carrinho')

let carrinho = memoria ? JSON.parse(memoria) : [];

function adicionarAoCarrinho(produto) {
  const esseItemJaExiste = () => {
    return carrinho.find((item) => {
      return item.id === produto.id;
    });
  };

  const itemEncontrado = esseItemJaExiste();

  if (!itemEncontrado) {
    carrinho.push({
      ...produto,
      quantidade: 1,
    });
  } else {
    itemEncontrado.quantidade++;
  }

  renderizarCarrinho()
}

function renderizarCarrinho() {
  const listaCarrinho = document.querySelector(".lista-carrinho");
  listaCarrinho.innerHTML = "";

  carrinho.forEach((produto) => {

    const itemDiv = document.createElement('div')
    itemDiv.classList.add('item-carrinho')

    itemDiv.innerHTML = `
            <img src="${produto.imagem}">

            <div class="item-info">
              <h4>${produto.nome}</h4>
              <p>R$ ${produto.preco.toFixed(2).replace(".", ",")}</p>
            </div>`;

    const controles = document.createElement('div')
    controles.classList.add('item-controles')

    const botaoMenos = document.createElement("button");
    botaoMenos.classList.add("btn-menos");
    botaoMenos.innerText = "-";
    botaoMenos.addEventListener("click", () => {
      produto.quantidade--;

      if (produto.quantidade < 1) {
        carrinho = carrinho.filter((item) => {
        return item.id !== produto.id;
      });
      }

      renderizarCarrinho();
    });


    const quantidadeSpan = document.createElement('span')
    quantidadeSpan.classList.add('quantidade')
    quantidadeSpan.innerText = produto.quantidade

    const botaoMais = document.createElement('button')
    botaoMais.classList.add("btn-mais");
    botaoMais.innerText = "+";
    botaoMais.addEventListener("click", () => {
      produto.quantidade++;

      renderizarCarrinho();
    });

    const botaoRemover = document.createElement('button')
    botaoRemover.classList.add("btn-remover");
    botaoRemover.innerText = "🗑️";
    botaoRemover.addEventListener("click", () => {
    carrinho = carrinho.filter((item) => {
        return item.id !== produto.id;
      });

      renderizarCarrinho();
    });

    controles.appendChild(botaoMenos)
    controles.appendChild(quantidadeSpan)
    controles.appendChild(botaoMais)
    controles.appendChild(botaoRemover)

    itemDiv.appendChild(controles)

    listaCarrinho.appendChild(itemDiv)
  });

  calcularTotal()

  addLocalStorage()
}

function criarcardProduto(produto) {
  const card = document.createElement("div");
  card.classList.add("card-produto");

  card.innerHTML = `<img src="${produto.imagem}" />
          <h3>${produto.nome}</h3>
          <p>R$ ${produto.preco.toFixed(2).replace(".", ",")}</p>`;

  const button = document.createElement("button");
  button.classList.add("btn-add");
  button.innerText = "comprar";

  button.addEventListener("click", () => {
    adicionarAoCarrinho(produto);
  });

  card.appendChild(button);

  return card;
}

function renderizarLoja() {
  produtos.forEach((produto) => {
    const cardPronto = criarcardProduto(produto);

    vitrine.appendChild(cardPronto);
  });
}

function calcularTotal() {
  let result
  const valorTotal = document.querySelector('#valor-total');
  

    result = carrinho.reduce((acumulador, item) => {
      return acumulador + item.preco * item.quantidade
    }, 0)

  valorTotal.innerText = `R$ ${result.toFixed(2).replace('.', ',')}`
}

function addLocalStorage() {
  localStorage.setItem('carrinho', JSON.stringify(carrinho))
}

const finalizarCompra = document.querySelector('.btn-finalizar')

finalizarCompra.addEventListener('click', () => {
  alert('Compra realizada com sucesso! ✅')

  carrinho = []

  localStorage.removeItem('carrinho')

  renderizarCarrinho()
})

renderizarLoja();

renderizarCarrinho();

calcularTotal()