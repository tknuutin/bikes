
// Generic math utilities.
define([], function(){
    var GameMath = {};

    // Get random integer in a range, with an optional RNG argument.
    GameMath.randInt = function(min, max, randfunc){
        return Math.floor((randfunc !== undefined ? randfunc() : Math.random()) * (max - min + 1)) + min;
    };

    // Generate a seeded ranged RNG function from a given seed.
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