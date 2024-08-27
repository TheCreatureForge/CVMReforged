
class AnimationSetUp  {
    public walk: Image[];
    public walkLeft: Image[];

    public hitStun: Image;
    public hitStunLeft: Image;

    public bNeutral: Image[];
    public bNeutralLeft: Image[];

    public bBack: Image[];
    public bBackLeft: Image[];

    public bDown: Image[];
    public bDownLeft: Image[];
    
    
    
    
    constructor(walk: Image[], hitStun: Image, bNeutral: Image[], bBack: Image[],bDown: Image[], walkLeft?: Image[], bNeutralLeft?: Image[], bBackLeft?: Image[], bDownLeft?: Image[], hitStunLeft?: Image  ) {
        this.walk = walk;
        this.walkLeft = walkLeft !== undefined ? walkLeft: flipAnim(walk);
        

       

        this.hitStun = hitStun;
        if (hitStunLeft !== undefined) {
            this.hitStunLeft = hitStunLeft;
        } else {
            this.hitStunLeft = hitStun.clone(); 
            this.hitStunLeft.flipX(); 
        }

        
        this.bNeutral = bNeutral;
        this.bNeutralLeft = bNeutralLeft !== undefined ? bNeutralLeft : flipAnim(bNeutral);
        
        this.bBack = bBack;
        this.bBackLeft = bBackLeft !== undefined ? bBackLeft : flipAnim(bBack);

        this.bDown = bDown;
        this.bDownLeft = bDownLeft !== undefined ? bDownLeft : flipAnim(bDown);
    }


    
}

function flipAnim(anim: Image[]) {
    if (!anim || anim.length === 0) {
        return []; 
    }


    let newAnim: Image[] = [];
    for (let value of anim) {
        let flippedImage = value.clone(); 
        flippedImage.flipX();
        newAnim.push(flippedImage);
        
    }

    return newAnim;
}

function flipImage(img: Image) {
    img.flipX();
    return img;
    
}

function reverseAnimation(anim: Image[]): Image[] {
    if (!anim || anim.length === 0) {
        return [];
    }

    let newAnim: Image[] = [];
    for (let i = anim.length - 1; i >= 0; i--) {
        newAnim.push(anim[i]); // Add the images in reverse order
    }

    return newAnim;
}


function updateAnimStates() {

    if (!sprites.readDataBoolean(player1, "isStunned")) {
        animation.stopAnimation(animation.AnimationTypes.All, player1);
        if (isPlayerFacing(player1, "Right") ) {
            characterAnimations.loopFrames(player1, player1Animation.walk, 100, characterAnimations.rule(Predicate.MovingRight));
            characterAnimations.loopFrames(player1, player1Animation.walk, 100, characterAnimations.rule(Predicate.MovingLeft));
        }
        
        if (isPlayerFacing(player1, "Left")  ) {
            characterAnimations.loopFrames(player1, player1Animation.walkLeft, 100, characterAnimations.rule(Predicate.MovingRight));
            characterAnimations.loopFrames(player1, player1Animation.walkLeft, 100, characterAnimations.rule(Predicate.MovingLeft));
            
        }
        
        characterAnimations.setCharacterAnimationsEnabled(player1, true);
        
    }

    if (!sprites.readDataBoolean(player2, "isStunned")) {
        animation.stopAnimation(animation.AnimationTypes.All, player2);
        
        if (isPlayerFacing(player2, "Right")) {
            characterAnimations.loopFrames(player2, player2Animation.walk, 100, characterAnimations.rule(Predicate.MovingRight));
            characterAnimations.loopFrames(player2, player2Animation.walk, 100, characterAnimations.rule(Predicate.MovingLeft));
        }
        
        if (isPlayerFacing(player2, "Left")) {
            characterAnimations.loopFrames(player2, player2Animation.walkLeft, 100, characterAnimations.rule(Predicate.MovingRight));
            characterAnimations.loopFrames(player2, player2Animation.walkLeft, 100, characterAnimations.rule(Predicate.MovingLeft));
        }
        characterAnimations.setCharacterAnimationsEnabled(player2, true);
    }

}
