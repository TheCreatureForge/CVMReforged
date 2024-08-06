///<reference path="./importFiles.ts" />

namespace charSelect {

    
    //add a title art to come down when cursor is hovering tile, add case for each character
    function titleCardAnim(character:string, title: Sprite) {
        if (sprites.readDataString(title, "AnimState") == "Away") {
            console.log(character);
            switch (character) {
                case "Creature":
                    animation.runImageAnimation(title, assets.animation`CreatureTitleDownAnim`, 60, false);
                    break;
                case "Minion":
                    animation.runImageAnimation(title, assets.animation`MinionTitleDownAnim`, 60, false);
                    break;
                case "RainCatcher":
                    animation.runImageAnimation(title, assets.animation`RCTitleDownAnim`, 60, false);
                    break;
                case "AmongUs":
                    animation.runImageAnimation(title, assets.animation`AUTitleDownAnim`, 60, false);
                    break;
                case "DarkCreature":
                    animation.runImageAnimation(title, assets.animation`DCreatureTitleDownAnim`, 60, false);
                    break;
                case "Codey":
                    animation.runImageAnimation(title, assets.animation`CodeyTitleDownAnim`, 30, false);
                    break;
                case "Hank":
                    animation.runImageAnimation(title, assets.animation`HankTitleDownAnim`, 30, false);
                    break;
                case "Dot":
                    animation.runImageAnimation(title, assets.animation`DotTitleDownAnim`, 30, false);
                    break;

            }
            

            sprites.setDataString(title, "AnimState", "Down");
        }    
    } 



    //DO NOT TOUCH BELOW IF MAKING NEW CHARACTER
    //DO NOT TOUCH BELOW IF MAKING NEW CHARACTER
    //DO NOT TOUCH BELOW IF MAKING NEW CHARACTER
    //DO NOT TOUCH BELOW IF MAKING NEW CHARACTER
    


    //if one or both player do not select a character at the end of the time it will select the last character the hovered and start the game
    info.onCountdownEnd(function () {
        sprites.setDataBoolean(player1Cursor, "player1Ready", true);
        sprites.setDataBoolean(player2Cursor, "player2Ready", true);
        sprites.destroy(player1Cursor, effects.coolRadial, 500);  
        sprites.destroy(player2Cursor, effects.coolRadial, 500);  
        startGame();
    })


    //Start the fighting process and switched to the V.S scene
    //If you want to add more ARENA BACKGROUNDS or FIGHTING MUSIC you would add here 
    function startGame() {
        //checks if both players lock in a charcter
        if (sprites.readDataBoolean(player1Cursor, "player1Ready") == true && sprites.readDataBoolean(player2Cursor, "player2Ready") == true && stateOfGame == "Select") {
             stateOfGame = "Fight"
            info.stopCountdown();
            //Versus Card
            timer.after(1000, function () {
                tiles.setCurrentTilemap(tilemap`NULL`);
                scene.setBackgroundImage(assets.image`VsBackground`)
                Title1.setPosition(40, 9);
                Title2.setPosition(120, 9);

                //motiff for V.S Screen
                if (Math.percentChance(20)) {
                    playSong("MBStart");
                    
                } else {
                    playSong("CVMStart");
                }
                
                player1.setPosition(40, 75);
                player1.scale = 1.5;
                player2.setPosition(125, 75);
                player2.scale = 1.5;
        
                //Set up fighting arena background
                timer.after(4000, function () {
                    scene.setBackgroundImage(assets.image`Arena1Background`);
                    
                    player1.setImage(assets.image`NullImage`)
                    Title1.destroy();
                    Title2.destroy();
                    color.startFade(color.Black, color.originalPalette, 4000)
                    timer.after(3000, function () {
                        if (Math.percentChance(50)) {
                            playSong("Cythia");
                        } else {
                            playSong("MetalCrusher");
                        }
                        scroller.scrollBackgroundWithSpeed(-350,0)
                        effects.blizzard.startScreenEffect(4000)
                        
                        timer.after(753, function () {
                            //stateOfGame = "Fight"
                            scroller.scrollBackgroundWithSpeed(0, 0)
                            tiles.setCurrentTilemap(assets.tilemap`Floor`);
                            SetUpFighters()


                            controller.moveSprite(player1, sprites.readDataNumber(player1, "speed"),0)
                            controller.player2.moveSprite(player2, sprites.readDataNumber(player2, "speed"),0)
                        })
                    })



                })
            })
        }
    }

    //Displays character splash img when a cursor hovers a select tile, 
    export function displayCharSelectImg(playerNum: number, image: Image) {
        if (playerNum == 1) {
            player1.setImage(image);
        } else if (playerNum == 2) {
            player2.setImage(image);
            player2.image.flipX();
        }
    }
    
    //creates the cursor and its movement for player 1
    export function createCursor1() {
        let player1Cursor = sprites.create(assets.image`Cursor`, SpriteKind.Player1Fighter);
        sprites.setDataNumber(player1Cursor, "PlayerNumber", 1);
        sprites.setDataBoolean(player1Cursor, "player1Ready", false); 
        player1Cursor.setStayInScreen(true);
        tiles.placeOnTile(player1Cursor, tiles.getTileLocation(1,5))
        return player1Cursor;
    }

    controller.player1.onButtonEvent(ControllerButton.Right, ControllerButtonEvent.Pressed, function () {
        player1Cursor.x += 16;
    })

    controller.player1.onButtonEvent(ControllerButton.Left, ControllerButtonEvent.Pressed, function () {
        player1Cursor.x -= 16;
    })

    controller.player1.onButtonEvent(ControllerButton.Down, ControllerButtonEvent.Pressed, function () {
        player1Cursor.y += 16;
    })

    controller.player1.onButtonEvent(ControllerButton.Up, ControllerButtonEvent.Pressed, function () {
        player1Cursor.y -= 16;
    })


    
    //creates the cursor and its movement for player 2
    export function createCursor2(){
        let player2Cursor = sprites.create(assets.image`Cursor2`, SpriteKind.Player2Fighter);
        sprites.setDataNumber(player2Cursor, "PlayerNumber", 2);
        sprites.setDataBoolean(player2Cursor, "player2Ready", false);
        player2Cursor.setStayInScreen(true);
        tiles.placeOnTile(player2Cursor, tiles.getTileLocation(2,5))
        return player2Cursor;
    }

    controller.player2.onButtonEvent(ControllerButton.Right, ControllerButtonEvent.Pressed, function () {
        player2Cursor.x += 16;
    })

    controller.player2.onButtonEvent(ControllerButton.Left, ControllerButtonEvent.Pressed, function () {
        player2Cursor.x -= 16;
    })

    controller.player2.onButtonEvent(ControllerButton.Down, ControllerButtonEvent.Pressed, function () {
        player2Cursor.y += 16;
    })

    controller.player2.onButtonEvent(ControllerButton.Up, ControllerButtonEvent.Pressed, function () {
        player2Cursor.y -= 16;
    })

    //changes a var found in main.ts which hold what character a person picked, also call what tiltle card animation should play
    export function changePlayerCharacter(playerNum: number, character: string) {
        //the commented out code is when cursor were smoothly controlled (now they snap),
        //there was a bug with smooth controls this kinda fix it but ultimatly snaping was better experience 
        
        // timer.background(function () {
            // timer.throttle("changingChar", 300, function () {
                if (playerNum == 1 && player1Character != character) {                
                    player1Character = character;
                    sprites.setDataString(Title1, "AnimState", "Away");
                    titleCardAnim(character, Title1);                        
                }
    
                if (playerNum == 2 && player2Character != character) {
                    player2Character = character;
                    sprites.setDataString(Title2, "AnimState", "Away");
                    titleCardAnim(character, Title2); 
                }
            
            // })
        // })

    }


    //Locks in player1 character when the press shoot on a tile
    controller.player1.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
        if (stateOfGame == "Select") {
            music.play(music.melodyPlayable(music.beamUp), music.PlaybackMode.InBackground)
            scene.cameraShake(2, 500)
            sprites.setDataBoolean(player1Cursor, "player1Ready", true);
            startGame();
            sprites.destroy(player1Cursor, effects.coolRadial, 500);    
        }
       
    })
    

       //Locks in player2 character when the press shoot on a tile
    controller.player2.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
        if (stateOfGame == "Select") {
            sprites.setDataBoolean(player2Cursor, "player2Ready", true);
            music.play(music.melodyPlayable(music.beamUp), music.PlaybackMode.InBackground)
            scene.cameraShake(2, 500)
            startGame()
            sprites.destroy(player2Cursor, effects.coolRadial, 500);
              
        }  
    })



    // controller.player1.onButtonEvent(ControllerButton.Up, ControllerButtonEvent.Pressed, function () {
        
    //     if (stateOfGame == "Fight" && sprites.readDataNumber(player1, "characterJumpSpeed") ) {
    //         player1.vy = sprites.readDataNumber(player1, "characterJumpSpeed");
    //         //num  
    //     }
       
    // })

    // controller.player2.onButtonEvent(ControllerButton.Up, ControllerButtonEvent.Pressed, function () {
    //     if (stateOfGame == "Fight") {
    //         player2.vy = sprites.readDataNumber(player2, "characterJumpSpeed"); 
    //     }
       
    // })    




    


}

