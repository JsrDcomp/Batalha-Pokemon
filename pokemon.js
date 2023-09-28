var userHP = 100;
var opHP = 100;
opAttacks = [flameThrower, dragonClaw, ember, growl];
playerMove = 0;
/* users moves */

/* ~ Troquei as funções dos ataques do jogador para constantes e assim reutilizar o código na função atack */
const waterCannon = () => atack(1)
const  waterPulse = () => atack(2)
const surf = () => atack(3)
const tackle = () => atack(4)


const atack = (damage) => {
  if(playerMove == 0 && userHP != 0) {
    var miss = Math.floor((Math.random() * 10) + 1); // miss rate
    if(miss == 1) {
      document.getElementById('message').innerHTML = " Blastoise's attack missed! ";
    }
    else {
      document.getElementById('message').innerHTML = " Blastoise used water cannon "; // attack
      var critical = Math.floor((Math.random() * 10) + 1); // critical
      if(critical == 4){
        for(var x = 0; x < 2; x++){
          opHP = opHP - damage; // yes critical
        }
      }
      else{
        opHP = opHP - damage; // no critical
      }
      if(opHP < 0){ opHP = 0} //faint
        document.getElementById('apHP').innerHTML = opHP; // update hp
      if(opHP == 0){
        document.getElementById('message').innerHTML = " Charizard fainted! " // update message
      }
    }
    //wait();
    playerMove = 1; // update player move
}
}

/* opponent's moves */

function flameThrower() {
  var miss = Math.floor((Math.random() * 10) + 1); // miss rate
  if(miss == 1 ) {
  document.getElementById('message').innerHTML = " Charizard's attack missed! " // attack missed
  }
  else {
  document.getElementById('message').innerHTML = " Charizard used flame thrower " // attack
    var critical = Math.floor((Math.random() * 10) + 1); // critical
      if(critical == 4){
        for(var x = 0; x < 2; x++){ // yes critical
          userHP = userHP - 30;
        }
      }
      else{
        userHP = userHP - 30; // no critical
      }
  if(userHP < 0) { userHP = 0} // faint
  document.getElementById('myHP').innerHTML = userHP; // update hp
    if(userHP == 0) { // fainted
      document.getElementById('message').innerHTML = " Blastoise fainted! " // fainted
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
