namespace charSelect {

    export function displayCharSelectImg(playerNum: number, image: Image) {
        if (playerNum == 1) {
            player1.setImage(image);
        } else if (playerNum == 2) {
            player2.setImage(image);
            player2.image.flipX();
        }
    }
    
    export function createCursor1() {
        let player1Cursor = sprites.create(assets.image`Cursor`, SpriteKind.Player);
        sprites.setDataNumber(player1Cursor, "PlayerNumber", 1);
        controller.moveSprite(player1Cursor);
        player1Cursor.setPosition(40, 90);
        return player1Cursor;
    }
    export function createCursor2(){
        let player2Cursor = sprites.create(assets.image`Cursor2`, SpriteKind.Player);
        sprites.setDataNumber(player2Cursor, "PlayerNumber", 2);
        controller.player2.moveSprite(player2Cursor);
        player2Cursor.setPosition(120, 90);
        return player2Cursor;
    }


}

