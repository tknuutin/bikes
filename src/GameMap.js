
define(['src/MapPolygon'], function(MapPolygon){
    var BLOCKCUTOFF = 350;
    var BLOCKAVGWIDTH = 50;

    var GameMap = function(mapWidth, renderer){
        var self = this;

        var init = function(){
            blockAvgWidth = 50;
            self.blocks = [];

            var pos = 0;
            while (pos < mapWidth) {
                addMapBlock(pos, 200);
                pos += blockAvgWidth;
            }
        };

        var addMapBlock = function(x, y){
            var newBlock = new MapPolygon({
                x: x, y: y,
                width: BLOCKAVGWIDTH,
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