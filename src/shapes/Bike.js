
define(['src/shapes/Shape', 'src/shapes/Circle', 'src/shapes/Rectangle'], function(Shape, Circle, Rectangle){
    var Bike = function(opts){
        var self = this;
        opts = opts || {};

        var init = function(){

            opts.x = 220;
            opts.y = 150;

            Shape.call(self, opts);

            self.leftTire = new Circle({
                radius: 20,
                x: -30, y: 10,
            });

            self.rightTire = new Circle({
                radius: 20,
                x: 30, y: 10
            });

            self.bikeBody = new Rectangle({
                x: -10, y: 15,
                width: 60, height: 10,
                fillStyle: '#000'
            })

            self.shapes = [self.leftTire, self.rightTire, self.bikeBody]
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