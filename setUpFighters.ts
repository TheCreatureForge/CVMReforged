///<reference path="./creature.ts" />
///<reference path="./minion.ts" />
namespace fightSetup {

    export function SetUpFighters(player: string, playerNum:number, sprite: Sprite) {
        player1.scale = 1;
        player2.scale = 1;
        let dir = (playerNum == 2) ? "Left" : "Right";
        let ani: AnimationSetUp = null;

        switch (player) {
            case "Creature":
                ApplyCharStats(sprite, creature.creatureStats, dir);
                ani = new AnimationSetUp(
                    creature.creatureAnimations.walk,
                    creature.creatureAnimations.hitStun,
                    creature.creatureAnimations.bNeutral,
                    creature.creatureAnimations.bBack,
                    creature.creatureAnimations.bDown,
                    creature.creatureAnimations.walkLeft,
                    creature.creatureAnimations.bNeutralLeft,
                    creature.creatureAnimations.bBackLeft,
                    creature.creatureAnimations.bDownLeft,
                    creature.creatureAnimations.hitStunLeft
                )
                break;
            case "Minion": 
                ApplyCharStats(sprite, minion.minionStats, dir);
                ani = new AnimationSetUp(
                    minion.minionAnimations.walk,
                    minion.minionAnimations.hitStun,
                    minion.minionAnimations.bNeutral,
                    minion.minionAnimations.bBack,
                    minion.minionAnimations.bDown,
                    minion.minionAnimations.walkLeft,
                    minion.minionAnimations.bNeutralLeft,
                    minion.minionAnimations.bBackLeft,
                    minion.minionAnimations.bDownLeft,
                    minion.minionAnimations.hitStunLeft
                )
                break;
        }

        if (playerNum == 1) {
            player1Animation = ani;
            
        } else {
            player2Animation = ani;   
            player2.image.flipX();
        }

        sprite.setKind(SpriteKind.Player);
    }

//DO NOT TOUCH BELOW IF MAKING NEW CHARACTER
//DO NOT TOUCH BELOW IF MAKING NEW CHARACTER
//DO NOT TOUCH BELOW IF MAKING NEW CHARACTER
//DO NOT TOUCH BELOW IF MAKING NEW CHARACTER



    export function setUpHud(sprite: Sprite) {
        let tempImage: Image;

        switch ((getPlayerNum(sprite) == 1) ? player1WinCount : player2WinCount) {
            case 1:
                tempImage = assets.image`WhiteBoard1`.clone();
                break;
            case 2:
                tempImage = assets.image`WhiteBoard2`.clone();
                break;
            default:
                tempImage = assets.image`WhiteBoard0`.clone();
                break;

        }

        if (getPlayerNum(sprite) == 1) {
            Title1.setImage(tempImage);
            Title1.x = 25;
            Title1.y = 37;
            Title1.z = -5
        } else {
            Title2.setImage(flipImage(tempImage));
            Title2.x = 135;
            Title2.y = 37;
            Title2.z = -5;

        }



        let playerHp = sprites.readDataNumber(sprite, "hp");
        let playerEnergy = sprites.readDataNumber(sprite, "characterEnergy");

        if (getPlayerNum(sprite) == 1) {
            player1HealthBar = statusbars.create(50, 5, StatusBarKind.Health);
            player1HealthBar.max = playerHp;
            player1HealthBar.value = playerHp;
            player1HealthBar.setPosition(25, 4)
            player1HealthBar.z = -4;

            player1EnergyBar = statusbars.create(30, 4, StatusBarKind.Energy);
            player1EnergyBar.max = playerEnergy
            player1EnergyBar.value = playerEnergy;
            player1EnergyBar.setPosition(15, 11);
            player1EnergyBar.z = -4;
            
            
        } else {
            player2HealthBar = statusbars.create(50, 5, StatusBarKind.Health);
            player2HealthBar.max = playerHp;
            player2HealthBar.value = playerHp;
            player2HealthBar.setPosition(135, 4)
            player2HealthBar.setStatusBarFlag(StatusBarFlag.InvertFillDirection, true);
            player2HealthBar.z = -4;
            

            player2EnergyBar = statusbars.create(30, 4, StatusBarKind.Energy);
            player2EnergyBar.max = playerEnergy
            player2EnergyBar.value = playerEnergy
            player2EnergyBar.setPosition(145, 11)
            player2EnergyBar.setStatusBarFlag(StatusBarFlag.InvertFillDirection, true);
            player2EnergyBar.z = -4;
            
        }

    }

    export function ApplyCharProjStats(proj: Sprite, projStats: projectiles.MakeProjectile, projOwner: Sprite) {
        proj.y += 16; // Offset because of size of sprites
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
        
        sprites.setDataNumber(proj, "applyVx", projStats.appliedVx);
        sprites.setDataNumber(proj, "applyVy", projStats.appliedVy);
        sprites.setDataNumber(proj, "applyHitStun", projStats.appliedHitStun);


        


    }

    export function ApplyCharStats(sprite: Sprite, char:CMakeNS.selectChar, direction: string) {
        sprites.setDataNumber(sprite, "hp", char.hp);
        sprites.setDataNumber(sprite, "speed", char.speed);
        sprites.setDataNumber(sprite, "jumpCount", char.jumpCount);
        
        sprites.setDataNumber(sprite, "characterGravity", char.characterGravity);
        sprites.setDataNumber(sprite, "characterEnergy", char.characterEnergy);
        sprites.setDataNumber(sprite, "characterAEnergy", char.characterAEnergyCost);
        sprites.setDataNumber(sprite, "characterBBackEnergyCost", char.characterBackBEnergyCost);
        sprites.setDataNumber(sprite, "characterBDownEnergyCost", char.characterDownBEnergyCost);
        sprites.setDataNumber(sprite, "characterBEnergyCost", char.characterBEnergyCost);


        sprites.setDataBoolean(sprite, "isStunned", false);
        
        sprite.ay = char.characterGravity;
        sprite.fx = 10;

        
        sprites.setDataNumber(sprite, "characterJumpSpeed", char.characterJumpSpeed);
        sprites.setDataString(sprite,"direction", direction)

        sprite.setImage(char.image.clone());
    }


}