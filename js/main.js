const botaoCriaNovoJogo = document.getElementById('cria-novo-jogo');
const botaoSalvarJogo = document.getElementById('salvar-jogo');
const numero = document.getElementsByClassName('numero');
const meusJogosLista = document.querySelector('.meus-jogos__lista');
const geradorNumeros = document.querySelector('.gerador__numeros');
const select = document.getElementById('select');

let quantidadeNumeros;
        
let jogoAtual;
let jogoAtualOrdenado;

botaoCriaNovoJogo.addEventListener('click', criaNovoJogo);
botaoSalvarJogo.addEventListener('click', salvarJogo);

const listaJogos = JSON.parse(localStorage.getItem("listaJogos")) || [];

exibeJogosSalvos();

function criaNovoJogo() {
  botaoSalvarJogo.classList.add("vermelho");
  quantidadeNumeros = select.options[select.selectedIndex].value;
  sorteiaJogo();
  ordenaJogo();
  exibeJogoAtual();
}

function sorteiaJogo() {
  jogoAtual = [];
  for(let i = 0; i < quantidadeNumeros; i++) {
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
  const geradorNumerosLista = document.createElement('ul');
  for(let i = 0; i < quantidadeNumeros; i++) {
    const geradorNumerosItem = document.createElement('li');

    const numeroAleatorioCor = Math.floor(Math.random()*46 + 1);

    geradorNumerosItem.classList.add(`numero__${numeroAleatorioCor}`);
    geradorNumerosItem.classList.add('numero');
    geradorNumerosItem.innerHTML = jogoAtualOrdenado[i];
    geradorNumerosLista.appendChild(geradorNumerosItem);
  }
  geradorNumeros.innerHTML = "";
  geradorNumeros.appendChild(geradorNumerosLista);
}

function salvarJogo() {
  const existe = listaJogos.find(elemento => elemento.jogo === jogoAtualOrdenado)
  
  const itemAtual = {
    "jogo": jogoAtualOrdenado,
  }

  if (!existe) {
    botaoSalvarJogo.classList.remove("vermelho");
    
    itemAtual.id = listaJogos[listaJogos.length -1] ? (listaJogos[listaJogos.length-1]).id + 1 : 0;
    listaJogos.push(itemAtual);
  }

  localStorage.setItem("listaJogos", JSON.stringify(listaJogos));
  exibeJogosSalvos();
}

function exibeJogosSalvos() {
  meusJogosLista.innerHTML = "";
  listaJogos.forEach(function(elemento) {
    const elementoJogo = elemento.jogo;
    const elementoTexto = elementoJogo.toString().replaceAll(",", " - ");
    criaElemento(elementoTexto, elemento.id);
  });
}

function criaElemento (jogoString, id) {
  const elementoNovo = document.createElement('li');
  const elementoNumero = document.createElement('p');
  elementoNumero.classList.add('meus-jogos__numeros');
  elementoNumero.innerHTML = jogoString;
    
  elementoNovo.appendChild(elementoNumero);
  elementoNovo.appendChild(botaoDeleta(id));
  
  meusJogosLista.appendChild(elementoNovo);
}

function botaoDeleta(id) {
  const elementoBotao = document.createElement("button");
  elementoBotao.innerText = "X";

  elementoBotao.id = id;

  elementoBotao.addEventListener("click", function() {
    deletaElemento(this.parentNode, this.id);
  })

  return elementoBotao;
}

function deletaElemento(tag, id) {
  tag.remove();
 
  listaJogos.forEach(elemento => {
    if(elemento.id == id) {
      listaJogos.splice(listaJogos.indexOf(elemento), 1);
      
    }
  })

  localStorage.setItem("listaJogos", JSON.stringify(listaJogos)); 
}
