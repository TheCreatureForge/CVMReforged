namespace CMakeNS {
    
    export class selectChar {
        public hp: number;
        public speed: number;
        public jumpCount: number;

        public characterEnergy: number;
        public characterAEnergyCost: number;
        public characterBackBEnergyCost: number;
        public characterDownBEnergyCost: number;
        public characterForwardBEnergyCost: number;
        public characterBEnergyCost: number;

        public characterGravity: number;
        public characterJumpSpeed: number;
        public image: Image;
        
        public deathAnim: Image[];
        public winAnim: Image[];
        
        
        constructor(hp: number, speed: number, jumpCount: number,characterEnergy: number, characterAEnergyCost: number, characterBBackEnergyCost: number, characterBDownEnergyCost: number,characterForwardBEnergyCost: number,characterBEnergyCost: number, characterGravity: number, characterJumpSpeed: number, image: Image ) {
            this.hp = hp;
            this.speed = speed;
            this.jumpCount = jumpCount;
            this.characterEnergy = characterEnergy;

            this.characterAEnergyCost = characterAEnergyCost;
            this.characterBackBEnergyCost = characterBBackEnergyCost;
            this.characterDownBEnergyCost = characterBDownEnergyCost;
            this.characterBEnergyCost = characterBEnergyCost;
            this.characterForwardBEnergyCost = characterForwardBEnergyCost;

            this.characterGravity = characterGravity;
            this.characterJumpSpeed = characterJumpSpeed;
            this.image = image;
        }

       
    }

   
}



