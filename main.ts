///<reference path="./importFiles.ts" />
namespace SpriteKind{
    export const Player1Fighter = SpriteKind.create();
    export const Player2Fighter = SpriteKind.create();
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
)

Keybinds.setSimulatorKeymap(
    Keybinds.PlayerNumber.TWO,
    Keybinds.CustomKey.UP,
    Keybinds.CustomKey.DOWN,
    Keybinds.CustomKey.LEFT,
    Keybinds.CustomKey.RIGHT,
    Keybinds.CustomKey.O,
    Keybinds.CustomKey.P
)


//For charatcer select, Check if cursor hovers character,displays spash art, and change their character 
//TODO Port over to characterSelect.ts and optimzie because right now there 2 of every overlap each player, convert into one 
//Creature
scene.onOverlapTile(SpriteKind.Player1Fighter, assets.tile`CreatureTile`, function (sprite) {
    charSelect.displayCharSelectImg(sprites.readDataNumber(sprite, "PlayerNumber"), assets.image`CreatureSelectImg`)
    charSelect.changePlayerCharacter(sprites.readDataNumber(sprite, "PlayerNumber"), "Creature")   
})    

//Minion
scene.onOverlapTile(SpriteKind.Player1Fighter, assets.tile`MinionTile`, function (sprite) {
    charSelect.displayCharSelectImg(sprites.readDataNumber(sprite, "PlayerNumber"), assets.image`MinionSelectImg`)
    charSelect.changePlayerCharacter(sprites.readDataNumber(sprite, "PlayerNumber"), "Minion")
})
//Rain Catcher 
scene.onOverlapTile(SpriteKind.Player1Fighter, assets.tile`RainCatcherTile`, function (sprite) {
    charSelect.displayCharSelectImg(sprites.readDataNumber(sprite, "PlayerNumber"), assets.image`RCSelectImg`);
    charSelect.changePlayerCharacter(sprites.readDataNumber(sprite, "PlayerNumber"), "RainCatcher")
    
})
//Among Us
scene.onOverlapTile(SpriteKind.Player1Fighter, assets.tile`AmongUsTile`, function (sprite) {
    charSelect.displayCharSelectImg(sprites.readDataNumber(sprite, "PlayerNumber"), assets.image`AmongUsSelectImg`)
    charSelect.changePlayerCharacter(sprites.readDataNumber(sprite, "PlayerNumber"), "AmongUs")
    
})
//Codey
scene.onOverlapTile(SpriteKind.Player1Fighter, assets.tile`HankTile`, function (sprite) {
    charSelect.displayCharSelectImg(sprites.readDataNumber(sprite, "PlayerNumber"), assets.image`HankSelectImg`);
    charSelect.changePlayerCharacter(sprites.readDataNumber(sprite, "PlayerNumber"), "Hank")
})
//Codey
scene.onOverlapTile(SpriteKind.Player1Fighter, assets.tile`CodeyTile`, function (sprite) {
    charSelect.displayCharSelectImg(sprites.readDataNumber(sprite, "PlayerNumber"), assets.image`CodeySelectImg`)
    charSelect.changePlayerCharacter(sprites.readDataNumber(sprite, "PlayerNumber"), "Codey")
})
//Barth
scene.onOverlapTile(SpriteKind.Player1Fighter, assets.tile`BarthTile`, function (sprite) {
    charSelect.displayCharSelectImg(sprites.readDataNumber(sprite, "PlayerNumber"), assets.image`BarthSelectImg`)
    charSelect.changePlayerCharacter(sprites.readDataNumber(sprite, "PlayerNumber"), "Barth")
})
//Dot
scene.onOverlapTile(SpriteKind.Player1Fighter, assets.tile`DotTile`, function (sprite) {
    charSelect.displayCharSelectImg(sprites.readDataNumber(sprite, "PlayerNumber"), assets.image`DotSelectImg`);
    charSelect.changePlayerCharacter(sprites.readDataNumber(sprite, "PlayerNumber"), "Dot")
})

scene.onOverlapTile(SpriteKind.Player1Fighter, assets.tile`DarkCreatureTile`, function (sprite) {
    charSelect.displayCharSelectImg(sprites.readDataNumber(sprite, "PlayerNumber"), assets.image`DarkCSelectImg`)
    charSelect.changePlayerCharacter(sprites.readDataNumber(sprite, "PlayerNumber"), "DarkCreature")
})




//Creature
scene.onOverlapTile(SpriteKind.Player2Fighter, assets.tile`CreatureTile`, function (sprite) {
    charSelect.displayCharSelectImg(sprites.readDataNumber(sprite, "PlayerNumber"), assets.image`CreatureSelectImg`)
    charSelect.changePlayerCharacter(sprites.readDataNumber(sprite, "PlayerNumber"), "Creature")   
})    

//Minion
scene.onOverlapTile(SpriteKind.Player2Fighter, assets.tile`MinionTile`, function (sprite) {
    charSelect.displayCharSelectImg(sprites.readDataNumber(sprite, "PlayerNumber"), assets.image`MinionSelectImg`)
    charSelect.changePlayerCharacter(sprites.readDataNumber(sprite, "PlayerNumber"), "Minion")
})
//Rain Catcher 
scene.onOverlapTile(SpriteKind.Player2Fighter, assets.tile`RainCatcherTile`, function (sprite) {
    charSelect.displayCharSelectImg(sprites.readDataNumber(sprite, "PlayerNumber"), assets.image`RCSelectImg`);
    charSelect.changePlayerCharacter(sprites.readDataNumber(sprite, "PlayerNumber"), "RainCatcher")
    
})
//Among Us
scene.onOverlapTile(SpriteKind.Player2Fighter, assets.tile`AmongUsTile`, function (sprite) {
    charSelect.displayCharSelectImg(sprites.readDataNumber(sprite, "PlayerNumber"), assets.image`AmongUsSelectImg`)
    charSelect.changePlayerCharacter(sprites.readDataNumber(sprite, "PlayerNumber"), "AmongUs")
    
})
//Codey
scene.onOverlapTile(SpriteKind.Player2Fighter, assets.tile`HankTile`, function (sprite) {
    charSelect.displayCharSelectImg(sprites.readDataNumber(sprite, "PlayerNumber"), assets.image`HankSelectImg`);
    charSelect.changePlayerCharacter(sprites.readDataNumber(sprite, "PlayerNumber"), "Hank")
})
//Codey
scene.onOverlapTile(SpriteKind.Player2Fighter, assets.tile`CodeyTile`, function (sprite) {
    charSelect.displayCharSelectImg(sprites.readDataNumber(sprite, "PlayerNumber"), assets.image`CodeySelectImg`)
    charSelect.changePlayerCharacter(sprites.readDataNumber(sprite, "PlayerNumber"), "Codey")
})
//Barth
scene.onOverlapTile(SpriteKind.Player2Fighter, assets.tile`BarthTile`, function (sprite) {
    charSelect.displayCharSelectImg(sprites.readDataNumber(sprite, "PlayerNumber"), assets.image`BarthSelectImg`)
    charSelect.changePlayerCharacter(sprites.readDataNumber(sprite, "PlayerNumber"), "Barth")
})
//Dot
scene.onOverlapTile(SpriteKind.Player2Fighter, assets.tile`DotTile`, function (sprite) {
    charSelect.displayCharSelectImg(sprites.readDataNumber(sprite, "PlayerNumber"), assets.image`DotSelectImg`);
    charSelect.changePlayerCharacter(sprites.readDataNumber(sprite, "PlayerNumber"), "Dot")
})

scene.onOverlapTile(SpriteKind.Player2Fighter, assets.tile`DarkCreatureTile`, function (sprite) {
    charSelect.displayCharSelectImg(sprites.readDataNumber(sprite, "PlayerNumber"), assets.image`DarkCSelectImg`)
    charSelect.changePlayerCharacter(sprites.readDataNumber(sprite, "PlayerNumber"), "DarkCreature")
})

   



//DO NOT TOUCH BELOW IF MAKING NEW CHARACTER
//DO NOT TOUCH BELOW IF MAKING NEW CHARACTER
//DO NOT TOUCH BELOW IF MAKING NEW CHARACTER
//DO NOT TOUCH BELOW IF MAKING NEW CHARACTER
    

//as of now state of game can be "Select" or "Fight"
let stateOfGame = "Select"

//Keep track of player's character
let player1Character = "";
let player2Character = "";

//VERY IMPORTANT
//creates both players, these are sprites that the players will be controlling, they are also used for splash arts 
let player1 = sprites.create(assets.image`NullImage`, SpriteKind.Player1Fighter);
player1.setPosition(25, 30);
player1.scale = 2;

let player2 = sprites.create(assets.image`NullImage`, SpriteKind.Player2Fighter);
player2.setPosition(100, 30);
player2.scale = 2;

// let creature = characters.characterList.Creature;

// player1.setImage(creature.getSprite());
//sprites.setDataNumber(creature.hp)


//These are the drop down titles 
let Title1 = sprites.create(assets.image`NullImage`, SpriteKind.Prop);
let Title2 = sprites.create(assets.image`NullImage`, SpriteKind.Prop);

Title1.setPosition(8, 8);
Title2.setPosition(106, 8);

sprites.setDataString(Title1, "AnimState", "Away"); //Away: you cant see the title //Down: its shown
sprites.setDataString(Title2, "AnimState", "Away"); 



music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)
scene.setBackgroundColor(13)
scene.setBackgroundImage(assets.image`MenuArt`)

game.setDialogFrame(assets.image`NullImage`)
game.setDialogCursor(assets.image`NullImage`)
game.showLongText("", DialogLayout.Bottom)

scene.setBackgroundImage(assets.image`NullImage`)
info.startCountdown(30);


//creates cursor after  

//Character select songs
if (Math.percentChance(70)) {
    playSong("SmashMenu");
} else {
    playSong("Peace")
} 

tiles.setCurrentTilemap(tilemap`CharSelectTM`)


let player1Cursor = charSelect.createCursor1();
let player2Cursor = charSelect.createCursor2();


//Helper function for music
function playSong(songName: string) {
    music.stopAllSounds();
    music.setVolume(25);
    switch (songName) {
        case "MBStart":
            music.play(music.createSong(assets.song`MBStart`), music.PlaybackMode.InBackground);
            break;
        case "SmashMenu":
            music.play(music.createSong(assets.song`SmashMenu`), music.PlaybackMode.LoopingInBackground);
            break;
        case "Peace":
            music.play(music.createSong(assets.song`Peace`), music.PlaybackMode.InBackground);
            break;
        case "Cythia":
            timer.background(function () {
                music.setVolume(25);
                music.play(music.createSong(assets.song`Cythia1`), music.PlaybackMode.UntilDone);
                music.play(music.createSong(assets.song`Cythia2`), music.PlaybackMode.LoopingInBackground);
            });
            break;
        case "CVMStart":
            music.play(music.createSong(assets.song`CVMStart`), music.PlaybackMode.InBackground);
            break;
           
    }
    music.setVolume(75);
}







