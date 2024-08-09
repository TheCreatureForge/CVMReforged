namespace CMakeNS {
    
    export class selectChar {
        public hp: number;
        public speed: number;
        public jumpCount: number;

        public characterEnergy: number;
        public characterAEnergyCost: number;
        public characterBBackEnergyCost: number;
        public characterBDownEnergyCost: number;
        public characterBEnergyCost: number;

        public characterGravity: number;
        public characterJumpSpeed: number;
        public image: Image;
        
        public deathAnim: Image[];
        public winAnim: Image[];
        
        
        constructor(hp: number, speed: number, jumpCount: number,characterEnergy: number, characterAEnergyCost: number, characterBBackEnergyCost: number, characterBDownEnergyCost: number,characterBEnergyCost: number, characterGravity: number, characterJumpSpeed: number, image: Image ) {
            this.hp = hp;
            this.speed = speed;
            this.jumpCount = jumpCount;
            this.characterEnergy = characterEnergy;

            this.characterAEnergyCost = characterAEnergyCost;
            this.characterBBackEnergyCost = characterBBackEnergyCost;
            this.characterBDownEnergyCost = characterBDownEnergyCost;
            this.characterBEnergyCost = characterBEnergyCost;

            this.characterGravity = characterGravity;
            this.characterJumpSpeed = characterJumpSpeed;
            this.image = image;
            //this.deathAnim = image;
            //this.winAnim = image;
        }

       
    }

   
}



