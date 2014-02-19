
define([
    'src/core/MapGenerator',
    'src/shapes/Rectangle',
    'src/shapes/Wheel',
    ], function(MapGenerator, Rectangle, Wheel){
    var BLOCKCUTOFF = 350;
    var BLOCKAVGWIDTH = 70;

    var GameMap = function(mapWidth, renderer){
        var self = this;

        var rect1;
        var rect2;
        var tire;

        var init = function(){
            self.blocks = [];
            self.mapgen = new MapGenerator({
                blockCutOff: BLOCKCUTOFF,
                blockAvgWidth: BLOCKAVGWIDTH,
            });

            while (self.mapgen.pos < mapWidth) {
                addBlock();
            }

            rect1 = new Rectangle({
                name: 'redblock',
                x: 30, y: 120, width: 50, height: 50,
                fillStyle: '#ff0055',
                physics: true,
            });

            rect2 = new Rectangle({
                name: 'redblock2',
                x: 270, y: 0, width: 100, height: 10,
                fillStyle: '#ff0000',
                physics: true,
            });
        };

        this.teleportWorld = function(amount){
            self.mapgen.teleportWorld(amount);
        };

        var addBlock = function(){
            var newBlock = self.mapgen.generateBlock();
            self.blocks.push(newBlock);
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

        this.tick = function(){
            rect1.tick();
            rect2.tick();
            //tire.tick();
        };
    };

    GameMap.BLOCKCUTOFF = BLOCKCUTOFF

    return GameMap;
});