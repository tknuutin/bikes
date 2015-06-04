
// A circle in the Canvas.
define(['src/shapes/Shape'], function(Shape){
    var Circle = function(opts){
        var self = this;

        var init = function(){
            self.radius = opts.radius;

            Shape.call(self, opts);

            self.register();
        };

        // Draw circle.
        this.draw = function(ctx){
            ctx.beginPath();
            ctx.arc(self.radius, self.radius, self.radius, 0, Math.PI * 2, true);
            ctx.fillStyle = '#000';
            ctx.fill();
            ctx.closePath();
        };

        init();
    };

    return Circle;
});