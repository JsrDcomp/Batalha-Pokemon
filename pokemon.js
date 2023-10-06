const battleState = {  //essa lista está substituindo as variaveis outUser, opHP e playerMove juntando todos como elementos de uma lista é possível fazer alterações neles para atualizar esses valores durante a batalha não vi necessidade de cópias já que a mutabilidade é aceitavel nesse caso (eu acho) 
  outUser : 100,
  opHP : 100,
  playerMove:0
}

const checkDisadvantage = () => { //modifiquei provisoriamente as funções que checam vantagens e desvantagens para adaptar ao paradigma funcional espero também poder reutiliza-las em outros pokemon
  return true 
}
const checkVantage = () => {
  return true
}
/*campo de Batalha, POkemons , os quais estão em batalha  */



const applyAdvantage = () => { 
  return battleState.outOp == checkVantage? 2 : 1
}
const applyDisadvantage = () => {
  return battleState.outUser == checkDisadvantage? 0.5 :1
}
/*Mecanica de tipo de vantagem e desvatagem de pokemon*/

/* movimentos do usuário */

/* ~ Troquei as funções dos ataques do jogador para constantes e assim reutilizar o código na função atack */
const waterCannon = () => attackUser(1*applyAdvantage())
const  waterPulse = () => attackUser(2*applyAdvantage())
const surf = () => attackUser(3*applyAdvantage())
const tackle = () => attackUser(4)

const flameThrower = () => attackOp(1*applyDisadvantage())
const dragonClaw = () => attackOp(2*applyDisadvantage())
const ember = () => attackOp(3*applyDisadvantage())
const growl = () => attackOp(4)


// função que faz o ataque do usario com o dano passado como argumento
const attackUser = (damage) => {
  if(battleState.playerMove == 0 && battleState.outUser != 0) {
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
          battleState.opHP = battleState.opHP - damage // o arrai aqui cria um registro e aplica a função do map duas vezes devido ao length, se o ataque for um critico 
      }});
      }
      else{
        battleState.opHP = battleState.opHP - damage; // sem critico
      }
      if(battleState.opHP < 0){ battleState.opHP = 0} //faint
        document.getElementById('apHP').innerHTML = battleState.opHP; // atualiza o hp
      if(battleState.opHP == 0){
        document.getElementById('message').innerHTML = " Charizard fainted! " // atualiza a mensagem
      } 
      else { 
        battleState.playerMove = 1;
      }
    }
    //espera();
    battleState.playerMove = 1; // atualiza o movimento do jogador
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
          battleState.outUser = battleState.outUser - damage // o arrai aqui cria um registro e aplica a função do map duas vezes devido ao length, se o ataque for um critico 
      }});
      }
      else{
        battleState.outUser = battleState.outUser - damage
      }
  if(battleState.outUser < 0) { battleState.outUser = 0} // desmaio
  document.getElementById('myHP').innerHTML = battleState.outUser; // atualiza o hp
    if(battleState.outUser == 0) { // desmaiado
      document.getElementById('message').innerHTML = " Blastoise fainted! " // desmaiado
    }
      else {
      battleState.playerMove = 0
    }
  }
}

// função que seleciona os ataques do inimigo de forma aleatória
const opAttack = () => { // continue
  if(battleState.playerMove == 1 && battleState.opHP != 0) { 
  const move = Math.floor((Math.random() * 4) + 1); // escolhe um numero inteiro entre 1 e 4, e dependendo do numero, irá fazer um ataque aleatório
    if(move == 1){
      flameThrower()
    }else if(move==2){
      dragonClaw()
    }else if(move==3){
      ember()
    }else{
      growl()
    } 
    battleState.playerMove = 0; // atualiza a vez de quem joga
  }
}

let isItem = false 
/* fiz uma função items que ao ser chamada, usa o método document.querySelector é usado para selecionar o primeiro elemento no HTML que no caso,
'.actions'. */
const items = () => {
  isItem = !isItem // inverte o modo (ataque ou itens)
  const actions = document.querySelector('.actions') //  botões de ação
  if (isItem) { 
    actions.innerHTML = 
      `<button onclick="useSmokeBomb()">Smoke Bomb</button>
      <button onclick="useHealthPotion()">Health Potion</button>`
  } else { 
    actions.innerHTML = 
      `<button onclick="waterCannon()">Water Cannon</button>
      <button onclick="waterPulse()">Water Pulse</button>
      <button onclick="surf()">Surf</button>
      <button onclick="tackle()">Tackle</button>`
  }
}

let potionUse = false 

// função que verifica se o poção de cura foi usada, se não tiver recupera a vida e 'marca' a poção como usada
const useHealthPotion = () => {
  if (!potionUse) { // verifique se a poção de vida não foi usada
    battleState.outUser = battleState.outUser + 10 
    potionUse = true 
    document.getElementById('message').innerHTML = "You used health potion!";
  }else{
    document.getElementById('message').innerHTML = "You already have used potion!";
  }
}

// função useSmokeBomb (não está pronta ainda)
const useSmokeBomb = () => {}
