
define(['src/Shape', 'src/Circle'], function(Shape, Circle){
    var Bike = function(opts){
        var self = this;
        opts = opts || {};

        var init = function(){

            opts.x = 40;
            opts.y = 10;

            Shape.call(self, opts);

            self.leftTire = new Circle({
                radius: 20,
                x: -30, y: 10,
            });

            self.rightTire = new Circle({
                radius: 20,
                x: 30, y: 10
            });

            self.bikeBody = 

            self.shapes = [self.leftTire, self.rightTire]
        };

        this.draw = function(ctx){
            for (var i = 0, len = self.shapes.length; i < len; i++) {
                self.shapes[i].predraw(ctx);
                self.shapes[i].draw(ctx);
                self.shapes[i].postdraw(ctx);
            }
        };

        init();
    };

    return Bike;
});