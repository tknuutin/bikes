
define(['src/Shape'], function(Shape){
    var Circle = function(opts){
        var self = this;

        var init = function(){
            self.radius = opts.radius;

            Shape.call(self, opts);
        };

        this.draw = function(ctx){
            ctx.arc(self.radius, self.radius, self.radius, 0, Math.PI * 2, true);
            ctx.fillStyle = '#000';
            ctx.fill();
        };

        init();
    };

    return Circle;
});