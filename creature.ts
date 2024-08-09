///<reference path="./projectiles.ts" />
///<reference path="./characterStats.ts" />
namespace creature{

    export function exportStats() {
        
        const creatureStats =  new CMakeNS.selectChar(
            200,        //hp
            60,         //speed
            2,          //jumnCount
            200,        //Total Energy
            20,         //A Energy Cost
            0,          //B-Back Energy Cost
            0,          //B-Down Energy Cost
            0,          //B Energy Cost
            350,        //character gravity
            -120,       //characterJumpSpeed
            assets.image`CreatureModel` //Image
        )
        return creatureStats;
    }
    
    const creatureAProjectile =  new projectiles.MakeProjectile(
        7,      //Damage
        100,     //vx
        0,      //vy            
        assets.image`CreatureProj`
    )
    
    
    
    export function creatureA(projectile: Sprite, player: Sprite) {
        characters.ApplyCharProjStats(projectile, creatureAProjectile, player);     
    }

    

}


