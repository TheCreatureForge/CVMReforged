namespace CMakeNS {
    
    export class selectChar {
        public hp: number;
        public speed: number;
        public jumpCount: number;
        public characterDamage: number;
        public characterGravity: number;
        public characterJumpSpeed: number;
        public image: Image;
        
        public deathAnim: Image[];
        public winAnim: Image[];
        
        
        constructor(hp: number, speed: number, jumpCount: number, characterDamage: number, characterGravity: number, characterJumpSpeed: number, image: Image ) {
            this.hp = hp;
            this.speed = speed;
            this.jumpCount = jumpCount;
            this.characterDamage = characterDamage;
            this.characterGravity = characterGravity;
            this.characterJumpSpeed = characterJumpSpeed;
            this.image = image;
            //this.deathAnim = image;
            //this.winAnim = image;
        }

       
    }

   
}



