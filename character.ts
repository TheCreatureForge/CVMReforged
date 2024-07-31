///<reference path="./CharacterMake.ts" />
//hp,Image
namespace characters {
    export const characterList = {
        Creature: new CMakeNS.selectChar(200, assets.image`Cursor`),
        Hank: new CMakeNS.selectChar(100,assets.image`Cursor`),
        Rain: new CMakeNS.selectChar(150,assets.image`Cursor`)
    };

}