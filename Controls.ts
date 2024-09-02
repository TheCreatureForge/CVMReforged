///<reference path="./characterSelect.ts" />
///<reference path="./projectiles.ts" />
///<reference path="./creature.ts" />


//basics attacks
function characterAttack(player: Sprite, char: String, energyBar: StatusBarSprite) {
    let projectile = sprites.createProjectileFromSprite(assets.image`NullImage`, player, 0, 0);

        if (energyBar.value >= sprites.readDataNumber(player, "characterAEnergy") && sprites.readDataBoolean(player, "isStunned") == false) {

            energyBar.value -= sprites.readDataNumber(player, "characterAEnergy")
            switch (char) {
                case "Creature":
                    creature.creatureA(projectile, player);
                    break;
                case "Minion":
                    minion.minionA(projectile, player);
                    break;
                case "Codey":
                    codey.codeyA(projectile, player)
                    break;
                default:
                    projectile.destroy();
            }   
        }
}

//Back specials
function characterBackB(char: String, player: Sprite, energyBar: StatusBarSprite ) {
    if (stateOfGame == "Fight") {
        if (energyBar.value >= sprites.readDataNumber(player, "characterBackBEnergyCost") && sprites.readDataBoolean(player, "isStunned") == false) { 
            removeEnergy(player, sprites.readDataNumber(player, "characterBackBEnergyCost"));
            switch (char) {
                case "Creature":
                    creature.creatureBBack(player);
                    break;
                case "Minion":
                    minion.minionBackB(player);
                    break;
                case "Codey":
                    codey.codeyBackB(player);
                    break;
                default:
                    break;
            }   
        }
         
            
    }
}

//Down Specials
function characterDownB(char: String, player: Sprite, energyBar: StatusBarSprite ) {
    if (stateOfGame == "Fight") {
        if (energyBar.value >= sprites.readDataNumber(player, "characterDownBEnergyCost") && sprites.readDataBoolean(player, "isStunned") == false) { 
            removeEnergy(player, sprites.readDataNumber(player, "characterDownBEnergyCost"));
            switch (char) {
                case "Creature":
                    creature.creatureDownB(player);
                    break;
                case "Minion":
                    minion.minionDownB(player);
                    break;
                case "Codey":
                    codey.codeyDownB(player)
                    break;
            }   
        }
         
            
    }
}

//Neutral Specials
function characterB(char: String, player: Sprite, energyBar: StatusBarSprite) {
    if (stateOfGame == "Fight") {
        if (energyBar.value >= sprites.readDataNumber(player, "characterBEnergyCost") && sprites.readDataBoolean(player, "isStunned") == false) { 
            removeEnergy(player, sprites.readDataNumber(player, "characterBEnergyCost"));
            switch (char) {
                case "Creature":
                    creature.creatureB(player);
                    break;
                case "Minion":
                    minion.minionB(player);
                    break;
                case "Codey":
                    codey.codeyB(player);
                    break;
            }   
        }
         
            
    }
}

//Forwards Specials
function characterForwardB(char: String, player: Sprite, energyBar: StatusBarSprite) {
    if (stateOfGame == "Fight") {
        if (energyBar.value >= sprites.readDataNumber(player, "characterForwardBEnergyCost") && sprites.readDataBoolean(player, "isStunned") == false) { 
            removeEnergy(player, sprites.readDataNumber(player, "characterForwardBEnergyCost"));
            switch (char) {
                case "Creature":
                    creature.creatureForwardB(player);
                    break;
                case "Minion":
                    minion.minionFowardB(player);
                    break;
                case "Codey":
                    codey.codeyB(player);
                    break;
            }   
        }
         
            
    }
}




//DO NOT TOUCH BELOW IF MAKING NEW CHARACTER
//DO NOT TOUCH BELOW IF MAKING NEW CHARACTER
//DO NOT TOUCH BELOW IF MAKING NEW CHARACTER
//DO NOT TOUCH BELOW IF MAKING NEW CHARACTER


//Cursor Controls

controller.player1.onButtonEvent(ControllerButton.Right, ControllerButtonEvent.Pressed, function () {
    player1Cursor.x += 16;
})

controller.player1.onButtonEvent(ControllerButton.Left, ControllerButtonEvent.Pressed, function () {
    player1Cursor.x -= 16;
})

controller.player1.onButtonEvent(ControllerButton.Down, ControllerButtonEvent.Pressed, function () {
    player1Cursor.y += 16;
})



controller.player2.onButtonEvent(ControllerButton.Right, ControllerButtonEvent.Pressed, function () {
    player2Cursor.x += 16;
})

controller.player2.onButtonEvent(ControllerButton.Left, ControllerButtonEvent.Pressed, function () {
    player2Cursor.x -= 16;
})

controller.player2.onButtonEvent(ControllerButton.Down, ControllerButtonEvent.Pressed, function () {
    player2Cursor.y += 16;
})




/////////////////////////////////////////////////////////////////////////////////////////////

//selection and jump controls

controller.player1.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
    if (stateOfGame == "Select") {
        music.play(music.melodyPlayable(music.beamUp), music.PlaybackMode.InBackground)
        scene.cameraShake(2, 500)
        sprites.setDataBoolean(player1Cursor, "player1Ready", true);
        charSelect.startGame();
        sprites.destroy(player1Cursor, effects.coolRadial, 500); 
        
    } else if (stateOfGame == "Fight") {
        characterAttack(player1, player1Character, player1EnergyBar);
            
    }
        
    
   
})


controller.player1.onButtonEvent(ControllerButton.B, ControllerButtonEvent.Pressed, function () {
    
    if (controller.player1.isPressed(ControllerButton.Left) && isPlayerFacing(player1, "Right")) {
        characterBackB(player1Character, player1, player1EnergyBar);
    } else if (controller.player1.isPressed(ControllerButton.Right) && isPlayerFacing(player1, "Left")) {
        characterBackB(player1Character, player1, player1EnergyBar);
    } else if (controller.player1.isPressed(ControllerButton.Left) && isPlayerFacing(player1, "Left")) {
        characterForwardB(player1Character, player1, player1EnergyBar);
    } else if (controller.player1.isPressed(ControllerButton.Right) && isPlayerFacing(player1, "Right")) {
        characterForwardB(player1Character, player1, player1EnergyBar);
    }else if (controller.player1.isPressed(ControllerButton.Down)) {
        characterDownB(player1Character, player1, player1EnergyBar);
    } else if(controller.player1.isPressed(ControllerButton.B) && !controller.player1.isPressed(ControllerButton.Down)) {
        characterB(player1Character, player1, player1EnergyBar)
    }
   

        
})


controller.player2.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
    
    if (stateOfGame == "Select") {
        sprites.setDataBoolean(player2Cursor, "player2Ready", true);
        music.play(music.melodyPlayable(music.beamUp), music.PlaybackMode.InBackground)
        scene.cameraShake(2, 500)
        charSelect.startGame()
        sprites.destroy(player2Cursor, effects.coolRadial, 500);
        
    } else if (stateOfGame == "Fight") {
        characterAttack(player2, player2Character, player2EnergyBar);   
        
    }
})


controller.player2.onButtonEvent(ControllerButton.B, ControllerButtonEvent.Pressed, function () {
    if (controller.player2.isPressed(ControllerButton.Left) && isPlayerFacing(player2, "Right")) {
        characterBackB(player2Character, player2, player2EnergyBar);      
    } else if (controller.player2.isPressed(ControllerButton.Right) && isPlayerFacing(player2, "Left")) {
        characterBackB(player2Character, player2, player2EnergyBar);
    }else if (controller.player2.isPressed(ControllerButton.Left) && isPlayerFacing(player2, "Left")) {
        characterForwardB(player2Character, player2, player2EnergyBar);
    } else if (controller.player2.isPressed(ControllerButton.Right) && isPlayerFacing(player2, "Right")) {
        characterForwardB(player2Character, player2, player2EnergyBar);
    }else if (controller.player2.isPressed(ControllerButton.Down)) {
        characterDownB(player2Character, player2, player2EnergyBar);
    } else if(controller.player2.isPressed(ControllerButton.B) && !controller.player2.isPressed(ControllerButton.Down)) {
        characterB(player2Character, player2, player2EnergyBar)
    }
    
})


//JUMP CODE BELOW FOR BOTH PLAYERS
/////////////////////////////////////////////////////////////////////////////////////////////////
let player1JumpTimeCounter: number;
let player1JumpTime: number;
let player1AmountOfJumps: number;

let player2JumpTimeCounter: number;
let player2JumpTime: number;
let player2AmountOfJumps: number;


controller.player1.onButtonEvent(ControllerButton.Up, ControllerButtonEvent.Pressed, function () {
    if (stateOfGame == "Fight") {
        player1JumpTimeCounter = player1JumpTime;
    } else {
        player1Cursor.y -= 16;
    }
    
})

controller.player1.onButtonEvent(ControllerButton.Up, ControllerButtonEvent.Released, function () {
    player1AmountOfJumps += 1;
    if (player1JumpTimeCounter > 0) {
        player1.vy = player1.vy / 2;
    }      
})

controller.player2.onButtonEvent(ControllerButton.Up, ControllerButtonEvent.Pressed, function () {
    if (stateOfGame == "Fight") {
        player2JumpTimeCounter = player2JumpTime;
    } else {
        player2Cursor.y -= 16;
    }
})    


controller.player2.onButtonEvent(ControllerButton.Up, ControllerButtonEvent.Released, function () {
    player2AmountOfJumps += 1;
    if (player2JumpTimeCounter > 0) {
        player2.vy = player2.vy / 2;
    }      
})



forever(function () {
    if (stateOfGame == "Fight") {
        
        if (sprites.readDataBoolean(player1, "isStunned") == false) {
            if (controller.up.isPressed() && player1JumpTimeCounter > 0 && player1AmountOfJumps < sprites.readDataNumber(player1, "jumpCount")) {
    
                player1.vy = sprites.readDataNumber(player1, "characterJumpSpeed");
                player1JumpTimeCounter -= Delta.RAW();
                
            }
        
            if (player1.isHittingTile(CollisionDirection.Bottom)) {
                player1JumpTime = .1;
                player1AmountOfJumps = 0;
            }
        }
        
        if (sprites.readDataBoolean(player2, "isStunned") == false) {
            
            if (controller.player2.up.isPressed() && player2JumpTimeCounter > 0 && player2AmountOfJumps < sprites.readDataNumber(player2, "jumpCount")) {
                player2.vy = sprites.readDataNumber(player2, "characterJumpSpeed");
                player2JumpTimeCounter -= Delta.RAW();
                
            }
        
            if (player2.isHittingTile(CollisionDirection.Bottom)) {
                player2JumpTime = .1;
                player2AmountOfJumps = 0;
            }
        }
    }
    

})