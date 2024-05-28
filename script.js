// JavaScript para o carrossel de imagens
let currentIndex = 0;
const slides = document.querySelectorAll('.carousel img');
const maxIndex = slides.length - 1;

let startX = 0;
let startY = 0;

// Função para mostrar a próxima imagem no carrossel
function showNextSlide() {
  // Oculta todas as imagens
  slides.forEach(slide => slide.style.display = 'none');
  
  // Exibe apenas a próxima imagem
  slides[currentIndex].style.display = 'block';

  // Atualiza o índice para a próxima imagem
  currentIndex = (currentIndex + 1) % (maxIndex + 1);
}

// Intervalo para avançar automaticamente para a próxima imagem a cada 3 segundos
setInterval(showNextSlide, 3000);

// Chama a função showNextSlide para exibir a primeira imagem quando a página carregar
showNextSlide();

// Adiciona evento de toque para arrastar o carrossel com o dedo
document.addEventListener('touchstart', touchStart);
document.addEventListener('touchmove', touchMove);

function touchStart(event) {
  startX = event.touches[0].clientX;
  startY = event.touches[0].clientY;
}

function touchMove(event) {
  if (event.touches.length > 1) return; // Ignora se houver mais de um toque
  const deltaX = event.touches[0].clientX - startX;
  const deltaY = event.touches[0].clientY - startY;
  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    // Movimento horizontal
    if (deltaX > 0) {
      // Desliza para a direita
      currentIndex = (currentIndex === 0) ? maxIndex : currentIndex - 1;
    } else {
      // Desliza para a esquerda
      currentIndex = (currentIndex === maxIndex) ? 0 : currentIndex + 1;
    }
    showNextSlide();
  }
}

// Lógica do carrinho de compras
let pedido = [];

function adicionarAoPedido(descricao, preco) {
  pedido.push({ descricao, preco }); // Armazena o preço como número, sem multiplicar
  atualizarPedido();
}

function atualizarPedido() {
  const pedidoLista = document.getElementById('pedido-lista');
  const totalElement = document.getElementById('total');
  const totalMenu = document.getElementById('total-menu');
  pedidoLista.innerHTML = '';
  let total = 0;
  pedido.forEach((item, index) => {
    const itemElement = document.createElement('div');
    itemElement.classList.add('pedido-item');
    itemElement.innerHTML = `
      <p>${item.descricao}</p>
      <p>R$${item.preco.toFixed(2)}</p>`; // Mantém o preço com duas casas decimais
    pedidoLista.appendChild(itemElement);
    total += item.preco; // Soma os preços diretamente
  });
  totalElement.textContent = `Total: R$${total.toFixed(2)}`; // Exibe o total com duas casas decimais
  totalMenu.textContent = `Total: R$${total.toFixed(2)}`; // Atualiza o valor total no menu
}

function removerDoPedido(index) {
  pedido.splice(index, 1);
  atualizarPedido();
}

function finalizarPedido() {
  // Aqui você pode adicionar a lógica para finalizar o pedido, como enviar para um sistema de pagamento
  alert('Pedido finalizado com sucesso!');
  pedido = [];
  atualizarPedido();
}

// Chama a função `atualizarPedido()` para exibir a lista de pedidos e o total ao carregar a página
atualizarPedido();

// JavaScript para controlar a exibição do menu em telas móveis
const menuIcon = document.getElementById('menu-icon');
const navMenu = document.querySelector('.navbar ul');

menuIcon.addEventListener('click', () => {
  // Alterna a classe 'show' para exibir/ocultar o menu
  navMenu.classList.toggle('show');
});

document.getElementById('voltar-ao-topo').addEventListener('click', function() {
  window.scrollTo({
      top: 0,
      behavior: 'smooth' // Rolar suavemente
  });
});
