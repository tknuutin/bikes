
define([
    'src/math/GameMath',
    'src/shapes/MapPolygon',
    ], function(GMath, MapPolygon){
    var MapGenerator = function(config){
        var self = this;
        var conf = config || {};

        var init = function(){
            self.pos = 0;
            self.lastY = 200;
        };

        self.generateBlock = function(){
            var newWidth = GMath.randInt(conf.blockAvgWidth - 25, conf.blockAvgWidth + 25);
            var newY = GMath.randInt(200 - 50, 200 + 50);
            var newBlock = getNewBlock(self.pos, self.lastY, newY, newWidth);
            self.lastY = newY;
            self.pos += newWidth;
            return newBlock;
        };

        var getNewBlock = function(x, y, tY, width){
            return new MapPolygon({
                x: x, y: y, tY: tY,
                width: width,
                bottomCutOff: conf.blockCutOff
            });
        };

        init();
    };

    return MapGenerator;
});