//Separei dois pokemons para efetuar as trocas
const blastoise = {
  name: "Blastoise",
  type: "water",
  hp: 100,
}

const venasaur = { // mudei o pokemon para que haja desvantagem para o jogador também
  name: "Venasaur",
  type: "grass",
  hp: 100,
}

//Blastoide esta no attackker pois ele é o comando inicial 
const battleState = {  //essa lista está substituindo as variaveis outUser, opHP e playerMove juntando todos como elementos de uma lista é possível fazer alterações neles para atualizar esses valores durante a batalha não vi necessidade de cópias já que a mutabilidade é aceitavel nesse caso (eu acho) 
  attackker: venasaur,
  opHP: 230,
  type: "fire",
  playerMove: 0
}

//vantagem e desvatagem 
//aqui são passados o tipo dos dois pokemons para que sejam atribuidos os multiplicadores
const applyAdvantage = (typeAtk,typePKN) => {
  if (typeAtk == "water" && typePKN == "fire" || typeAtk == "fire" && typePKN == "grass") {
    return 2;
  } else if (typeAtk == "fire" && typePKN == "water" || typeAtk == "grass" && typePKN == "fire") {
    return 0.5;
  } else {
    return 1;
  }
}
/* movimentos do usuário */

/* ~ Troquei as funções dos ataques do jogador para constantes e assim reutilizar o código na função atack */
/// novos ataques foram adicionados para o novo pokemon adicionado 
/*movimentos agora recebem applyAdvantage junto das informações de tipo da lista de cada pokemon para multiplicar o ataque de acordo 
com o resultado da função */

const waterCannon = () => attackUser(30 * applyAdvantage(battleState.attackker.type, battleState.type), "Water Cannon", "Blastoise") //passei os nomes dos ataques como parametro para aparecer no HTML o nome
const waterPulse = () => attackUser(25 * applyAdvantage(battleState.attackker.type, battleState.type), "Water Pulse", "Blastoise")
const surf = () => attackUser(20 * applyAdvantage(battleState.attackker.type,battleState.type), "Surf", "Blastoise")
const tackle = () => attackUser(10, "Tackle", "Blastoise")

const petalDance = () => attackUser(30 * applyAdvantage(battleState.attackker.type, battleState.type), "Petal Dance", "Venasaur") //passei os nomes dos ataques como parametro para aparecer no HTML o nome
const razorLeaf = () => attackUser(25 * applyAdvantage(battleState.attackker.type, battleState.type), " Razor Leaf", "Venasaur")
const sludge  = () => attackUser(20, "Sludge-poison", "Venasaur")
const tack = () => attackUser(10,"Tackle", "Venasaur")

const flameThrower = () => attackOp(40 * applyAdvantage(battleState.type, battleState.attackker.type), "Flame Thrower")
const dragonClaw = () => attackOp(30, "Dragon Claw")
const ember = () => attackOp(25 * applyAdvantage(battleState.type, battleState.attackker.type), "Ember")
const growl = () => attackOp(20,"Growl")


// função que faz o ataque do usario com o dano passado como argumento
const attackUser = (damage, atackker, name) => {
  //Função de ataque foram atualizadas para receber as instâncias do usuario  
  if (battleState.playerMove == 0 && battleState.outUser != 0) {
    const miss = Math.floor((Math.random() * 10) + 1); // chance de erro
    if (miss == 1) {
      document.getElementById('message').innerHTML = ` ${name}'s attack missed!`;
    }
    else {
      document.getElementById('message').innerHTML = `${name} used ${atackker}` // ataque
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
        window.alert("You win")
        location.reload()
        //Alteração do código para que assim que charizard desmaiar o usuario ganhe o jogo e reinicie o jogo
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
          battleState.attackker.hp = battleState.attackker.hp - damage // o arrai aqui cria um registro e aplica a função do map duas vezes devido ao length, se o ataque for um critico 
        }
      });
    }

    else {
      battleState.attackker.hp = battleState.attackker.hp - damage
    }
    if (battleState.attackker.hp < 0) { battleState.attackker.hp = 0 } // desmaio
    document.getElementById('myHP').innerHTML = battleState.attackker.hp; // atualiza o h
    if (battleState.attackker.hp == 0) { // desmaiado
      window.alert(`${battleState.attackker.name} fainted`)
      switcH() //troquei a outra função switch pois fazia a "mesma" coisa que essa
    }
    if (blastoise.hp == 0 && venasaur.hp == 0) {
      window.alert("YOU LOST")
      location.reload()
    }
    else {
      battleState.playerMove = 0
    }
  }
}

//Alteracões foram realizadas na const attackop para realizar troca dos pokemon do usuario assim que algum deles estiver desmaido

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

// Fiz um registro para valores boleanos que vão ser utilizados no resto do código
const boolean = {
  isItem: false,
  potionUse: false,
  smokeUse: false,
  isSwitch: false,
  switchUse: false,
  blastoiseUse: false
}

/* Fiz uma função items que ao ser chamada, usa o método document.querySelector é usado para selecionar o primeiro elemento no HTML que no caso,
'.actions'. */
const item = () => {
  boolean.isItem = !boolean.isItem // inverte o modo (ataque ou itens)
  const actions = document.querySelector('.actions') //  botões de ação
  if (boolean.isItem) {
    actions.innerHTML = // Coloquei o title para explicar o que cada item faz
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
    battleState.attackker.hp = battleState.attackker.hp +30
    boolean.potionUse = true
    document.getElementById('message').innerHTML = "You used health potion!"
    document.getElementById('myHP').innerHTML = battleState.attackker.hp
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

//Atualizei para Possibilitar as trocas de pokemons 
// o pokemon inicial agora é um que faz o jogador iniciar com uma desvantagem
const switcH = () => { //precisei mudar o switch para que o novo pokemon funcione aqui, também fiz uma mudança nas linhas 231 e 244 e no html para atualizar o nome do pokemon na hora da troca
  boolean.blastoiseUse = !boolean.blastoiseUse
  const actions = document.querySelector('.actions');
  const pokemonuser = document.querySelector('.pokemonuser')
  const pokemonuser2 = document.querySelector('.pokemonuser2')
  if (boolean.blastoiseUse && blastoise.hp !==0) {//coloquei a condição de que só seja possivel trocar de pokemon caso o pokemon tenha mais que 0 de vida
    actions.innerHTML =
      `<button onclick="waterCannon()">Water Cannon</button>
      <button onclick="waterPulse()">Water Pulse</button>
      <button onclick="surf()">Surf</button>
      <button onclick="tackle()">Tackle</button>`;
    document.getElementById('message').innerHTML = "You switched to Blastoise"
    pokemonuser.style.display = 'none'
    pokemonuser2.style.display = 'block'
    battleState.attackker = blastoise
    document.getElementById('myHP').innerHTML = battleState.attackker.hp
    document.getElementById('namepokemon').innerHTML = battleState.attackker.name
  }
  else if(blastoise.hp !==0) {//coloquei a condição de que só seja possivel trocar de pokemon caso o pokemon tenha mais que 0 de vida
    actions.innerHTML =
      ` <button onclick="petalDance()">Petal Dance</button>
      <button onclick="razorLeaf()">Razor Leaf</button>
      <button onclick="sludge()">Sludge</button>
      <button onclick="tack()">Tackle</button>`;
    document.getElementById('message').innerHTML = "You switched to Venasaur"
    pokemonuser.style.display = 'block'
    pokemonuser2.style.display = 'none'
    battleState.attackker = venasaur
    document.getElementById('myHP').innerHTML = battleState.attackker.hp
    document.getElementById('namepokemon').innerHTML = battleState.attackker.name
  }
}
