
const imagensPapagaio = [
  "assets/bobrossparrot.gif",
  "assets/explodyparrot.gif",
  "assets/fiestaparrot.gif",
  "assets/metalparrot.gif",
  "assets/revertitparrot.gif",
  "assets/tripletsparrot.gif",
  "assets/unicornparrot.gif"
];

let primeiraCarta = null;
let segundaCarta = null;
let numJogadas = 0;
let paresEncontrados = 0;
let cartas = [];

function perguntarNumCartas() {
  let numCartas = prompt("Com quantas cartas você quer jogar? (Escolha um número par entre 4 e 14)");
  numCartas = parseInt(numCartas);

  // Verifica se o número inserido é válido
  if (isNaN(numCartas) || numCartas < 4 || numCartas > 14 || numCartas % 2 !== 0) {
    return perguntarNumCartas(); // Rechama a função se o valor não for válido
  }

  return numCartas;
}

function iniciarJogo() {
  const numCartas = perguntarNumCartas();;
  const mesaCarta = document.getElementById('mesaCarta');
  cartas = [];
  paresEncontrados = 0;
  numJogadas = 0;

  for (let i = 0; i < numCartas / 2; i++) {
    const imagem = imagensPapagaio[i];
    const cartaHTML = `
    <div class="cartas" data-imagem="${imagem}" onclick="virarCarta(this)">
    <img src="assets/back.png" class="face-atras">
    <img src="${imagem}" class="face-frente">
    </div>
    `;
    cartas.push(cartaHTML);
    cartas.push(cartaHTML); // Duplicando a carta para formar pares
  }

  // Embaralha as cartas
  cartas.sort(() => Math.random() - 0.5);

  // Insere as cartas no tabuleiro
  mesaCarta.innerHTML = cartas.join('');
}

function virarCarta(carta) {
  // Caso clique em uma carta que ja esta virada
  if (carta.classList.contains('virar') || segundaCarta) {
    return;
  }

  carta.classList.add('virar');
  numJogadas++;

  if (!primeiraCarta) {
    primeiraCarta = carta;
  } else {
    segundaCarta = carta;

    if (primeiraCarta.dataset.imagem === segundaCarta.dataset.imagem) {
      // Par correto
      primeiraCarta.classList.add('igualdade');
      segundaCarta.classList.add('igualdade');
      paresEncontrados++;

      resetarCartas();
      // VerificA se foram encontrados todos os pares corretos
      if (paresEncontrados === cartas.length / 2) {
        setTimeout(() => {
          alert(`Você ganhou em ${numJogadas} jogadas!`);
          iniciarJogo();
        }, 500);
      }
    } else {
      // Par incorreto
      setTimeout(() => {
        primeiraCarta.classList.remove('virar');
        segundaCarta.classList.remove('virar');
        resetarCartas();
      }, 1000);
    }
  }
}

function resetarCartas() {
  primeiraCarta = null;
  segundaCarta = null;
}

iniciarJogo();