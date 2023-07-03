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
    const divDeletaItem = document.createElement('div');
    divDeletaItem.classList.add('deleta-jogo');
    novoItem.appendChild(divDeletaItem);
    const meusNumerosItem = document.createElement('p');
    meusNumerosItem.classList.add('meus-jogos__numeros');
    meusNumerosItem.innerHTML = jogoArrumado;
    novoItem.appendChild(meusNumerosItem);
    meusJogosLista.appendChild(novoItem);
  } 
}


        



// 
// const botaoDeletaJogo = document.querySelectorAll('.deleta-jogo');
// 

// botaoDeletaJogo.addEventListener('click', deletaJogo);



// function gerarNumeros() {
//   
  

//   
//   
// }

// function salvarJogo() {
//   
//   criaElemento();
  
// }

// function deletaJogo() {
//   jogosSalvos.splice(jogosSalvos.indexOf(0), 1);
//   criaElemento();
// }

