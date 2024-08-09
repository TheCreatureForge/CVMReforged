///<reference path="./projectiles.ts" />

function minionA(projectile: Sprite, player: Sprite) {
    if (sprites.readDataNumber(player, "playerNum") == 1) {
        characters.ApplyCharProjStats(projectile, characters.characterProjectileList.MinionA, player);        
    } else {
        characters.ApplyCharProjStats(projectile, characters.characterProjectileList.MinionA, player);        
    }
}
