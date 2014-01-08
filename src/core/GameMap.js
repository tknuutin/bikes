
define(['src/shapes/MapPolygon', 'src/math/GameMath'], function(MapPolygon, GMath){
    var BLOCKCUTOFF = 350;
    var BLOCKAVGWIDTH = 50;

    var GameMap = function(mapWidth, renderer){
        var self = this;

        var init = function(){
            self.blocks = [];

            var pos = 0;
            var lastY = 200;
            while (pos < mapWidth) {
                var newWidth = GMath.randInt(BLOCKAVGWIDTH - 25, BLOCKAVGWIDTH + 25);
                var newY = GMath.randInt(200 - 50, 200 + 50);
                addMapBlock(pos, lastY, newY, newWidth);
                lastY = newY;
                pos += newWidth;
            }
        };

        var addMapBlock = function(x, y, tY, width){
            var newBlock = new MapPolygon({
                x: x, y: y, tY: y,
                width: width,
                bottomCutOff: BLOCKCUTOFF
            });
            self.blocks.push(newBlock);
            renderer.register(newBlock);
        };

        init();
    };

    GameMap.BLOCKCUTOFF = BLOCKCUTOFF

    return GameMap;
});