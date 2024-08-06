///<reference path="./CharacterMake.ts" />
//hp,Image
namespace characters {


    // hp, speed, jumpCount, characterDamage, characterGravity, characterJumpSpeed, image,          |||||| deathAnim, winAnim
    export const characterList = {
        Creature: new CMakeNS.selectChar(200, 60, 2, -7, 350, -160, assets.image`CreatureModel`),

        Minion: new CMakeNS.selectChar(200, 55, 2, -7, 350, -170, assets.image`MinionModel`),

        Raincatcher: new CMakeNS.selectChar(250, 45, 1, -2, 375, -180, assets.image`RaincatcherModel`),

        Crewmate: new CMakeNS.selectChar(200, 55, 2, -7, 275, -135, assets.image`CrewmateModel`),

        Codey: new CMakeNS.selectChar(180, 64, 3, -6, 350, -135, assets.image`CodeyModel`),

        Hank: new CMakeNS.selectChar(250, 55, 2, -8, 360, -160, assets.image`HankModel`),

        Barth: new CMakeNS.selectChar(200, 50, 2, -3.5, 355, -200, assets.image`BarthModel`),

        Dot: new CMakeNS.selectChar(225, 55, 1, -7, 400, -200, assets.image`DotModel`),

        DarkCreature: new CMakeNS.selectChar(200, 60, 2, -7, 350, -160, assets.image`DarkCreatureModel`),

        
    };


    export function ApplyCharStats(sprite: Sprite, char:CMakeNS.selectChar, direction: string) {
        sprites.setDataNumber(sprite, "hp", char.hp);
        sprites.setDataNumber(sprite, "speed", char.speed);
        sprites.setDataNumber(sprite, "jumpCount", char.jumpCount);
        sprites.setDataNumber(sprite, "characterDamage", char.characterDamage);
        sprite.ay = char.characterGravity;

        
        sprites.setDataNumber(sprite, "characterJumpSpeed", char.characterJumpSpeed);
        sprites.setDataString(sprite,"direction", direction)

        sprite.setImage(char.image);
    }

}


//1 creature
//2 minion
//3rain catcher
//4 crewmate
//5 codey
//6 Hank

//8 barth
//9 dot
//10 dark creature