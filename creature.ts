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
        80,          //Forward-B Energy Cost
        20,          //B Energy Cost
        350,        //character gravity
        -120,       //characterJumpSpeed
        assets.image`CreatureModel` //Image
    )
       

    export const creatureAnimations = new AnimationSetUp(
        assets.animation`CreatureWalk`, //walk
        assets.image`CreatureStun`,    //HitStun
        assets.animation`CreatureBAnim`,//NeutralB
        assets.animation`CreatureShield`,// BackB
        assets.animation`CreatureDownBAnim`,//bDown
        null,//bForward
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
        1,      //scale
        true,   //Dont Destroy On Hit
        100,     //Lifetime
        1000     //hitStun applied
    )

    const creatureForwardBProjectile =  new projectiles.MakeProjectile(
        30,      //Damage
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

    const creatureForwardBSpikeHitbox =  new projectiles.MakeProjectile(
        5,      //Damage
        0,     //vx
        0,      //vy            
        assets.image`HitBox`, // Image
        0,     //applied vx
        -100,       //applied vy
        1,      //scale
        false,   //Dont Destroy On Hit
        250,     //Lifetime
        300     //hitStun applied
    )

    const creatureBProj =  new projectiles.MakeProjectile(
        5,      //Damage
        50,     //vx
        0,      //vy            
        assets.image`CreatureSProj`, // Image
        0,     //applied vx
        0,       //applied vy
        1,      //scale
        false,   //Dont Destroy On Hit
        2500,     //Lifetime
        0     //hitStun applied
    )

    

    
    
    //This is for his 'A' attack, the CharacterAttack function already makes a projectile for us
    //so all we have to do is apply the stats, for the middle parameter give it a proj stat (Look above for a example)
    export function creatureA(projectile: Sprite, player: Sprite) {
        fightSetup.ApplyCharProjStats(projectile, creatureAProjectile, player); 
    }

    //Bit of a special case but this makes a projectile, applies stats, then make it a shieldProj which can destroy shots
    export function creatureB(player: Sprite) {
        let proj = sprites.createProjectileFromSprite(assets.image`NullImage`, player, 0, 0);
        fightSetup.ApplyCharProjStats(proj, creatureBProj, player);
        proj.setKind(SpriteKind.ShieldProj);
        isPlayerFacing(player, "Right")? proj.ax = -20 : proj.ax = 20 ;
    }

    //To see the shield energy return mechanic look at the Proj overlap PLayer in the overlapHandler
    export function creatureBBack(player: Sprite) {
        //`hasShield` makes them immune to proj Damage
        sprites.setDataBoolean(player, "hasShield", true);

        //we look to see which way our player is facing and then play the correct facing anim
        if (isPlayerFacing(player, "Right")) {
            animation.runImageAnimation(player, whichPlayerAnim(player).bBack, 200, true);
        } else {
            animation.runImageAnimation(player, whichPlayerAnim(player).bBackLeft, 200, true);
        }

        //stunning the player for 1.5 secs and stop gravity for that time frame
        stun(player, 1500, true);
    
        //after the time reset anim, the set default image, and disable shield
        timer.after(1500, function () {
            animation.stopAnimation(animation.AnimationTypes.All, player);
            player.setImage(assets.image`CreatureModel`);
            sprites.setDataBoolean(player, "hasShield", false);
        })

    }

    export function creatureDownB(player: Sprite) {
        let projectile = sprites.createProjectileFromSprite(assets.image`NullImage`, player, 0, 0);
        let offset: number;

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

    export function creatureForwardB(player: Sprite) {
        if (isPlayerFacing(player, "Right")) {
            player.vx += 20;
        } else {
            player.vx -= 20;
        }

        stun(player, 1400, false);
        player.vy -= 225;
        
        timer.after(600, function () {
            player.ay = 2000;

            //example on how to use a hitBox, make a projectile with their own stats, then use the a makeHitBox function 
            let proj = sprites.createProjectileFromSprite(assets.image`NullImage`, player, 0, 0);
            fightSetup.ApplyCharProjStats(proj, creatureForwardBSpikeHitbox, player)
            projectiles.MakeHitBox(proj, 0, -20, 10, 10, player);
            
            timer.after(400, function () {
                scene.cameraShake(2, 200);
                let projectile = sprites.createProjectileFromSprite(assets.image`NullImage`.clone(), player, 0, 0);
                animation.runImageAnimation(projectile, creatureAnimations.bNeutral, 50, false);
                fightSetup.ApplyCharProjStats(projectile, creatureForwardBProjectile, player); 
                projectile.x -= 28;
                player.ay = creatureStats.characterGravity;
                       
            })

        })

    }

}


