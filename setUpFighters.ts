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
                    creature.creatureAnimations.jump,
                    creature.creatureAnimations.hitStun,
                    creature.creatureAnimations.bNeutral,
                    creature.creatureAnimations.bBack,
                    creature.creatureAnimations.bDown,
                    creature.creatureAnimations.walkLeft,
                    creature.creatureAnimations.jumpLeft,
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
                    minion.minionAnimations.jump,
                    minion.minionAnimations.hitStun,
                    minion.minionAnimations.bNeutral,
                    minion.minionAnimations.bBack,
                    minion.minionAnimations.bDown,
                    minion.minionAnimations.walkLeft,
                    minion.minionAnimations.jumpLeft,
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

        setUpHud(sprite, playerNum);
        sprite.setKind(SpriteKind.Player);
    }

    function setUpHud(sprite: Sprite, playerNum: number) {

        let playerHp = sprites.readDataNumber(sprite, "hp");
        let playerEnergy = sprites.readDataNumber(sprite, "characterEnergy");

        if (playerNum == 1) {
            player1HealthBar = statusbars.create(50, 5, StatusBarKind.Health);
            player1HealthBar.max = playerHp;
            player1HealthBar.value = playerHp;
            player1HealthBar.setPosition(25, 4)

            player1EnergyBar = statusbars.create(30, 4, StatusBarKind.Energy);
            player1EnergyBar.max = playerEnergy
            player1EnergyBar.value = playerEnergy;
            player1EnergyBar.setPosition(15, 10)
            
            
        } else {
            player2HealthBar = statusbars.create(50, 5, StatusBarKind.Health);
            player2HealthBar.max = playerHp;
            player2HealthBar.value = playerHp;
            player2HealthBar.setPosition(135, 4)
            player2HealthBar.setStatusBarFlag(StatusBarFlag.InvertFillDirection, true);

            player2EnergyBar = statusbars.create(30, 4, StatusBarKind.Energy);
            player2EnergyBar.max = playerEnergy
            player2EnergyBar.value = playerEnergy
            player2EnergyBar.setPosition(145, 10)
            player2EnergyBar.setStatusBarFlag(StatusBarFlag.InvertFillDirection, true);
            
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
        sprites.setDataNumber(sprite, "characterBBackEnergyCost", char.characterBBackEnergyCost);
        sprites.setDataNumber(sprite, "characterBDownEnergyCost", char.characterBDownEnergyCost);
        sprites.setDataNumber(sprite, "characterBEnergyCost", char.characterBEnergyCost);
        
        sprite.ay = char.characterGravity;
        sprite.fx = 10;

        
        sprites.setDataNumber(sprite, "characterJumpSpeed", char.characterJumpSpeed);
        sprites.setDataString(sprite,"direction", direction)

        sprite.setImage(char.image.clone());
    }


}