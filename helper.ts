function stun(player: Sprite, sec: number, disableGravity: boolean) {
    //need the previous Vx because making controller vx  0 also make current vx 0 :/
    let preVx = player.vx;
    sprites.setDataBoolean(player, "isStunned", true);
    
    if (sprites.readDataNumber(player, "playerNum") == 1) {
        controller.moveSprite(player, 0, 0);
    } else {
        controller.player2.moveSprite(player, 0, 0)
    }


    if (disableGravity) {
        player.vy = 0;
        player.ay = 0;
    } else {
        player.vx = preVx;
    }

    timer.after(sec, function () {
        
        if (sprites.readDataNumber(player, "playerNum") == 1) {
            controller.moveSprite(player, sprites.readDataNumber(player, "speed"), 0)
        } else {
            controller.player2.moveSprite(player, sprites.readDataNumber(player, "speed"), 0)
        }
        
        player.ay = sprites.readDataNumber(player, "characterGravity")
        sprites.setDataBoolean(player, "isStunned", false);
        updateAnimStates();
    })
}


function isPlayerFacing(player: Sprite, dir: String) {
    return sprites.readDataString(player, "direction") == dir;
}

function getPlayerNum(player: Sprite) {
    return sprites.readDataNumber(player, "playerNum");
}

function removeEnergy(player: Sprite, num: number) {
    if (sprites.readDataNumber(player, "playerNum") == 1) {
        player1EnergyBar.value -= num;
    }else if (sprites.readDataNumber(player, "playerNum") == 2) {
        player2EnergyBar.value -= num;
    }
}

function playSong(songName: string) {
    music.stopAllSounds();
    music.setVolume(25);
    switch (songName) {
        case "MBStart":
            music.play(music.createSong(assets.song`MBStart`), music.PlaybackMode.InBackground);
            break;
        case "SmashMenu":
            music.play(music.createSong(assets.song`SmashMenu`), music.PlaybackMode.LoopingInBackground);
            break;
        case "Peace":
            music.play(music.createSong(assets.song`Peace`), music.PlaybackMode.InBackground);
            break;
        case "Cythia":
            timer.background(function () {
                music.setVolume(25);
                music.play(music.createSong(assets.song`Cythia1`), music.PlaybackMode.UntilDone);
                music.play(music.createSong(assets.song`Cythia2`), music.PlaybackMode.LoopingInBackground);
            });
            break;
        case "CVMStart":
            music.play(music.createSong(assets.song`CVMStart`), music.PlaybackMode.InBackground);
            break;
        case "MetalCrusher":
            timer.background(function () {
                music.setVolume(25);
                music.play(music.createSong(assets.song`MetalCrusher1`), music.PlaybackMode.UntilDone);
                music.setVolume(25);
                music.play(music.createSong(assets.song`MetalCrusher2`), music.PlaybackMode.LoopingInBackground);
                    
            })
            break;
        case "Aot":
            timer.background(function () {
                music.play(music.createSong(assets.song`Aot1`), music.PlaybackMode.UntilDone);
                music.play(music.createSong(assets.song`Aot2`), music.PlaybackMode.LoopingInBackground);
                
                    
            })

           
        }
        music.setVolume(75);

}

function whichPlayerAnim(player: Sprite) {
    if (sprites.readDataNumber(player, "playerNum") == 1) {
        return player1Animation;
    } else {
        return player2Animation;
    }
}

function followPlayer(projectile: Sprite, player: Sprite, speed: number, yoffset: number) {
    game.onUpdate(function () {
        //we be normalizing our speed in creature forge
        let dx = player.x - projectile.x;
        let dy = player.y - projectile.y + yoffset;
        let distance = Math.sqrt(dx * dx + dy * dy);

        projectile.vx = (dx / distance) * speed;
        projectile.vy = (dy / distance) * speed;
    });
}