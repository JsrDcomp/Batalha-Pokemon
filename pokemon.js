var  outUser= 100;
var opHP = 100;
var outUser = outUser
var outOp =opHP
/*campo de Batalha, POkemons , os quais estão em batalha  */
let playerMove = 0;


const advantage = outOp == opHP ? 2 : 1
const disadvantage = outUser == outUser ? 0.5 :1
/*Mecanica de tipo de vantagem e desvatagem de pokemon*/
/* movimentos do usuário */

/* ~ Troquei as funções dos ataques do jogador para constantes e assim reutilizar o código na função atack */
const waterCannon = () => attackUser(1*advantage)
const  waterPulse = () => attackUser(2*advantage)
const surf = () => attackUser(3*advantage)
const tackle = () => attackUser(4)

const flameThrower = () => attackOp(1*disadvantage)
const dragonClaw = () => attackOp(2*disadvantage)
const ember = () => attackOp(3*disadvantage)
const growl = () => attackOp(4)


// função que faz o ataque do usario com o dano passado como argumento
const attackUser = (damage) => {
  if(playerMove == 0 && outUser != 0) {
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
          outOp = outOp - damage // o arrai aqui cria um registro e aplica a função do map duas vezes devido ao length, se o ataque for um critico 
      }});
      }
      else{
        outOp = outOp - damage; // sem critico
      }
      if(outOp < 0){ outOp = 0} //faint
        document.getElementById('apHP').innerHTML = outOp; // atualiza o hp
      if(outOp == 0){
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
          outUser = outUser - damage // o arrai aqui cria um registro e aplica a função do map duas vezes devido ao length, se o ataque for um critico 
      }});
      }
      else{
        outUser = outUser - damage
      }
  if(outUser < 0) { outUser = 0} // desmaio
  document.getElementById('myHP').innerHTML = outUser; // atualiza o hp
    if(outUser == 0) { // desmaiado
      document.getElementById('message').innerHTML = " Blastoise fainted! " // desmaiado
    }
  }
}

// função que seleciona os ataques do inimigo de forma aleatória
const opAttack = () => { // continue
  if(playerMove == 1 && outOp != 0) { 
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