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
    itemAtual.id = listaJogos.length;
    listaJogos.push(itemAtual);
  }

  localStorage.setItem("listaJogos", JSON.stringify(listaJogos));
  exibeJogosSalvos();
}

function exibeJogosSalvos() {
  meusJogosLista.innerHTML = "";
  listaJogos.forEach(elemento => {
    const jogoString = elemento.jogo.toString().replaceAll(',', ' - ');

    console.log(jogoString);
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



// AQUI DEU CERTO A PRIMEIRA VERSAO ABAIXO

// const botaoCriaNovoJogo = document.getElementById('cria-novo-jogo');
// const botaoSalvarJogo = document.getElementById('salvar-jogo');
// const meusJogosLista = document.querySelector('.meus-jogos__lista');
// const numero = document.getElementsByClassName('numero');
// let novoJogo;
// let novoJogoOrdenado;
// const jogosSalvos = [];

// botaoCriaNovoJogo.addEventListener('click', criaNovoJogo);
// botaoSalvarJogo.addEventListener('click', salvarJogo);

// function criaNovoJogo() {
//   novoJogo = [];
//   sorteiaNumeros();
//   ordenaJogo();
//   mostraJogoNaTela();
// }

// function sorteiaNumeros() {
//   for(let i = 0; i < 6; i++) {
//         const numeroAleatorio = Math.floor(Math.random()*60 + 1);
    
//         if(novoJogo.indexOf(numeroAleatorio) == -1) {
//           novoJogo.push(numeroAleatorio);
//         } else {
//           i--;
//         }
//       }
// }

// function ordenaJogo() {
//   novoJogoOrdenado = novoJogo.sort(function(a,b) {
//     if(a > b) return 1;
//     if(a < b) return -1;
//     return 0;
//   });
// }

// function mostraJogoNaTela() {
//   for(let i = 0; i < 6; i++) {
//     numero[i].innerHTML = novoJogoOrdenado[i];
//   }
// }

// function salvarJogo()  {
//   if(!jogosSalvos.includes(novoJogoOrdenado)) {
//     novoJogoOrdenado.id = jogosSalvos.length;
//     jogosSalvos.push(novoJogoOrdenado);
    
//     localStorage.setItem("jogosSalvos", JSON.stringify(jogosSalvos));
    
//     const novoJogoString = novoJogoOrdenado.toString();
//     const jogoArrumado = novoJogoString.replaceAll(',',' - ');
    
//     const novoItem = document.createElement('li');
//     const meusNumerosItem = document.createElement('p');
//     meusNumerosItem.classList.add('meus-jogos__numeros');
//     meusNumerosItem.innerHTML = jogoArrumado;
    
//     novoItem.appendChild(meusNumerosItem);
//     novoItem.appendChild(botaoDeleta(novoJogoOrdenado.id));
//     meusJogosLista.appendChild(novoItem);
//   } 
// }

// function botaoDeleta(id) {
//   const elementoBotao = document.createElement("button");
//   elementoBotao.innerText = "X";

//   elementoBotao.addEventListener("click", function() {
//     deletaElemento(this.parentNode, id);
//   })

//   return elementoBotao;
// }

// function deletaElemento(tag, id) {
//   tag.remove();

//   jogosSalvos.splice(jogosSalvos.findIndex(elemento => elemento.id === id), 1);
// }
