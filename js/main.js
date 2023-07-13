const botaoCriaNovoJogo = document.getElementById('cria-novo-jogo');
const botaoSalvarJogo = document.getElementById('salvar-jogo');
const meusJogosLista = document.querySelector('.meus-jogos__lista');
const numero = document.getElementsByClassName('numero');
let novoJogo;
let novoJogoOrdenado;
const jogosSalvos = [];

botaoCriaNovoJogo.addEventListener('click', criaNovoJogo);
botaoSalvarJogo.addEventListener('click', salvarJogo);

function criaNovoJogo() {
  novoJogo = [];
  sorteiaNumeros();
  ordenaJogo();
  mostraJogoNaTela();
}

function sorteiaNumeros() {
  for(let i = 0; i < 6; i++) {
        let numeroAleatorio = Math.floor(Math.random()*60 + 1);
    
        if(novoJogo.indexOf(numeroAleatorio) == -1) {
          novoJogo.push(numeroAleatorio);
          novoJogo.id = jogosSalvos.length;
        } else {
          i--;
        }
      }
}

function ordenaJogo() {
  novoJogoOrdenado = novoJogo.sort(function(a,b) {
    if(a > b) return 1;
    if(a < b) return -1;
    return 0;
  });
}

function mostraJogoNaTela() {
  for(let i = 0; i < 6; i++) {
    numero[i].innerHTML = novoJogoOrdenado[i];
  }
}

function salvarJogo()  {
  if(!jogosSalvos.includes(novoJogoOrdenado)) {
    jogosSalvos.push(novoJogoOrdenado);
    const novoJogoString = novoJogoOrdenado.toString();
    const jogoArrumado = novoJogoString.replaceAll(',',' - ');
    console.log(jogoArrumado);
    
    const novoItem = document.createElement('li');
    const meusNumerosItem = document.createElement('p');
    meusNumerosItem.classList.add('meus-jogos__numeros');
    meusNumerosItem.innerHTML = jogoArrumado;
    
    novoItem.appendChild(meusNumerosItem);
    novoItem.appendChild(botaoDeleta(novoJogo.id));
    meusJogosLista.appendChild(novoItem);
  } 
}

function botaoDeleta(id) {
  const elementoBotao = document.createElement("button");
  elementoBotao.innerText = "X";

  elementoBotao.addEventListener("click", function() {
    deletaElemento(this.parentNode, id);
  })

  return elementoBotao;
}

function deletaElemento(tag, id) {
  tag.remove();

  jogosSalvos.splice(jogosSalvos.findIndex(elemento.id === id), 1);
}
