
namespace CMakeNS {
    
    export class selectChar {
        private hp: number;
        private image: Image;
        
        constructor(hp: number, image: Image) {
            this.hp = hp;
            this.image = image;
        }

        public getSprite(): Image { 
            return this.image;
        } // Returns sprite name so we can set player sprite
    }

    // We can change sprite name
    // 1 = Hank
    // 2 = Rain Catcher
}
