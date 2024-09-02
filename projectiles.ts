///<reference path="./setUpFighters.ts" />
namespace projectiles {

    export class MakeProjectile{
        public damage: number;
        public vx: number;
        public vy: number;
        public image: Image;

        public appliedVx: number;
        public appliedVy: number;

        
        public scale: number;
        public dontDestroyOnHit?: boolean;
        public lifeTime?: number;
        public appliedHitStun?: number;

        constructor(damage: number, vx: number, vy: number, image: Image, appliedVx: number, appliedVy: number, scale?: number, dontDestroyOnHit?: boolean, lifeTime?: number, appliedHitStun?: number) {
            this.damage = damage;
            this.vx = vx;
            this.vy = vy;
            this.image = image;
            this.appliedVx = appliedVx;
            this.appliedVy = appliedVy;
            // Assign default values if optional parameters are not provided
            this.scale = scale !== undefined ? scale : 1;
            this.dontDestroyOnHit = dontDestroyOnHit !== undefined ? dontDestroyOnHit : false;
            this.lifeTime = lifeTime !== undefined ? lifeTime : 8000;
            this.appliedHitStun = appliedHitStun !== undefined ? appliedHitStun : 0;

           
        }


      

       
    }

    export function MakeHitBox(proj: Sprite, xPos: number, yPos: number, scaleX: number, scaleY: number, attacheBoxToSprite?: Sprite) {
        if (sprites.readDataNumber(proj, "ownersPlayerNum") == 1) {
            if (isPlayerFacing(player1, "Right")) {
                proj.x += xPos; 
            } else {
                proj.x -= xPos; 
            }
        } else {
            if (isPlayerFacing(player2, "Right")) {
                proj.x += xPos; 
            } else {
                proj.x -= xPos; 
            }
        }

        proj.y -= yPos;

       if (!showHitBoxes) {
            proj.z = -20;
        }

        scaling.scaleByPixels(proj, scaleX, ScaleDirection.Horizontally, ScaleAnchor.Middle);      
        scaling.scaleByPixels(proj, scaleY, ScaleDirection.Vertically, ScaleAnchor.Middle);  
        if (attacheBoxToSprite != null) {
            followPlayer(proj, attacheBoxToSprite,250, -yPos + 15)
        }



    }



}