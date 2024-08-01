///<reference path="./importFiles.ts" />
namespace SpriteKind{
    export const Player1Fighter = SpriteKind.create();
    export const Player2Fighter = SpriteKind.create();
}

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


game.onUpdate(() => {
    // Code in this function will run once per frame. MakeCode
    // Arcade games run at 30 FPS
});


scene.setBackgroundColor(13)
scene.setBackgroundImage(assets.image`MenuArt`)

game.setDialogFrame(assets.image`NullImage`)
game.setDialogCursor(assets.image`NullImage`)
game.showLongText("", DialogLayout.Bottom)

scene.setBackgroundImage(assets.image`NullImage`)

let creature = characters.characterList.Creature;
let minion = characters.characterList.Minion;

//makes Player's cursor when on character select
let player1Cursor = charSelect.createCursor1();
let player2Cursor = charSelect.createCursor2();

//THESE ARE THE FIGHTER, use for select screen as well
let player1 = sprites.create(assets.image`NullImage`, SpriteKind.Player1Fighter);
player1.setPosition(25, 30);
player1.scale = 2;

let player2 = sprites.create(assets.image`NullImage`, SpriteKind.Player2Fighter);
player2.setPosition(100, 30);
player2.scale = 2;

tiles.setCurrentTilemap(tilemap`CharSelectTM`)


// Display hovers for characters
charSelect.setupOverlapTileHandler(assets.tile`CreatureTile`, assets.image`CreatureSelectImg`);
charSelect.setupOverlapTileHandler(assets.tile`MinionTile`, assets.image`MinionSelectImg`);
charSelect.setupOverlapTileHandler(assets.tile`RainCatcherTile`, assets.image`RCSelectImg`);
charSelect.setupOverlapTileHandler(assets.tile`AmongUsTile`, assets.image`AmongUsSelectImg`);
charSelect.setupOverlapTileHandler(assets.tile`CodeyTile`, assets.image`CodeySelectImg`);
charSelect.setupOverlapTileHandler(assets.tile`HankTile`, assets.image`HankSelectImg`);