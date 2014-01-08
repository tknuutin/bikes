
define([], function(){
    var Shape = function(opts){
        var self = this;
        var options = opts || {};

        var init = function(){
            self.x = options.x !== undefined ? options.x : 0;
            self.y = options.y !== undefined ? options.y : 0;
            self.width = options.width !== undefined ? options.width : 0;
            self.height = options.height !== undefined ? options.height : 0;
        };

        this.predraw = function(ctx){
            ctx.save();
            ctx.translate(self.x, self.y);
        };

        this.postdraw = function(ctx){
            ctx.restore();
        };

        this.setPos = function(x, y){
            self.x = x;
            self.y = y;
        };

        init();
    };

    return Shape;
});