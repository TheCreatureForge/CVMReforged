///<reference path="./projectiles.ts" />
///<reference path="./setUpFighters.ts" />

let p1MinionCollectProj: number = 0;
let p2MinionCollectProj: number = 0;


namespace minion{

    export const minionStats = new CMakeNS.selectChar(
        200,        //hp
        55,         //speed
        2,          //jumnCount
        200,        //Total Energy
        15,         //A Energy Cost
        0,          //B-Back Energy Cost
        10,          //B-Down Energy Cost
        30,          //B Energy Cost
        350,        //character gravity
        -130,       //characterJumpSpeed
        assets.image`MinionModel`
    ) 
    
    const minionAProjectile = new projectiles.MakeProjectile(
        7,      //Damage
        100,      //vx
        0,      //vy            
        assets.image`MinionProj`,  //image
        0,     //applied vx
        0       //applied vy
    )
    

    const minionBProjectile =  new projectiles.MakeProjectile(
        20,      //Damage
        0,     //vx
        0,      //vy            
        assets.image`CritParticle`, // Image
        70,     //applied vx
        100,       //applied vy
        0.5,      //scale
        true,   //Dont Destroy On Hit
        100,     //Lifetime
        1200     //hitStun applied
    )

    const minionBHomingProjectile =  new projectiles.MakeProjectile(
        5,      //Damage
        0,     //vx
        0,      //vy            
        assets.image`MinionHomingProj`, // Image
        0,     //applied vx
        0,       //applied vy
        1,      //scale
        false,   //Dont Destroy On Hit
        4000,     //Lifetime
        0     //hitStun applied
    )

    export const minionAnimations = new AnimationSetUp(
        assets.animation`MinionWalk`, //walk
        assets.animation`MinionWalk`,    //jump
        assets.image`MinionStun`,    //HitStun
        assets.animation`MinionB`,// bNeutral
        assets.animation`MinionBackB`,//bBack
        assets.animation`MinionDownB`,//bDown
    );
    
    export function minionA(projectile: Sprite, player: Sprite) {
        fightSetup.ApplyCharProjStats(projectile, minionAProjectile, player);         
    }

    
    export function minionB(player: Sprite) {
        
        let amountOfProjectile: number = 0;
        let offset: number;

        removeEnergy(player, minionStats.characterBEnergyCost);
        for (let value of sprites.allOfKind(SpriteKind.Projectile)) {
            if (sprites.readDataNumber(value, "ownersPlayerNum") == sprites.readDataNumber(player, "playerNum")) {
                value.vx = 0;
            }
        }

        let splashArt = sprites.create(assets.image`NullImage`, SpriteKind.Food)
        splashArt.x = 8;
        splashArt.y = 10;
        effects.blizzard.startScreenEffect(800);

        
        for (let value of sprites.allOfKind(SpriteKind.Projectile)) {
            if (sprites.readDataNumber(value, "ownersPlayerNum") == sprites.readDataNumber(player, "playerNum")) {
                amountOfProjectile++;
            }
        }

        console.log(amountOfProjectile);
        if (amountOfProjectile >= 8) {
            animation.runImageAnimation(splashArt, assets.animation`MinionBS`, 100, false);
            stun(player1, 1200, true);
            stun(player2, 1200, true);

            pause(1200);
            sprites.destroy(splashArt)
            pause(200);
        } else { 
            
            if (isPlayerFacing(player, "Right")) {
                offset = 13;
                animation.runImageAnimation(player, whichPlayerAnim(player).bNeutral, 300, false);
                
            } else {
                offset = -13;
                animation.runImageAnimation(player, whichPlayerAnim(player).bNeutralLeft, 300, false);
            }
            //animation.stopAnimation(animation.AnimationTypes.All, player);
            stun(player, 900, false);
            player.vx = 0;
            timer.after(600, function () {
                let projectile = sprites.createProjectileFromSprite(assets.image`NullImage`, player, 0, 0);
                fightSetup.ApplyCharProjStats(projectile, minionBProjectile, player);
                sprites.setDataNumber(projectile, "damage", sprites.readDataNumber(projectile, "damage") + 2 )
                projectile.x = player.x + offset;
                projectile.y = player.y + 22;
            })
        }

        for (let value of sprites.allOfKind(SpriteKind.Projectile)) {
            if (sprites.readDataNumber(value, "ownersPlayerNum") == sprites.readDataNumber(player, "playerNum")) {
                value.scale = 3;
                animation.runImageAnimation(value, assets.animation`mExplosion`, 30, false);
                timer.after(1200, function () {             
                    sprites.destroy(value);
                })
            }

        }


    }


    export function minionBackB(player: Sprite) {
        console.log(p2MinionCollectProj);
        let MCP: number;

        if (getPlayerNum(player) == 1) {
            MCP = p1MinionCollectProj
            p1MinionCollectProj = 0;
        } else {
            MCP = p2MinionCollectProj;
            p2MinionCollectProj = 0;
        }

        if (MCP <= 0) {
            
            sprites.setDataBoolean(player, "hasShield", true);
            player.vx = 0;
    
    
            stun(player, 4500, false);
            if (isPlayerFacing(player, "Right")) {
                animation.runImageAnimation(player, whichPlayerAnim(player).bBack, 100, false);
                
            } else {
                animation.runImageAnimation(player, whichPlayerAnim(player).bBackLeft, 100, false);
            }
    
            timer.after(3000, function () {
                sprites.setDataBoolean(player, "hasShield", false)
                if (isPlayerFacing(player, "Right")) {
                    animation.runImageAnimation(player, reverseAnimation(whichPlayerAnim(player).bBack), 100, false);
                    
                } else {
                    animation.runImageAnimation(player, reverseAnimation(whichPlayerAnim(player).bBackLeft), 100, false);
                }
            })
        } else {
            stun(player, 500  +(MCP * 500), false);
            player.vx = 0;
            if (isPlayerFacing(player, "Right")) {
                animation.runImageAnimation(player, assets.animation`MinionBackB2`, 100, false);
                
            } else {
                animation.runImageAnimation(player, flipImage(assets.animation`MinionBackB2`), 100, false);
            }

            for (let i = 0; i < MCP; i++){
                timer.after(200 + (i * 500), function () {
                    let projectile = sprites.createProjectileFromSprite(assets.image`NullImage`, player, 0, 0);
                    fightSetup.ApplyCharProjStats(projectile, minionBHomingProjectile, player);
                    if (getPlayerNum(player) == 1) {
                        projectile.follow(player2, 20);    
                    } else {
                        projectile.follow(player1,20);    
                    }
                    
                })
            }

        }
    }

    export function minionDownB(player: Sprite) {
        stun(player, 5000, false);
        animation.runImageAnimation(player, assets.animation`MinionDownBStart`, 100, false);
        timer.after(500, function () {
            animation.runImageAnimation(player, whichPlayerAnim(player).bDown, 100, true);
        });

        timer.after(5000, function () {
            animation.runImageAnimation(player, flipImage(whichPlayerAnim(player).bDown), 100, true);
        });
        

    }
}
