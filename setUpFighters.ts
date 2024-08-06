///<reference path="./characters.ts" />
namespace fightSetup {
    export function SetUpFighters(player: string, sprite: Sprite) {
        player1.scale = 1;
        player2.scale = 1;
        let dir = (player === "player2") ? "Left" : "Right";

        switch (player) {
            case "Creature":
                characters.ApplyCharStats(sprite, characters.characterList.Creature, dir);
                break;
            case "Minion": 
                characters.ApplyCharStats(sprite, characters.characterList.Minion, dir);
                break;
            case "RainCatcher": 
                characters.ApplyCharStats(sprite, characters.characterList.Raincatcher, dir);
                break;
            case "AmongUs": 
                characters.ApplyCharStats(sprite, characters.characterList.Crewmate, dir);
                break;
            case "Codey": 
                characters.ApplyCharStats(sprite, characters.characterList.Codey, dir);
                break;
            case "Hank": 
                characters.ApplyCharStats(sprite, characters.characterList.Hank, dir);
                break;
            case "Barth": 
                characters.ApplyCharStats(sprite, characters.characterList.Barth, dir);
                break;
            case "Dot": 
                characters.ApplyCharStats(sprite, characters.characterList.Dot, dir);
                break;
            case "DarkCreature": 
                characters.ApplyCharStats(sprite, characters.characterList.DarkCreature, dir);
                break;
            default:
                characters.ApplyCharStats(sprite, characters.characterList.Creature, dir);
        }

       
    }
}