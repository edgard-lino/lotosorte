const botaoCriaNovoJogo = document.getElementById('cria-novo-jogo');
const botaoSalvarJogo = document.getElementById('salvar-jogo');
const numero = document.getElementsByClassName('numero');
const meusJogosLista = document.querySelector('.meus-jogos__lista');

let jogoAtual;
let jogoAtualOrdenado;

botaoCriaNovoJogo.addEventListener('click', criaNovoJogo);
botaoSalvarJogo.addEventListener('click', salvarJogo);

const listaJogos = JSON.parse(localStorage.getItem("listaJogos")) || [];

exibeJogosSalvos();

function criaNovoJogo() {
  sorteiaJogo();
  ordenaJogo();
  exibeJogoAtual();
}

function sorteiaJogo() {
  jogoAtual = [];
  for(let i = 0; i < 6; i++) {
    const numeroAleatorio = Math.floor(Math.random()*60 + 1);

    if(jogoAtual.indexOf(numeroAleatorio) == -1) {
      jogoAtual.push(numeroAleatorio);
    } else {
      i--;
    }
  }
}

function ordenaJogo() {
  jogoAtualOrdenado = jogoAtual.sort(function(a,b) {
        if(a > b) return 1;
        if(a < b) return -1;
        return 0;
      });
}

function exibeJogoAtual() {
  for(let i = 0; i < 6; i++) {
        numero[i].innerHTML = jogoAtualOrdenado[i];
      }
}

function salvarJogo() {
  const existe = listaJogos.find(elemento => elemento.jogo === jogoAtualOrdenado)
  
  const itemAtual = {
    "jogo": jogoAtualOrdenado,
  }

  if (!existe) {
    itemAtual.id = listaJogos[listaJogos.length -1] ? (listaJogos[listaJogos.length-1]).id + 1 : 0;
    listaJogos.push(itemAtual);
  }

  localStorage.setItem("listaJogos", JSON.stringify(listaJogos));
  exibeJogosSalvos();
}

function exibeJogosSalvos() {
  meusJogosLista.innerHTML = "";
  listaJogos.forEach(elemento => {
    const jogoString = elemento.jogo.toString().replaceAll(',', ' - ');

    criaElemento(jogoString, elemento.id);
  });
}

function criaElemento (jogoString, id) {
  const elementoNovo = document.createElement('li');
  const elementoNumero = document.createElement('p');
  elementoNumero.classList.add('meus-jogos__numeros');
  elementoNumero.innerHTML = jogoString;
    
  elementoNovo.appendChild(elementoNumero);
  elementoNovo.appendChild(botaoDeleta(id));
  elementoNovo.id = id;

  meusJogosLista.appendChild(elementoNovo);
}

function botaoDeleta(id) {
  const elementoBotao = document.createElement("button");
  elementoBotao.innerText = "X";
  elementoBotao.id = id;

  elementoBotao.addEventListener("click", function() {
    deletaElemento(this.parentNode, id);
  })

  return elementoBotao;
}

function deletaElemento(tag, id) {
  tag.remove();

  listaJogos.splice(listaJogos[id], 1);

  exibeJogosSalvos();
  localStorage.setItem("listaJogos", JSON.stringify(listaJogos));
}
