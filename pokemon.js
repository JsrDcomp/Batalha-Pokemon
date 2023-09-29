var userHP = 100;
var opHP = 100;
opAttacks = [flameThrower, dragonClaw, ember, growl];
playerMove = 0;
/* movimentos do usuário */

/* ~ Troquei as funções dos ataques do jogador para constantes e assim reutilizar o código na função atack */
const waterCannon = () => atack(1)
const  waterPulse = () => atack(2)
const surf = () => atack(3)
const tackle = () => atack(4)


const atack = (damage) => {
  if(playerMove == 0 && userHP != 0) {
    var miss = Math.floor((Math.random() * 10) + 1); // chance de erro
    if(miss == 1) {
      document.getElementById('message').innerHTML = " Blastoise's attack missed! ";
    }
    else {
      document.getElementById('message').innerHTML = " Blastoise used water cannon "; // ataque
      var critical = Math.floor((Math.random() * 10) + 1); // chanche de critico
      if(critical == 4){
        for(var x = 0; x < 2; x++){
          opHP = opHP - damage; // dano critico
        }
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

function flameThrower() {
  var miss = Math.floor((Math.random() * 10) + 1); // chance de erro
  if(miss == 1 ) {
  document.getElementById('message').innerHTML = " Charizard's attack missed! " // errou o ataque
  }
  else {
  document.getElementById('message').innerHTML = " Charizard used flame thrower " // ataque
    var critical = Math.floor((Math.random() * 10) + 1); // critico
      if(critical == 4){
        for(var x = 0; x < 2; x++){ // dano critico
          userHP = userHP - 30;
        }
      }
      else{
        userHP = userHP - 30; // sem critico
      }
  if(userHP < 0) { userHP = 0} // desmaio
  document.getElementById('myHP').innerHTML = userHP; // atualiza o hp
    if(userHP == 0) { // desmaiado
      document.getElementById('message').innerHTML = " Blastoise fainted! " // desmaiado
    }
  }
}

function dragonClaw() {
  var miss = Math.floor((Math.random() * 10) + 1);
  if(miss == 1 ) {
    document.getElementById('message').innerHTML = " Charizard's attack missed! "
  }
  else {
  document.getElementById('message').innerHTML = " Charizard used dragon claw "
  var critical = Math.floor((Math.random() * 10) + 1);
    if(critical == 4){
      for(var x = 0; x < 2; x++){
        userHP = userHP - 20;
      }
    }
    else{
      userHP = userHP - 20;
    }
  if(userHP < 0) { userHP = 0}
  document.getElementById('myHP').innerHTML = userHP;
    if(userHP == 0){
      document.getElementById('message').innerHTML = " Blastoise fainted! "
    }
  }
}

function ember() {
  var miss = Math.floor((Math.random() * 10) + 1);
  if(miss == 1 ) {
    document.getElementById('message').innerHTML = " Charizard's attack missed! "
  }
  else {
  document.getElementById('message').innerHTML = " Charizard used ember "
  var critical = Math.floor((Math.random() * 10) + 1);
    if(critical == 4){
      for(var x = 0; x < 2; x++){
        userHP = userHP - 10;
      }
    }
    else{
      userHP = userHP - 10;
    }
  if(userHP < 0) { userHP = 0}
  document.getElementById('myHP').innerHTML = userHP;
    if(userHP == 0){
      document.getElementById('message').innerHTML = " Blastoise fainted! "
    }
  }
}

function growl() {
  var miss = Math.floor((Math.random() * 10) + 1);
  if(miss == 1 ) {
    document.getElementById('message').innerHTML = " Charizard's attack missed! "
  }
  else {
  document.getElementById('message').innerHTML = " Charizard used growl "
  var critical = Math.floor((Math.random() * 10) + 1);
    if(critical == 4){
      for(var x = 0; x < 2; x++){
        userHP = userHP - 5;
      }
    }
    else{
      userHP = userHP - 5;
    }
  if(userHP < 0) { userHP = 0}
  document.getElementById('myHP').innerHTML = userHP;
    if(userHP == 0){
      document.getElementById('message').innerHTML = " Blastoise fainted! "
    }
  }
}



function compPokemon() { // continue
  if(playerMove == 1 && opHP != 0) { // whos move
  var move = Math.floor((Math.random() * 4) + 1); // choose move randomly
    opAttacks[move](); // call attack from array
    playerMove = 0; // update player move
  }
}
