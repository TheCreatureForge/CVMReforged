///<reference path="./importFiles.ts" />
namespace SpriteKind{
    export const Player1Fighter = SpriteKind.create();
    export const Player2Fighter = SpriteKind.create();
    export const Shield = SpriteKind.create();
    export const Prop = SpriteKind.create();
}
//sets up unique key mappings



Keybinds.setSimulatorKeymap(
    Keybinds.PlayerNumber.ONE, 
    Keybinds.CustomKey.W,
    Keybinds.CustomKey.S,
    Keybinds.CustomKey.A,
    Keybinds.CustomKey.D,
    Keybinds.CustomKey.C,
    Keybinds.CustomKey.V
);

Keybinds.setSimulatorKeymap(
    Keybinds.PlayerNumber.TWO, 
    Keybinds.CustomKey.UP,
    Keybinds.CustomKey.DOWN,
    Keybinds.CustomKey.LEFT,
    Keybinds.CustomKey.RIGHT,
    Keybinds.CustomKey.O,
    Keybinds.CustomKey.P
);




//DO NOT TOUCH BELOW IF MAKING NEW CHARACTER
//DO NOT TOUCH BELOW IF MAKING NEW CHARACTER
//DO NOT TOUCH BELOW IF MAKING NEW CHARACTER
//DO NOT TOUCH BELOW IF MAKING NEW CHARACTER

// Does the overlap on a per-player basis. If wanting to extend to more than two, easily done
overlapHandle.setupOverlapHandlers(SpriteKind.Player1Fighter);
overlapHandle.setupOverlapHandlers(SpriteKind.Player2Fighter);

//as of now state of game can be "Select", "Fight", "Done"
let stateOfGame = "Select"

//Set up the Title Screen 
music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)
scene.setBackgroundColor(13)
scene.setBackgroundImage(assets.image`MenuArt`)

game.setDialogFrame(assets.image`NullImage`)
game.setDialogCursor(assets.image`NullImage`)
game.showLongText("", DialogLayout.Bottom)

//character select screen
scene.setBackgroundImage(assets.image`NullImage`)
info.startCountdown(30);


if (Math.percentChance(70)) {
    playSong("SmashMenu");
} else {
    playSong("Peace");
} 

tiles.setCurrentTilemap(tilemap`CharSelectTM`);

/////////////////////////////////////////////////////////////////////////////////////
//Players are created
/////////////////////////////////////////////////////////////////////////////////////

//Setup and creates player 1
let player1 = sprites.create(assets.image`NullImage`, SpriteKind.Player1Fighter);
sprites.setDataNumber(player1, "playerNum", 1);
player1.setPosition(25, 30);
player1.scale = 2;
//player1.setFlag(SpriteFlag.StayInScreen, true)

let player1Character = "";
let player1Animation: AnimationSetUp;
let player1WinCount:number = 0;

let player1HealthBar: StatusBarSprite;
let player1EnergyBar: StatusBarSprite;

//Setup and creates player 2
let player2 = sprites.create(assets.image`NullImage`, SpriteKind.Player2Fighter);
sprites.setDataNumber(player2, "playerNum", 2);
player2.setPosition(100, 30);
player2.scale = 2;
//player2.setFlag(SpriteFlag.StayInScreen, true);

let player2Character = "";
let player2Animation: AnimationSetUp;
let player2WinCount: number = 0;

let player2HealthBar: StatusBarSprite;
let player2EnergyBar: StatusBarSprite;
/////////////////////////////////////////////////////////////////////////////////////////////




//These are the drop down character titles 
let Title1 = sprites.create(assets.image`NullImage`, SpriteKind.Prop);
sprites.setDataString(Title1, "AnimState", "Away"); //Away: you cant see the title //Down: its shown
Title1.setPosition(8, 8);

let Title2 = sprites.create(assets.image`NullImage`, SpriteKind.Prop);
sprites.setDataString(Title2, "AnimState", "Away"); 
Title2.setPosition(106, 8);


//creates cursor 
let player1Cursor = charSelect.createCursor1();
let player2Cursor = charSelect.createCursor2();



///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//PROJECTILE OVERLAP
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

events.spriteEvent(SpriteKind.Player, SpriteKind.Projectile, events.SpriteEvent.StartOverlapping, function (sprite, otherSprite) {
    
    //if the player is shielded
    if (sprites.readDataBoolean(sprite, "hasShield") == true) {

        //creature shield return energy mechanic
        if (sprites.readDataNumber(sprite, "playerNum") == 1 && player1Character == "Creature") {
            player1EnergyBar.value += 25;
        } else if(sprites.readDataNumber(sprite, "playerNum") == 2 && player1Character == "Creature") {
            player2EnergyBar.value += 25;
        }
        
        //minion Shield collection mechanic
        if (sprites.readDataNumber(sprite, "playerNum") == 1 && player1Character == "Minion") {
            p1MinionCollectProj++;
        } else if (sprites.readDataNumber(sprite, "playerNum") == 2 && player2Character == "Minion") {
            p2MinionCollectProj++;
        }
        
        //destroy projectile and exit method
        sprites.destroy(otherSprite);
        return;
    }
    
    
    //if its not your own projectile hurt player
    if (sprites.readDataNumber(sprite, "playerNum") != sprites.readDataNumber(otherSprite, "ownersPlayerNum")) {

        //Check which player then subtracts from their health
        if (sprites.readDataNumber(sprite, "playerNum") == 1) {
            player1HealthBar.value -= sprites.readDataNumber(otherSprite, "damage");
            
        } else {
            player2HealthBar.value -= sprites.readDataNumber(otherSprite, "damage");
            
        }
        
        //Applys x velocity depending if the player is facing left or right
        if (isPlayerFacing(sprite, "Right")) {
            sprite.vx = sprites.readDataNumber(otherSprite, "applyVx") * -1;
        } else {
            sprite.vx = sprites.readDataNumber(otherSprite, "applyVx");
            
        }

        //Applys y velocity 
        sprite.vy -= sprites.readDataNumber(otherSprite, "applyVy");
        
        // If there is hitStun on this projectile then apply it
        if (sprites.readDataNumber(otherSprite, "applyHitStun") > 0) {
            characterAnimations.setCharacterAnimationsEnabled(sprite, false);

            if (sprites.readDataNumber(sprite, "playerNum") == 1) { 
                if (isPlayerFacing(sprite, "Right")) {
                    sprite.setImage(player1Animation.hitStun);    
                } else {
                    sprite.setImage(player1Animation.hitStunLeft);    
                }
            } else {  
                if (isPlayerFacing(sprite, "Right")) {
                    sprite.setImage(player2Animation.hitStun);    
                } else {
                    sprite.setImage(player2Animation.hitStunLeft);    
                }
            }
            stun(sprite, sprites.readDataNumber(otherSprite, "applyHitStun"), false);
        }
        
        //Dont destroy projectile
        if (sprites.readDataBoolean(otherSprite, "dontDestroyOnHit") !== true) {
            sprites.destroy(otherSprite);
        } else {
            //This is to fix projectiles from not destroying for some reason 
            timer.after(otherSprite.lifespan, function () {
                sprites.destroy(otherSprite);
            })
        }
        
    }
    
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ON GAMES UPDATES
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Switches players direction varable and which walking animation should play
game.onUpdate(function () {
    if (stateOfGame == "Fight") {
        
        if (player1.x < player2.x && sprites.readDataString(player1, "direction") != "Right") {
            sprites.setDataString(player1, "direction", "Right")
            sprites.setDataString(player2, "direction", "Left")
            updateAnimStates(); 
            
        }
        
        if (player1.x > player2.x && sprites.readDataString(player1, "direction") != "Left") {
            sprites.setDataString(player1, "direction", "Left")
            sprites.setDataString(player2, "direction", "Right")
            updateAnimStates(); 
           
        }
    }
})

//Gives players 5 energy every 0.2 secs
game.onUpdateInterval(200, function () {
    if (stateOfGame == "Fight") {
        player1EnergyBar.value += 5
        player2EnergyBar.value += 5
    }
})

