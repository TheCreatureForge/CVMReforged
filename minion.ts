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
        10,         //A Energy Cost
        50,          //B-Back Energy Cost
        100,          //B-Down Energy Cost
        30,          //B Energy Cost
        350,        //character gravity
        -130,       //characterJumpSpeed
        assets.image`MinionModel`
    ) 
    
    export const minionAnimations = new AnimationSetUp(
        assets.animation`MinionWalk`, //walk
        assets.image`MinionStun`,    //HitStun
        assets.animation`MinionB`,// bNeutral
        assets.animation`MinionBackB`,//bBack
        assets.animation`MinionDownB`,//bDown
    );

    const minionAProjectile = new projectiles.MakeProjectile(
        5,      //Damage
        90,      //vx
        0,      //vy            
        assets.image`MinionProj`,  //image
        0,     //applied vx
        0       //applied vy
    )
    

    const minionBProjectile =  new projectiles.MakeProjectile(
        10,      //Damage
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

    const minionDownBProjectile =  new projectiles.MakeProjectile(
        30,      //Damage
        0,     //vx
        0,      //vy            
        assets.image`NullImage`, // Image
        30,     //applied vx
        250,       //applied vy
        1,      //scale
        true,   //Dont Destroy On Hit
        10000,     //Lifetime
        2000     //hitStun applied
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

        let splashArt = sprites.create(assets.image`NullImage`.clone(), SpriteKind.Food)
        splashArt.x = 8;
        splashArt.y = 10;
        
        
        for (let value of sprites.allOfKind(SpriteKind.Projectile)) {
            if (sprites.readDataNumber(value, "ownersPlayerNum") == sprites.readDataNumber(player, "playerNum")) {
                amountOfProjectile++;
            }
        }
        
        
        if (amountOfProjectile >= 8) {
            effects.blizzard.startScreenEffect(800);
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
            stun(player, 900, false);
            player.vx = 0;
            timer.after(600, function () {
                let projectile = sprites.createProjectileFromSprite(assets.image`NullImage`.clone(), player, 0, 0);
                fightSetup.ApplyCharProjStats(projectile, minionBProjectile, player);
                sprites.setDataNumber(projectile, "damage", sprites.readDataNumber(projectile, "damage") + 20 )
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
        removeEnergy(player, minionStats.characterBackBEnergyCost);
        let MCP: number;

        if (getPlayerNum(player) == 1) {
            MCP = p1MinionCollectProj
            p1MinionCollectProj = 0;
        } else {
            MCP = p2MinionCollectProj;
            p2MinionCollectProj = 0;
        }

        if (MCP <= 0) {
            let particleArea = sprites.create(assets.image`NullImage`, SpriteKind.Prop);
            let vaccumParticles = extraEffects.createCustomSpreadEffectData(
                [11, 15],
                false,
                extraEffects.createPresetSizeTable(ExtraEffectPresetShape.Twinkle),
                extraEffects.createPercentageRange(7, 100),
                extraEffects.createPercentageRange(2, 10),
                extraEffects.createTimeRange(200, 300),
                0,
                0,
                extraEffects.createPercentageRange(50, 100),
                0,
                0,
                5000
            )
            particleArea.y = player.y;


            sprites.setDataBoolean(player, "hasShield", true);
            player.vx = 0;
    
    
            stun(player, 4000, false);

            if (isPlayerFacing(player, "Right")) {
                animation.runImageAnimation(player, whichPlayerAnim(player).bBack, 50, false);
                particleArea.x = player.x + 30;
                vaccumParticles.extraVX = -100;
            } else {
                animation.runImageAnimation(player, whichPlayerAnim(player).bBackLeft, 50, false);
                particleArea.x = player.x - 30;
                vaccumParticles.extraVX = 100;
            }
            
            extraEffects.createSpreadEffectOnAnchor(particleArea, vaccumParticles, 3400, 40, 52)

            timer.after(3000, function () {
                sprites.setDataBoolean(player, "hasShield", false)
                if (isPlayerFacing(player, "Right")) {
                    animation.runImageAnimation(player, reverseAnimation(whichPlayerAnim(player).bBack), 70, false);
                } else {
                    animation.runImageAnimation(player, reverseAnimation(whichPlayerAnim(player).bBackLeft), 70, false);
                }
                particleArea.destroy();
            })

        } else {
            stun(player, 500 + (MCP * 500), false);
            
            player.vx = 0;
            if (isPlayerFacing(player, "Right")) {
                animation.runImageAnimation(player, assets.animation`MinionBackB2`, 100, false);
                
            } else {
                animation.runImageAnimation(player, flipAnim(assets.animation`MinionBackB2`), 100, false);
            }

            for (let i = 0; i < MCP; i++){
                timer.after(200 + (i * 500), function () {
                    let projectile = sprites.createProjectileFromSprite(assets.image`NullImage`.clone(), player, 0, 0);
                    fightSetup.ApplyCharProjStats(projectile, minionBHomingProjectile, player);
                    if (getPlayerNum(player) == 1) {
                        followPlayer(projectile, player2,20, 13);
                    } else {
                        followPlayer(projectile, player1,20, 13); 
                    }
                    
                })
            }

            timer.after((MCP * 500), function () {
                if (isPlayerFacing(player, "Right")) {
                    animation.runImageAnimation(player, reverseAnimation(assets.animation`MinionBackB2`), 100, false);
                    
                } else {
                    animation.runImageAnimation(player, reverseAnimation(flipAnim(assets.animation`MinionBackB2`)), 100, false);
                }
            })

        }
    }

    export function minionDownB(player: Sprite) {
        //if not on the ground exit function
        if (!player.isHittingTile(CollisionDirection.Bottom)) {
            return;
        }

        removeEnergy(player, minionStats.characterDownBEnergyCost);

        //stop them from moving and using move
        player.vx = 0;
        stun(player, 2700, false);

        animation.runImageAnimation(player, assets.animation`MinionDownBStart`, 100, false);
        timer.after(100, function () {
            scene.cameraShake(2, 700);
            animation.runImageAnimation(player, whichPlayerAnim(player).bDown, 100, true);
            timer.after(500, function () {
                let groundSprite = sprites.create(assets.image`NullImage`, SpriteKind.Prop);
                if (getPlayerNum(player) == 1) {
                    groundSprite.x = player2.x - 23;
                } else {
                    groundSprite.x = player1.x - 23;
                }

                groundSprite.y = 88;
                animation.runImageAnimation(groundSprite, assets.animation`MinionDownBProjStart`, 100, false);
                timer.after(600, function () {
                    groundSprite.setKind(SpriteKind.Projectile);
                    fightSetup.ApplyCharProjStats(groundSprite, minionDownBProjectile, player);
                    groundSprite.y = 88;
                    animation.runImageAnimation(groundSprite, assets.animation`MinionDownBProj`, 50, false);
                    timer.after(800, function () {
                        animation.runImageAnimation(groundSprite, reverseAnimation( assets.animation`MinionDownBProj`), 50, false);
                        timer.after(350, function () {
                            animation.stopAnimation(animation.AnimationTypes.All, player)
                            sprites.destroy(groundSprite)
                            player.setImage(assets.image`MinionModel`.clone());

                        });
                    });
    
                });

            });
        });

       
        

    }
}
