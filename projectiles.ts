///<reference path="./setUpFighters.ts" />
namespace projectiles {

    export class MakeProjectile{
        public damage: number;
        public vx: number;
        public vy: number;
        public image: Image;
        
        public scale: number;
        public dontDestroyOnHit: boolean;
        public lifeTime: number;

        constructor(damage: number, vx: number, vy: number, image: Image, scale?: number, dontDestroyOnHit?: boolean, lifeTime?: number) {
            this.damage = damage;
            this.vx = vx;
            this.vy = vy;
            this.image = image;
            
            // Assign default values if optional parameters are not provided
            this.scale = scale !== undefined ? scale : 1;
            this.dontDestroyOnHit = dontDestroyOnHit !== true ? dontDestroyOnHit : false;
            this.lifeTime = lifeTime !== undefined ? lifeTime : 10000;

            
        }

      

       
    }





}