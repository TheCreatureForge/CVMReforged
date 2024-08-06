///<reference path="./CharacterMake.ts" />
//hp,Image
namespace characters {


    // hp, speed, jumpCount, characterDamage, characterGravity, characterJumpSpeed, image,          |||||| deathAnim, winAnim
    export const characterList = {
        Creature: new CMakeNS.selectChar(200, 60, 2, -7, 350, -160, assets.image`CreatureModel`),

        Minion: new CMakeNS.selectChar(200, 55, 2, -7, 350, -170, assets.image`MinionModel`),

        Raincatcher: new CMakeNS.selectChar(250, 45, 1, -2, 375, -180, assets.image`RaincatcherModel`),

        Crewmate: new CMakeNS.selectChar(200, 55, 2, -7, 275, -135, assets.image`CrewmateModel`),

        Codey: new CMakeNS.selectChar(180, 64, 3, -6, 350, -135, assets.image`TestCharacter`),

        Hank: new CMakeNS.selectChar(250, 55, 2, -8, 360, -160, assets.image`TestCharacter`),

        Barth: new CMakeNS.selectChar(200, 50, 2, -3.5, 355, -200, assets.image`TestCharacter`),

        Dot: new CMakeNS.selectChar(225, 55, 1, -7, 400, -200, assets.image`TestCharacter`),

        DarkCreature: new CMakeNS.selectChar(200, 60, 2, -7, 350, -160, assets.image`TestCharacter`),

        
    };

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