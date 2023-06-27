const botaoGerarNumeros = document.getElementById('gerar-numeros');
const botaoSalvarJogo = document.getElementById('salvar-jogo');
const numero = document.getElementsByClassName('numero');
const botaoDeletaJogo = document.querySelector('.deleta-jogo');
const meusJogosLista = document.querySelector('.meus-jogos__numeros');

botaoGerarNumeros.addEventListener('click', gerarNumeros);
botaoSalvarJogo.addEventListener('click', salvarJogo);
botaoDeletaJogo.addEventListener('click', deletaJogo);

let novoJogo;
let novoJogoOrdenado;


function gerarNumeros() {
  novoJogo = [];
  

  for(let i = 0; i < 6; i++) {
    let numeroAleatorio = Math.floor(Math.random()*60 + 1);

    if(novoJogo.indexOf(numeroAleatorio) == -1) {
      novoJogo.push(numeroAleatorio);
    } else {
      i--;
    }
  }
  novoJogoOrdenado = novoJogo.sort(function(a,b) {
    if(a > b) return 1;
    if(a < b) return -1;
    return 0;
  });
  console.log(novoJogoOrdenado);

  for(let i = 0; i < 6; i++) {
    numero[i].innerHTML = novoJogoOrdenado[i];
  }
}

function salvarJogo() {
  meusJogosLista.innerHTML = "";
      for(let i = 0; i < 6; i++) {
      meusJogosLista.innerHTML += `${novoJogoOrdenado[i]} `;
    }

}

function deletaJogo() {
  window.alert("Botão funcionando!");
}
