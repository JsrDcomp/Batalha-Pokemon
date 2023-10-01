var userHP = 100;
var opHP = 100;

let playerMove = 0;
/* movimentos do usuário */

/* ~ Troquei as funções dos ataques do jogador para constantes e assim reutilizar o código na função atack */
const waterCannon = () => attackUser(1)
const  waterPulse = () => attackUser(2)
const surf = () => attackUser(3)
const tackle = () => attackUser(4)

const flameThrower = () => attackOp(1)
const dragonClaw = () => attackOp(2)
const ember = () => attackOp(3)
const growl = () => attackOp(4)


// função que faz o ataque do usario com o dano passado como argumento
const attackUser = (damage) => {
  if(playerMove == 0 && userHP != 0) {
    const miss = Math.floor((Math.random() * 10) + 1); // chance de erro
    if(miss == 1) {
      document.getElementById('message').innerHTML = " Blastoise's attack missed! ";
    }
    else {
      document.getElementById('message').innerHTML = " Blastoise used water cannon "; // ataque
      const critical = Math.floor((Math.random() * 10) + 1); // chanche de critico
      if(critical == 4){
        // Estou criando esse Array aplicando um map que subtrai do hp inimigo o dano para substuir o loop for para garantir o parádigma funcional do código
        Array.from({ length:2 }).map(() => {{
          opHP = opHP - damage // o arrai aqui cria um registro e aplica a função do map duas vezes devido ao length, se o ataque for um critico 
      }});
      }
      else{
        opHP = opHP - damage; // sem critico
      }
      if(opHP < 0){ opHP = 0} //faint
        document.getElementById('apHP').innerHTML = opHP; // atualiza o hp
      if(opHP == 0){
        document.getElementById('message').innerHTML = " Charizard fainted! " // atualiza a mensagem
      }
    }
    //espera();
    playerMove = 1; // atualiza o movimento do jogador
}
}

/* movimentos dos oponentes */

// função que faz o ataque do oponente com o dano passado como argumento
const attackOp = (damage) => {
  const miss = Math.floor((Math.random() * 10) + 1); // chance de erro
  if(miss == 1 ) {
  document.getElementById('message').innerHTML = " Charizard's attack missed! " // errou o ataque
  }
  else {
  document.getElementById('message').innerHTML = " Charizard used flame thrower " // ataque
    const critical = Math.floor((Math.random() * 10) + 1); // critico
      if(critical == 4){
        // Estou criando esse Array aplicando um map que subtrai do hp usário o dano para substuir o loop for para garantir o parádigma funcional do código
        Array.from({ length:2 }).map(() => {{
          userHP = userHP - damage // o arrai aqui cria um registro e aplica a função do map duas vezes devido ao length, se o ataque for um critico 
      }});
      }
      else{
        userHP = userHP - damage
      }
  if(userHP < 0) { userHP = 0} // desmaio
  document.getElementById('myHP').innerHTML = userHP; // atualiza o hp
    if(userHP == 0) { // desmaiado
      document.getElementById('message').innerHTML = " Blastoise fainted! " // desmaiado
    }
  }
}

// função que seleciona os ataques do inimigo de forma aleatória
const opAttack = () => { // continue
  if(playerMove == 1 && opHP != 0) { 
  var move = Math.floor((Math.random() * 4) + 1); // escolhe um numero inteiro entre 1 e 4, e dependendo do numero, irá fazer um ataque aleatório
    if(move == 1){
      flameThrower()
    }else if(move==2){
      dragonClaw()
    }else if(move==3){
      ember()
    }else{
      growl()
    } 
    playerMove = 0; // atualiza a vez de quem joga
  }
}