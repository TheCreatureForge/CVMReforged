///<reference path="./characterSelect.ts" />
///<reference path="./projectiles.ts" />
///<reference path="./creature.ts" />

let player1JumpTimeCounter: number;
let player1JumpTime: number;
let player1AmountOfJumps: number;

let player2JumpTimeCounter: number;
let player2JumpTime: number;
let player2AmountOfJumps: number;



//////////////////////////////////////////////////////////////////////////////////////////////

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
    
        let projectile = sprites.createProjectileFromSprite(assets.image`NullImage`, player1, 0, 0);

        if (player1EnergyBar.value >= sprites.readDataNumber(player1, "characterAEnergy")) {

            player1EnergyBar.value -= sprites.readDataNumber(player1, "characterAEnergy")
            switch (player1Character) {
                case "Creature":
                    creature.creatureA(projectile, player1);
                    break;
                case "Minion":
                    minionA(projectile, player1);
                    break;
                default:
                    projectile.destroy();
            }   
        }
            
    }
        
    
   
})

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

   //Locks in player2 character when they press shoot on a tile
controller.player2.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
    
    if (stateOfGame == "Select") {
        sprites.setDataBoolean(player2Cursor, "player2Ready", true);
        music.play(music.melodyPlayable(music.beamUp), music.PlaybackMode.InBackground)
        scene.cameraShake(2, 500)
        charSelect.startGame()
        sprites.destroy(player2Cursor, effects.coolRadial, 500);
          
    } else if (stateOfGame == "Fight") {
        let projectile = sprites.createProjectileFromSprite(assets.image`NullImage`, player2, 0, 0);

        if (player2EnergyBar.value >= sprites.readDataNumber(player2, "characterAEnergy")) {

            player2EnergyBar.value -= sprites.readDataNumber(player2, "characterAEnergy")
            switch (player2Character) {
                case "Creature":
                    creature.creatureA(projectile, player2);
                    break;
                case "Minion":
                    minionA(projectile, player2);
                    break;
                default:
                    projectile.destroy();
            }   
        }

        
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

    if (controller.up.isPressed() && player1JumpTimeCounter > 0 && player1AmountOfJumps < sprites.readDataNumber(player1, "jumpCount")) {
        player1.vy = sprites.readDataNumber(player1, "characterJumpSpeed");
        player1JumpTimeCounter -= Delta.RAW();
        
    }

    if (player1.isHittingTile(CollisionDirection.Bottom)) {
        player1JumpTime = .1;
        player1AmountOfJumps = 0;
    }
    
    if (controller.player2.up.isPressed() && player2JumpTimeCounter > 0 && player2AmountOfJumps < sprites.readDataNumber(player2, "jumpCount")) {
        
        player2.vy = sprites.readDataNumber(player2, "characterJumpSpeed");
        player2JumpTimeCounter -= Delta.RAW();
        
    }

    if (player2.isHittingTile(CollisionDirection.Bottom)) {
        player2JumpTime = .1;
        player2AmountOfJumps = 0;
    }

})