
define(['src/Shape'], function(Shape){
    var MapBlock = function(opts){
        var self = this;

        var init = function(){
            Shape.call(self, opts);
            self.name = 'block';
        };

        this.draw = function(ctx){
            ctx.fillStyle = '#CED9D5'
            ctx.fillRect(0, 0, self.width, self.height);
        };

        init();
    };

    return MapBlock;
});