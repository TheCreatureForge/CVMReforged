///<reference path="./characterStats.ts" />
///<reference path="./creature.ts" />
namespace fightSetup {

    export function SetUpFighters(player: string, playerNum:number, sprite: Sprite) {
        player1.scale = 1;
        player2.scale = 1;
        let dir = (playerNum == 2) ? "Left" : "Right";
        //hello world
        switch (player) {
            case "Creature":
                characters.ApplyCharStats(sprite, creature.exportStats() , dir);
                break;
            case "Minion": 
                characters.ApplyCharStats(sprite, characters.characterList.Minion, dir);
                break;
            // case "RainCatcher": 
            //     characters.ApplyCharStats(sprite, characters.characterList.Raincatcher, dir);
            //     break;
            // case "AmongUs": 
            //     characters.ApplyCharStats(sprite, characters.characterList.Crewmate, dir);
            //     break;
            // case "Codey": 
            //     characters.ApplyCharStats(sprite, characters.characterList.Codey, dir);
            //     break;
            // case "Hank": 
            //     characters.ApplyCharStats(sprite, characters.characterList.Hank, dir);
            //     break;
            // case "Barth": 
            //     characters.ApplyCharStats(sprite, characters.characterList.Barth, dir);
            //     break;
            // case "Dot": 
            //     characters.ApplyCharStats(sprite, characters.characterList.Dot, dir);
            //     break;
            // case "DarkCreature": 
            //     characters.ApplyCharStats(sprite, characters.characterList.DarkCreature, dir);
            //     break;
            // default:
            //     characters.ApplyCharStats(sprite, characters.characterList.Creature, dir);
        }
        if (dir === "Left") {
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
}