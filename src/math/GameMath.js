
define([], function(){
    var GameMath = {};

    GameMath.randInt = function(min, max, randfunc){
        return Math.floor((randfunc !== undefined ? randfunc() : Math.random()) * (max - min + 1)) + min;
    };

    GameMath.seededRNG = function(seed){
        var seed = seed || 1;

        var randnum = function(){
            var x = Math.sin(seed++) * 10000;
            return x - Math.floor(x);
        };

        return function(min, max){
            return GameMath.randInt(min, max, randnum);
        }
    };

    return GameMath;
});