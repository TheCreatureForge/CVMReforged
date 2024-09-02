
let p1CodeyDownBCharge: number = 0;
let p2CodeyDownBCharge: number = 0;

let p1CodeyChargeLevel: number = 0;
let p2CodeyChargeLevel: number = 0;

namespace codey {
    export const codeyStats = new CMakeNS.selectChar(
        100,        //hp
        65,         //speed
        3,          //jumnCount
        200,        //Total Energy
        10,         //A Energy Cost
        50,          //Back-B Energy Cost
        40,          //Down-B Energy Cost
        40,          //Forward-B Energy Cost
        50,          //B Energy Cost
        340,        //character gravity
        -125,       //characterJumpSpeed
        assets.image`CodeyModel` //Image
    )
       

    export const codeyAnimations = new AnimationSetUp(
        assets.animation`CodeyWalk`, //walk
        assets.image`CodeyStun`,    //HitStun
        assets.animation`CodeyBUp`,//bNeutral
        assets.animation`CodeyBackBAnim`,// BackB
        assets.animation`CodeyDownB`,//bDown
        assets.animation`MinionDownB`,//bForward
    );

    const codeyAProjectile = new projectiles.MakeProjectile(
        2,      //Damage
        130,     //vx
        0,      //vy            
        assets.image`CodeyProj`, // Image
        0,     //applied vx
        0       //applied vy
    )

    const codeyBackBProjectile = new projectiles.MakeProjectile(
        20,      //Damage
        0,     //vx
        0,      //vy            
        assets.image`HitBox`, // Image
        20,     //applied vx
        175,       //applied vy
        1,      //scale
        false,   //Dont Destroy On Hit
        600,     //Lifetime
        500     //hitStun applied
    )

    const codeyBProjectileUp = new projectiles.MakeProjectile(
        25,      //Damage
        0,     //vx
        0,      //vy            
        assets.image`HitBox`, // Image
        20,     //applied vx
        200,       //applied vy
        1,      //scale
        false,   //Dont Destroy On Hit
        600,     //Lifetime
        400     //hitStun applied
    )

    const codeyBProjectileDown = new projectiles.MakeProjectile(
        15,      //Damage
        0,     //vx
        0,      //vy            
        assets.image`HitBox`, // Image
        40,     //applied vx
        -100,       //applied vy
        1,      //scale
        false,   //Dont Destroy On Hit
        600,     //Lifetime
        400     //hitStun applied
    )
    
    export const codeyProjectileDownB = new projectiles.MakeProjectile(
        10,      //Damage
        0,     //vx
        0,      //vy            
        assets.image`CodeyFastProj`, // Image
        30,     //applied vx
        100,       //applied vy
        1,      //scale
        false,   //Dont Destroy On Hit
        600,     //Lifetime
        200     //hitStun applied
    )

    export function codeyA(projectile: Sprite, player: Sprite) {
        fightSetup.ApplyCharProjStats(projectile, codeyAProjectile, player);
        
    }

    export function codeyBackB(player: Sprite) {
        sprites.setDataBoolean(player, "hasShield", true);

        timer.after(200, function () {
            
            let proj = sprites.createProjectileFromSprite(assets.image`NullImage`, player, 0, 0);
            fightSetup.ApplyCharProjStats(proj, codeyBackBProjectile, player);
            projectiles.MakeHitBox(
                proj,
                12,
                -10,
                8,
                10
            );
          
        })

        if (isPlayerFacing(player, "Right")) {
            animation.runImageAnimation(player, whichPlayerAnim(player).bBack, 50, false);
        } else {
            animation.runImageAnimation(player, whichPlayerAnim(player).bBackLeft, 50, false);
        }

        stun(player, 500, true);
    
        timer.after(600, function () {
            sprites.setDataBoolean(player, "hasShield", false);
        })

    }

    export function codeyB(player: Sprite) {

        
        
        let goingUp: boolean;
        player.vx += (isPlayerFacing(player, "Right")) ? 80 : -80;
        if (player.isHittingTile(CollisionDirection.Bottom)) {
            player.vy -= 250;
            goingUp = true;
        } else {
            player.vy += 250;
            goingUp = false;
        }
       
        if (goingUp) {
            if (isPlayerFacing(player, "Right")) {
                animation.runImageAnimation(player, whichPlayerAnim(player).bNeutral, 50, true);
            } else {
                animation.runImageAnimation(player, whichPlayerAnim(player).bNeutralLeft, 50, true);
            }
        } else {
            if (isPlayerFacing(player, "Right")) {
                animation.runImageAnimation(player, assets.animation`CodeyBDown`, 100, false);
            } else {
                animation.runImageAnimation(player, flipAnim(assets.animation`CodeyBDown`), 100, false);
            }
        }


        stun(player, 400, false);
        
        let proj = sprites.createProjectileFromSprite(assets.image`NullImage`, player, 0, 0);

        if (goingUp) {
            fightSetup.ApplyCharProjStats(proj, codeyBProjectileUp, player);
            projectiles.MakeHitBox(proj, 0, 0, 10, 10, player);
        } else {
            fightSetup.ApplyCharProjStats(proj, codeyBProjectileDown, player);
            projectiles.MakeHitBox(proj, 0, 0, 30, 30, player);
        }
        

        
        timer.after(300, function () {
            player.vx = 0;
            player.vy = 0;
            player.ay = 100;
            timer.after(400, function () {
                player.ay = 340;
    
            })
        })

    }

    export function codeyDownB(player: Sprite) {

        if (player === player1) {
            p1CodeyChargeLevel++;
        } else {
            p2CodeyChargeLevel++;
        }

        let chargeLevel = player === player1 ? p1CodeyChargeLevel : p2CodeyChargeLevel;

        

        if (chargeLevel == 1) {
            player.vy = 0;
            player.ay = 10;

            (player === player1) ? controller.moveSprite(player1, 0, 0) : controller.player2.moveSprite(player2, 0, 0);
            animation.runImageAnimation(player, assets.animation`CodeyDownCharge1`, 150, true);
            timer.after(1000, function () {
                if (chargeLevel == 1 && (player === player1) ? p1CodeyChargeLevel > 0 : p2CodeyChargeLevel > 0) {
                    animation.runImageAnimation(player, assets.animation`CodeyDownCharge2`, 125, true);
                }
                timer.after(2000, function () {
                    if (chargeLevel == 1 && (player === player1) ? p1CodeyChargeLevel > 0 : p2CodeyChargeLevel > 0) {
                        animation.runImageAnimation(player, assets.animation`CodeyDownCharge3`, 100, true);
                    }
                })
            })
           

        } else {
            if (isPlayerFacing(player, "Right")) {
                animation.runImageAnimation(player, whichPlayerAnim(player).bDown, 50, false);
            } else {
                animation.runImageAnimation(player, whichPlayerAnim(player).bDownLeft, 50, false);
            }

            let proj = sprites.createProjectileFromSprite(assets.image`CodeyFastProj`, player, 0, 0);
            fightSetup.ApplyCharProjStats(proj, codey.codeyProjectileDownB, player);
            spriteutils.setVelocityAtAngle(proj, spriteutils.angleFrom(player, (player === player1)? player2: player1 ), (player === player1) ? p1CodeyDownBCharge : p2CodeyDownBCharge / 0.5);

            (player === player1) ? p1CodeyChargeLevel = 0 : p2CodeyChargeLevel = 0;
            (player === player1) ? p1CodeyDownBCharge = 0 : p1CodeyDownBCharge = 0;
            (player === player1) ? controller.moveSprite(player1, 65, 0) : controller.player2.moveSprite(player2, 65, 0);
            
            player.ay = 340;
            
            
        }
            


    }



    forever(function () {
        if (player1Character === "Codey" && p1CodeyChargeLevel == 1) {
            if (p1CodeyDownBCharge <= 200) {
                p1CodeyDownBCharge++
                //player1.say(p1CodeyDownBCharge);
            } 
        }

        if (player2Character === "Codey" && p2CodeyChargeLevel == 1) {
            if (p2CodeyDownBCharge <= 200) {
                p2CodeyDownBCharge++
                //player2.say(p2CodeyDownBCharge);
            } 
        }
        

    
    });
}

