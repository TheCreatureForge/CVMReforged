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

    export function playerOverlapProj(player: Sprite, proj: Sprite) {
        //if its not your own projectile hurt player
        if (sprites.readDataNumber(player, "playerNum") == sprites.readDataNumber(proj, "ownersPlayerNum")){
            return;
        }

        //if the player is shielded
        if (sprites.readDataBoolean(player, "hasShield") == true ) {
            
            //creature shield return energy mechanic
            if (sprites.readDataNumber(player, "playerNum") == 1 && player1Character == "Creature") {
                player1EnergyBar.value += 25;
            } else if(sprites.readDataNumber(player, "playerNum") == 2 && player1Character == "Creature") {
                player2EnergyBar.value += 25;
            }
            
            //minion Shield collection mechanic
            if (sprites.readDataNumber(player, "playerNum") == 1 && player1Character == "Minion") {
                p1MinionCollectProj++;
            } else if (sprites.readDataNumber(player, "playerNum") == 2 && player2Character == "Minion") {
                p2MinionCollectProj++;
            }
            
            sprites.destroy(proj);

            return;
        }
        
        if (!sprites.readDataBoolean(proj, "hasHitAlready")) {
            //Check which player then subtracts from their health
            if (sprites.readDataNumber(player, "playerNum") == 1) {
                player1HealthBar.value -= sprites.readDataNumber(proj, "damage");
                
            } else {
                player2HealthBar.value -= sprites.readDataNumber(proj , "damage");
                
            }
            
            //Applys x velocity depending if the player is facing left or right
            if (isPlayerFacing(player, "Right")) {
                player.vx = sprites.readDataNumber(proj, "applyVx") * -1;
            } else {
                player.vx = sprites.readDataNumber(proj, "applyVx");
                
            }
            
            //Applys y velocity
            if (sprites.readDataNumber(proj, "applyVy") != 0) {
                player.vy = sprites.readDataNumber(proj, "applyVy") * -1;            
            }
            
            // If there is hitStun on this projectile then apply it
            if (sprites.readDataNumber(proj, "applyHitStun") > 0) {
                //characterAnimations.setCharacterAnimationsEnabled(sprite, false);
                
                if (sprites.readDataNumber(player, "playerNum") == 1) { 
                    if (isPlayerFacing(player, "Right")) {
                        player.setImage(player1Animation.hitStun);    
                    } else {
                        player.setImage(player1Animation.hitStunLeft);    
                    }
                } else {  
                    if (isPlayerFacing(player, "Right")) {
                        player.setImage(player2Animation.hitStun);    
                    } else {
                        player.setImage(player2Animation.hitStunLeft);    
                    }
                }
                stun(player, sprites.readDataNumber(proj, "applyHitStun"), false);
            }
            
            sprites.setDataBoolean(proj, "hasHitAlready", true);
        }

            
            //Dont destroy projectile
            if (sprites.readDataBoolean(proj, "dontDestroyOnHit") !== true) {
                sprites.destroy(proj);
            } else {
                //This is to fix projectiles from not destroying for some reason 
                timer.after(proj.lifespan, function () {
                    sprites.destroy(proj);
                })
            }
            

    }


}