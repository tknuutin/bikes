
define([
    'src/core/MapGenerator',
    ], function(MapGenerator){
    var BLOCKCUTOFF = 350;
    var BLOCKAVGWIDTH = 70;

    var GameMap = function(mapWidth, renderer){
        var self = this;

        var init = function(){
            self.blocks = [];
            self.mapgen = new MapGenerator({
                blockCutOff: BLOCKCUTOFF,
                blockAvgWidth: BLOCKAVGWIDTH,
            });
            renderer.registerMapGen(self.mapgen);

            while (self.mapgen.pos < mapWidth) {
                addBlock();
            }
        };

        var addBlock = function(){
            var newBlock = self.mapgen.generateBlock();
            self.blocks.push(newBlock);
            renderer.register(newBlock);
        };

        var needMoreBlocks = function(cameraX){
            return cameraX + mapWidth >= self.mapgen.pos - 100;
        };

        self.onScroll = function(cameraX){
            var need = needMoreBlocks(cameraX);
            while (need) {
                for (var i = 0, len = 5; i < len; i++) {
                    addBlock();
                }
                need = needMoreBlocks(cameraX);
            }
        };

        init();
    };

    GameMap.BLOCKCUTOFF = BLOCKCUTOFF

    return GameMap;
});