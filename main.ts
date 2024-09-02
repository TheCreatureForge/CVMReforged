///<reference path="./importFiles.ts" />
namespace SpriteKind{
    export const Player1Fighter = SpriteKind.create();
    export const Player2Fighter = SpriteKind.create();
    export const Shield = SpriteKind.create();
    export const Prop = SpriteKind.create();
    export const ShieldProj = SpriteKind.create();
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



let showHitBoxes: boolean = false;


//////////////////////////////////////////////////////////////////////////////////
//DO NOT TOUCH BELOW
//////////////////////////////////////////////////////////////////////////////////


// Does the overlap on a per-player basis. If wanting to extend to more than two, easily done
overlapHandle.setupOverlapHandlers(SpriteKind.Player1Fighter);
overlapHandle.setupOverlapHandlers(SpriteKind.Player2Fighter);

//as of now state of game can be "Select", "Fight", "Done"
let stateOfGame = "Select"

//Set up the Title Screen 
music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)
scene.setBackgroundColor(13)

if (Math.percentChance(1)) {
    clearEffects();
}

scene.setBackgroundImage(assets.image`MenuArt`)
game.setDialogFrame(assets.image`NullImage`)
game.setDialogCursor(assets.image`NullImage`)
game.showLongText("", DialogLayout.Bottom)
tiles.setCurrentTilemap(tilemap`CharSelectTM`);

//character select screen
scene.setBackgroundImage(assets.image`NullImage`)
info.startCountdown(30);
if (Math.percentChance(70)) {
    playSong("SmashMenu");
} else {
    playSong("Peace");
}




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
let player1WinCount: number = 0;

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


//players overlaps projectiles
events.spriteEvent(SpriteKind.Player, SpriteKind.Projectile, events.SpriteEvent.StartOverlapping, function (sprite, otherSprite) {
    overlapHandle.playerOverlapProj(sprite, otherSprite);
})

events.spriteEvent(SpriteKind.Player, SpriteKind.ShieldProj, events.SpriteEvent.StartOverlapping, function (sprite, otherSprite) {
    overlapHandle.playerOverlapProj(sprite, otherSprite);
})

events.spriteEvent(SpriteKind.ShieldProj, SpriteKind.Projectile, events.SpriteEvent.StartOverlapping, function (sprite, otherSprite) {
    sprites.destroy(sprite);
    sprites.destroy(otherSprite);
})



