///<reference path="./CharacterMake.ts" />
///<reference path="./projectiles.ts" />

namespace characters {


    // hp, speed, jumpCount,  characterGravity, characterJumpSpeed, image, |||||| deathAnim, winAnim
    export const characterList = {
        
        Minion: new CMakeNS.selectChar(
            200,        //hp
            55,         //speed
            2,          //jumnCount
            200,        //Total Energy
            20,         //A Energy Cost
            0,          //B-Back Energy Cost
            0,          //B-Down Energy Cost
            0,          //B Energy Cost
            350,        //character gravity
            -130,       //characterJumpSpeed
            assets.image`MinionModel`)    //Image
        ,


        // Raincatcher: new CMakeNS.selectChar(250, 45, 1, 200, 375, -140, assets.image`RaincatcherModel`),

        // Crewmate: new CMakeNS.selectChar(200, 55, 2, 200, 275, -95, assets.image`CrewmateModel`),

        // Codey: new CMakeNS.selectChar(180, 64, 3, 200, 350, -95, assets.image`CodeyModel`),

        // Hank: new CMakeNS.selectChar(250, 55, 2,  200 , 360, -120, assets.image`HankModel`),

        // Barth: new CMakeNS.selectChar(200, 50, 2, 200 , 355, -160, assets.image`BarthModel`),
 
        // Dot: new CMakeNS.selectChar(225, 55, 1, 200 , 400, -160, assets.image`DotModel`),

        // DarkCreature: new CMakeNS.selectChar(200, 60, 2, 200 , 350, -120, assets.image`DarkCreatureModel`),

        
    };


    export const characterProjectileList = {
        CreatureA: new projectiles.MakeProjectile(
            7,      //Damage
            50,            //vx
            0,             //vy            
            assets.image`CreatureProj`), //Projectile image
        
        MinionA: new projectiles.MakeProjectile(
            7,      //Damage
            50,            //vx
            0,             //vy            
            assets.image`MinionProj`), //Projectile image
        
         
    };
    
    export function ApplyCharProjStats(proj: Sprite, projStats: projectiles.MakeProjectile, projOwner: Sprite) {
        proj.setImage(projStats.image.clone());
        proj.vx = projStats.vx;

        if (sprites.readDataString(projOwner, "direction") == "Left") {
            proj.image.flipX();
            proj.vx *= -1;
        }
        
        proj.scale = projStats.scale;
        proj.lifespan = projStats.lifeTime;
        sprites.setDataNumber(proj, "damage", projStats.damage);
        sprites.setDataNumber(proj, "ownersPlayerNum", sprites.readDataNumber(projOwner, "playerNum")); 
        sprites.setDataBoolean(proj, "dontDestroyOnHit", projStats.dontDestroyOnHit);
        


    }

    export function ApplyCharStats(sprite: Sprite, char:CMakeNS.selectChar, direction: string) {
        sprites.setDataNumber(sprite, "hp", char.hp);
        sprites.setDataNumber(sprite, "speed", char.speed);
        sprites.setDataNumber(sprite, "jumpCount", char.jumpCount);

        sprites.setDataNumber(sprite, "characterEnergy", char.characterEnergy);
        sprites.setDataNumber(sprite, "characterAEnergy", char.characterAEnergyCost);
        sprites.setDataNumber(sprite, "characterBBackEnergyCost", char.characterBBackEnergyCost);
        sprites.setDataNumber(sprite, "characterBDownEnergyCost", char.characterBDownEnergyCost);
        sprites.setDataNumber(sprite, "characterBEnergyCost", char.characterBEnergyCost);
        
        sprite.ay = char.characterGravity;

        
        sprites.setDataNumber(sprite, "characterJumpSpeed", char.characterJumpSpeed);
        sprites.setDataString(sprite,"direction", direction)

        sprite.setImage(char.image.clone());
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