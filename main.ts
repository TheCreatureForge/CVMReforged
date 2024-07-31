/**
 * This is the main file for your project.
 *
 * Create images, tilemaps, animations, and songs using the
 * asset explorer in VS Code. You can reference those assets
 * using the tagged templates on the assets namespace:
 *
 *     assets.image`myImageName`
 *     assets.tilemap`myTilemapName`
 *     assets.tile`myTileName`
 *     assets.animation`myAnimationName`
 *     assets.song`mySongName`
 *
 * New to MakeCode Arcade? Try creating a new project using one
 * of the templates to learn about Sprites, Tilemaps, Animations,
 * and more! Or check out the reference docs here:
 *
 * https://arcade.makecode.com/reference
 */
///<reference path="./importFiles.ts" />

let ryan = characters.characterList.Hank;
let player1 = sprites.create(ryan.getSprite(), SpriteKind.Player)
//let Player2Selector = sprites.create(assets.image(spriteImagaray), SpriteKind.Player)

// let Player1Selector = sprites.create(assets.image`Cursor`, SpriteKind.Player)

game.onUpdate(() => {
    // Code in this function will run once per frame. MakeCode
    // Arcade games run at 30 FPS
});


//scene.setBackgroundImage(assets.image`MenuArt`)



controller.moveSprite(player1)