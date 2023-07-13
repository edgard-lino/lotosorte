const botaoCriaNovoJogo = document.getElementById('cria-novo-jogo');
const botaoSalvarJogo = document.getElementById('salvar-jogo');
const numero = document.getElementsByClassName('numero');

let jogoAtual;
let jogoAtualOrdenado;

botaoCriaNovoJogo.addEventListener('click', criaNovoJogo);
botaoSalvarJogo.addEventListener('click', salvarJogo);

// const listaJogos = JSON.parse(localStorage.getItem("listaJogos")) || [];

const listaJogos = [];

console.log(listaJogos);

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

function salvarJogo() {
  const itemAtual = {
    "jogo": [],
    "id": ""
  }
  itemAtual.jogo = jogoAtualOrdenado;
  itemAtual.id = listaJogos.length;

  listaJogos.forEach(elemento => {
    if(elemento.jogo === itemAtual.jogo) {
      console.log("é igual");
    }
  });

  // if(!listaJogos.jogo.includes(itemAtual.jogo)) {
  //   console.log("funciona");
  //   // const itemLista = {
  //   //   "jogo": [],
  //   //   "id": ""
  //   // };
  //   // itemLista.jogo = jogoAtualOrdenado;
  //   // itemLista.id = listaJogos.length;
  //   // listaJogos.push(itemLista);

  //   // localStorage.setItem("listaJogos", JSON.stringify(listaJogos))
  // }
}

function exibeJogoAtual() {
  for(let i = 0; i < 6; i++) {
        numero[i].innerHTML = jogoAtualOrdenado[i];
      }
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
