///<reference path="./projectiles.ts" />
namespace creature{

    export const creatureStats =  new CMakeNS.selectChar(
        200,        //hp
        60,         //speed
        2,          //jumnCount
        200,        //Total Energy
        15,         //A Energy Cost
        95,          //Back-B Energy Cost
        75,          //Down-B Energy Cost
        80,          //B Energy Cost
        350,        //character gravity
        -120,       //characterJumpSpeed
        assets.image`CreatureModel` //Image
    )
       

    export const creatureAnimations = new AnimationSetUp(
        assets.animation`CreatureWalk`, //walk
        assets.image`CreatureStun`,    //HitStun
        assets.animation`CreatureBAnim`,//bBack
        assets.animation`CreatureShield`,// bNeutral
        assets.animation`CreatureDownBAnim`,//bDown
    );
    
    const creatureAProjectile =  new projectiles.MakeProjectile(
        5,      //Damage
        100,     //vx
        0,      //vy            
        assets.image`CreatureProj`, // Image
        0,     //applied vx
        0       //applied vy
    )

    const creatureDownBProjectile =  new projectiles.MakeProjectile(
        25,      //Damage
        0,     //vx
        0,      //vy            
        assets.image`CritParticle`, // Image
        20,     //applied vx
        200,       //applied vy
        2,      //scale
        true,   //Dont Destroy On Hit
        100,     //Lifetime
        1000     //hitStun applied
    )

    const creatureBProjectile =  new projectiles.MakeProjectile(
        15,      //Damage
        0,     //vx
        0,      //vy            
        assets.image`CritParticle`, // Image
        40,     //applied vx
        100,       //applied vy
        1,      //scale
        true,   //Dont Destroy On Hit
        500,     //Lifetime
        1200     //hitStun applied
    )

    
    
    
    export function creatureA(projectile: Sprite, player: Sprite) {
        fightSetup.ApplyCharProjStats(projectile, creatureAProjectile, player);
        
    }


    export function creatureBBack(player: Sprite) {
        sprites.setDataBoolean(player, "hasShield", true);

        removeEnergy(player, creatureStats.characterBackBEnergyCost);
        if (isPlayerFacing(player, "Right")) {
            animation.runImageAnimation(player, whichPlayerAnim(player).bBack, 200, true);
        } else {
            animation.runImageAnimation(player, whichPlayerAnim(player).bBackLeft, 200, true);
        }

        stun(player, 1500, true);
    
        timer.after(1500, function () {
            animation.stopAnimation(animation.AnimationTypes.All, player);
            player.setImage(assets.image`CreatureModel`);
            sprites.setDataBoolean(player, "hasShield", false);
        })

    }

    export function creatureDownB(player: Sprite) {
        let projectile = sprites.createProjectileFromSprite(assets.image`NullImage`, player, 0, 0);
        let offset: number;
        removeEnergy(player, creatureStats.characterDownBEnergyCost);

        if (isPlayerFacing(player, "Right")) {
            offset = 20;
            animation.runImageAnimation(player, whichPlayerAnim(player).bDown, 50, false);
            
        } else {
            offset = -20;
            animation.runImageAnimation(player, whichPlayerAnim(player).bDownLeft, 50, false);
        }

        characterAnimations.setCharacterAnimationsEnabled(player, false)
        timer.after(400, function () {
            fightSetup.ApplyCharProjStats(projectile, creatureDownBProjectile, player);  
            projectile.x = player.x + offset;
            projectile.y = player.y + 16;
        })

        stun(player, 700, false);
            
        
    }

    export function creatureB(player: Sprite) {
        removeEnergy(player, creatureStats.characterBEnergyCost);
        if (isPlayerFacing(player, "Right")) {
            player.vx += 20;
        } else {
            player.vx -= 20;
        }

        stun(player, 1400, false);
        player.vy -= 225;
        
        timer.after(600, function () {
            player.ay = 2000;

            timer.after(400, function () {
                scene.cameraShake(2, 200);
                let projectile = sprites.createProjectileFromSprite(assets.image`NullImage`.clone(), player, 0, 0);
                animation.runImageAnimation(projectile, creatureAnimations.bNeutral, 50, false);
                fightSetup.ApplyCharProjStats(projectile, creatureBProjectile, player); 
                projectile.x -= 28;
                player.ay = 350;
                       
            })

        })

    }

}


