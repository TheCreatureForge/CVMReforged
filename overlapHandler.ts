///<reference path="./importFiles.ts" />


namespace overlapHandle {
    
    // Dont change. This picks the char based on hover sprite
    // If you need the tile that got hovered, we have tile-- if you want to add more.
    export function handleOverlap(sprite: Sprite, tile: Image, selectImg: Image, character: string) {
        charSelect.displayCharSelectImg(sprites.readDataNumber(sprite, "PlayerNumber"), selectImg);
        charSelect.changePlayerCharacter(sprites.readDataNumber(sprite, "PlayerNumber"), character);
    }
    
    // Calls 
    export function setupOverlapHandlers(spriteKind: number) {
        scene.onOverlapTile(spriteKind, assets.tile`CreatureTile`, function (sprite) {
            handleOverlap(sprite, assets.tile`CreatureTile`, assets.image`CreatureSelectImg`, "Creature");
        });
        scene.onOverlapTile(spriteKind, assets.tile`MinionTile`, function (sprite) {
            handleOverlap(sprite, assets.tile`MinionTile`, assets.image`MinionSelectImg`, "Minion");
        });
        scene.onOverlapTile(spriteKind, assets.tile`RainCatcherTile`, function (sprite) {
            handleOverlap(sprite, assets.tile`RainCatcherTile`, assets.image`RCSelectImg`, "RainCatcher");
        });
        scene.onOverlapTile(spriteKind, assets.tile`AmongUsTile`, function (sprite) {
            handleOverlap(sprite, assets.tile`AmongUsTile`, assets.image`AmongUsSelectImg`, "AmongUs");
        });
        scene.onOverlapTile(spriteKind, assets.tile`HankTile`, function (sprite) {
            handleOverlap(sprite, assets.tile`HankTile`, assets.image`HankSelectImg`, "Hank");
        });
        scene.onOverlapTile(spriteKind, assets.tile`CodeyTile`, function (sprite) {
            handleOverlap(sprite, assets.tile`CodeyTile`, assets.image`CodeySelectImg`, "Codey");
        });
        scene.onOverlapTile(spriteKind, assets.tile`BarthTile`, function (sprite) {
            handleOverlap(sprite, assets.tile`BarthTile`, assets.image`BarthSelectImg`, "Barth");
        });
        scene.onOverlapTile(spriteKind, assets.tile`DotTile`, function (sprite) {
            handleOverlap(sprite, assets.tile`DotTile`, assets.image`DotSelectImg`, "Dot");
        });
        scene.onOverlapTile(spriteKind, assets.tile`DarkCreatureTile`, function (sprite) {
            handleOverlap(sprite, assets.tile`DarkCreatureTile`, assets.image`DarkCSelectImg`, "DarkCreature");
        });
    }

    


}