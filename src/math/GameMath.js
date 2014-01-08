
define([], function(){
    var GameMath = {};

    GameMath.randInt = function(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    return GameMath;
});