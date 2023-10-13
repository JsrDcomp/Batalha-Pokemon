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
const waterCannon = () => attackUser(1 * applyAdvantage(), "Water Cannon") //passei os nomes dos ataques como parametro para aparecer no HTML o nome
const waterPulse = () => attackUser(2 * applyAdvantage(), "Water Pulse")
const surf = () => attackUser(3 * applyAdvantage(), "Surf")
const tackle = () => attackUser(4, "Tacle")

const flameThrower = () => attackOp(1 * applyDisadvantage(), "Flame Thrower")
const dragonClaw = () => attackOp(2 * applyDisadvantage(), "Dragon Claw")
const ember = () => attackOp(3 * applyDisadvantage(), "Ember")
const growl = () => attackOp(4, "Growl")


// função que faz o ataque do usario com o dano passado como argumento
const attackUser = (damage, atackker) => {
  if (battleState.playerMove == 0 && battleState.outUser != 0) {
    const miss = Math.floor((Math.random() * 10) + 1); // chance de erro
    if (miss == 1) {
      document.getElementById('message').innerHTML = " Blastoise's attack missed! ";
    }
    else {
      document.getElementById('message').innerHTML = `Blastoise used ${atackker}`; // ataque
      const critical = Math.floor((Math.random() * 10) + 1); // chanche de critico
      if (critical == 4) {
        // Estou criando esse Array aplicando um map que subtrai do hp inimigo o dano para substuir o loop for para garantir o parádigma funcional do código
        Array.from({ length: 2 }).map(() => {
          {
            battleState.opHP = battleState.opHP - damage // o arrai aqui cria um registro e aplica a função do map duas vezes devido ao length, se o ataque for um critico 
          }
        });
      }
      else {
        battleState.opHP = battleState.opHP - damage; // sem critico
      }
      if (battleState.opHP < 0) { battleState.opHP = 0 } //faint
      document.getElementById('apHP').innerHTML = battleState.opHP; // atualiza o hp
      if (battleState.opHP == 0) {
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
const attackOp = (damage, atackker) => {
  const miss = Math.floor((Math.random() * 10) + 1); // chance de erro
  if (miss == 1) {
    document.getElementById('message').innerHTML = " Charizard's attack missed! " // errou o ataque
  }
  else {
    document.getElementById('message').innerHTML = `Charizard used ${atackker}` // ataque
    const critical = Math.floor((Math.random() * 10) + 1); // critico
    if (critical == 4) {
      // Estou criando esse Array aplicando um map que subtrai do hp usário o dano para substuir o loop for para garantir o parádigma funcional do código
      Array.from({ length: 2 }).map(() => {
        {
          battleState.outUser = battleState.outUser - damage // o arrai aqui cria um registro e aplica a função do map duas vezes devido ao length, se o ataque for um critico 
        }
      });
    }
    else {
      battleState.outUser = battleState.outUser - damage
    }
    if (battleState.outUser < 0) { battleState.outUser = 0 } // desmaio
    document.getElementById('myHP').innerHTML = battleState.outUser; // atualiza o hp
    if (battleState.outUser == 0) { // desmaiado
      document.getElementById('message').innerHTML = " Blastoise fainted! " // desmaiado
    }
    else {
      battleState.playerMove = 0
    }
  }
}

// função que seleciona os ataques do inimigo de forma aleatória
const opAttack = () => { // continue
  if (battleState.playerMove == 1 && battleState.opHP != 0) {
    const move = Math.floor((Math.random() * 4) + 1); // escolhe um numero inteiro entre 1 e 4, e dependendo do numero, irá fazer um ataque aleatório
    if (move == 1) {
      flameThrower()
    } else if (move == 2) {
      dragonClaw()
    } else if (move == 3) {
      ember()
    } else {
      growl()
    }
    battleState.playerMove = 0; // atualiza a vez de quem joga
  }
}

// fiz um registro para valores boleanos que vão ser utilizados no resto do código
const boolean = {
  isItem: false,
  potionUse: false,
  smokeUse: false,
  isSwitch : false,
  switchUse : false,
  pikachuUse : false
}

/* fiz uma função items que ao ser chamada, usa o método document.querySelector é usado para selecionar o primeiro elemento no HTML que no caso,
'.actions'. */
const item = () => {
  boolean.isItem = !boolean.isItem // inverte o modo (ataque ou itens)
  const actions = document.querySelector('.actions') //  botões de ação
  if (boolean.isItem) {
    actions.innerHTML = // coloquei o title para explicar o que cada item faz
      `<button onclick="useSmokeBomb()" title="Smoke bomb skip the opponent turn. use after an attack">Smoke Bomb</button> 
      <button onclick="useHealthPotion()"title="Health potion heals when opponent plays. Use when its your turn">Health Potion</button>`
  } else {
    actions.innerHTML =
      `<button onclick="waterCannon()">Water Cannon</button>
      <button onclick="waterPulse()">Water Pulse</button>
      <button onclick="surf()">Surf</button>
      <button onclick="tackle()">Tackle</button>`
  }
}


// função que verifica se o poção de cura foi usada, se não tiver recupera a vida e 'marca' a poção como usada
const useHealthPotion = () => {
  if (!boolean.potionUse) { // verifique se a poção de vida não foi usada
    battleState.outUser = battleState.outUser + 10
    boolean.potionUse = true
    document.getElementById('message').innerHTML = "You used health potion!";
    battleState.playerMove = 1
  } else {
    document.getElementById('message').innerHTML = "You already used potion!";
  }
}

// função useSmokeBomb funciona de maneira parecida com a useHealthPotion, porém pulando a jogada do adversário e deixando o jogador efetuar um segundo ataque.
const useSmokeBomb = () => {
  if (!boolean.smokeUse) { //verfica se foi usado
    battleState.playerMove = 0
    boolean.smokeUse = true
    document.getElementById('message').innerHTML = "You used smoke bomb!";
  } else {
    document.getElementById('message').innerHTML = "You already used smoke bomb!"
  }
}


// fiz uma tela inicial que ao clicar em play, a função play faz o jogo aparecer com o mesmo principio da função items
const play = () => {
  document.querySelector('.startscreen').style.display = 'none'

  document.querySelector('.game').style.display = 'block'
  document.querySelector('.box').style.display = 'block'
}

const switcH = () => {
  boolean.isSwitch = !boolean.isSwitch 
  const actions = document.querySelector('.actions') 
  if (boolean.isSwitch) {
    actions.innerHTML =
      `<button onclick="charizard()" title="Switch to charizard">Charizard</button>
      <button onclick="pikachu()"title="Switch to pikachu">Pikachu</button>`
  } else {
    actions.innerHTML =
      `<button onclick="waterCannon()">Water Cannon</button>
      <button onclick="waterPulse()">Water Pulse</button>
      <button onclick="surf()">Surf</button>
      <button onclick="tackle()">Tackle</button>`
  }
}

