var altura = 0;
var largura = 0;
var vidas = 1;
var tempo = 15;
var ursoIndex = 0;
var criaUrsoTempo = 1500;
var pontos = 0;

const imagens = ['/IMG/urso.png', '/IMG/urso2.png', '/IMG/urso3.png'];

function TamanhoTela() {
  altura = window.innerHeight;
  largura = window.innerWidth;
}

function iniciarJogo() {
  TamanhoTela();
  document.getElementById('cronometro').innerHTML = tempo;
  document.getElementById('placar').innerHTML = pontos;

  const nivel = localStorage.getItem('nivelJogo');
  if (nivel === 'normal') {
    criaUrsoTempo = 1500;
  } else if (nivel === 'dificil') {
    criaUrsoTempo = 1000;
  } else if (nivel === 'chucknorris') {
    criaUrsoTempo = 750;
  }

  cicloDosUrsos();

  setInterval(function () {
    tempo -= 1;
    if (tempo < 0) {
      window.location.href = 'win.html';
    } else {
      document.getElementById('cronometro').innerHTML = tempo;
    }
  }, 1000);
}

function cicloDosUrsos() {
  const ursoAnterior = document.getElementById('urso');
  if (ursoAnterior) {
    ursoAnterior.remove();
    if (vidas > 3) {
      window.location.href = 'gameover.html';
      return;
    } else {
      document.getElementById('v' + vidas).src = '/IMG/coracao_vazio.png';
      vidas++;
    }
  }

  const posicaoX = Math.max(Math.floor(Math.random() * largura) - 90, 0);
  const posicaoY = Math.max(Math.floor(Math.random() * altura) - 90, 0);

  const urso = document.createElement('img');
  urso.src = imagens[ursoIndex];
  urso.className = tamanhoAleatorio() + ' ' + ladoAleatorio();
  urso.style.left = posicaoX + 'px';
  urso.style.top = posicaoY + 'px';
  urso.style.position = 'absolute';
  urso.id = 'urso';

  document.body.appendChild(urso);

  urso.onclick = function () {
    this.remove();

    // Adiciona pontos conforme o urso clicado
    if (this.src.includes('urso.png')) {
      pontos += 10;
    } else if (this.src.includes('urso2.png')) {
      pontos += 50;
    } else if (this.src.includes('urso3.png')) {
      pontos += 100;
    }

    document.getElementById('placar').innerHTML = pontos;
  };

  ursoIndex = (ursoIndex + 1) % imagens.length;

  setTimeout(cicloDosUrsos, criaUrsoTempo);
}

function tamanhoAleatorio() {
  const classe = Math.floor(Math.random() * 3);
  return ['urso1', 'urso2', 'urso3'][classe];
}

function ladoAleatorio() {
  return Math.random() < 0.5 ? 'ladoA' : 'ladoB';
}



// Código para vida extra (coração)

const coracaoImagem = '/IMG/coracao_cheio.png';

function cicloDosCoracoes() {
const posicaoX = Math.max(Math.floor(Math.random() * largura) - 50, 0);
const posicaoY = Math.max(Math.floor(Math.random() * altura) - 50, 0);

const coracao = document.createElement('img');
coracao.src = coracaoImagem;
coracao.className = 'coracaoBonus';
coracao.style.left = posicaoX + 'px';
coracao.style.top = posicaoY + 'px';
coracao.style.position = 'absolute';
coracao.id = 'coracao_' + new Date().getTime();

document.body.appendChild(coracao);

coracao.onclick = function () {
  this.remove();
  if (vidas > 1) {
    vidas--;
    document.getElementById('v' + vidas).src = '/IMG/coracao_cheio.png';
  }
};

setTimeout(() => {
  if (document.body.contains(coracao)) {
    coracao.remove();
  }
}, 3000);
}

function agendarCoracao() {
const intervaloAleatorio = Math.floor(Math.random() * 4000) + 3000;

  setTimeout(() => {
    cicloDosCoracoes();
    agendarCoracao();
  }, intervaloAleatorio);
}


const moedaImagem = '/IMG/moeda.png';
let moedas = 0;

function cicloDasMoedas() {
const posicaoX = Math.max(Math.floor(Math.random() * largura) - 30, 0);
const posicaoY = Math.max(Math.floor(Math.random() * altura) - 30, 0);

const moeda = document.createElement('img');
moeda.src = moedaImagem;
moeda.className = 'moedaBonus';
moeda.style.left = posicaoX + 'px';
moeda.style.top = posicaoY + 'px';
moeda.style.position = 'absolute';
moeda.id = 'moeda_' + new Date().getTime();

document.body.appendChild(moeda);

moeda.onclick = function () {
  this.remove();
  moedas++;
  document.getElementById('moedas').innerHTML = moedas;
  localStorage.setItem('moedasJogo', moedas); // salva para loja
};

setTimeout(() => {
  if (document.body.contains(moeda)) {
    moeda.remove();
  }
}, 4000);
}

function agendarMoeda() {
  const intervaloAleatorio = Math.floor(Math.random() * 4000) + 3000;
  setTimeout(() => {
    cicloDasMoedas();
    agendarMoeda();
  }, intervaloAleatorio);
}

agendarMoeda();

agendarCoracao();

window.onload = iniciarJogo;
