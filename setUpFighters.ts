///<reference path="./characters.ts" />
namespace fightSetup {
    export function SetUpFighters(player: string, sprite: Sprite) {
        player1.scale = 1;
        player2.scale = 1;
        let dir = (player === "player2") ? "Left" : "Right";

        switch (player) {
            case "Creature":
                characters.ApplyCharStats(sprite, creature, dir);
                break;
            case "Minion": 
                characters.ApplyCharStats(sprite, minion, dir);
                break;
            case "RainCatcher": 
                characters.ApplyCharStats(sprite, raincatcher, dir);
                break;
            case "AmongUs": 
                characters.ApplyCharStats(sprite, crewmate, dir);
                break;
            case "Codey": 
                characters.ApplyCharStats(sprite, codey, dir);
                break;
            case "Hank": 
                characters.ApplyCharStats(sprite, hank, dir);
                break;
            case "Barth": 
                characters.ApplyCharStats(sprite, barth, dir);
                break;
            case "Dot": 
                characters.ApplyCharStats(sprite, dot, dir);
                break;
            case "DarkCreature": 
                characters.ApplyCharStats(sprite, darkCreature, dir);
                break;
            default:
                characters.ApplyCharStats(sprite, creature, dir);
        }
        if (player === "player2") {
            player2.image.flipX()
        }
    }
}