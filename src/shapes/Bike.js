
define(['src/shapes/Shape', 'src/shapes/Circle', 'src/shapes/Rectangle'], function(Shape, Circle, Rectangle){
    var Bike = function(opts){
        var self = this;
        opts = opts || {};

        var init = function(){

            opts.x = 100;
            opts.y = 50;
            self.name = 'bike';

            Shape.call(self, opts);

            self.leftTire = new Circle({
                name: 'lefttire',
                radius: 20,
                x: 0, y: 00,
            });

            self.rightTire = new Circle({
                name: 'righttire',
                radius: 20,
                x: 60, y: 00
            });

            self.bikeBody = new Rectangle({
                name: 'bikebody',
                x: 20, y: 5,
                width: 60, height: 10,
                fillStyle: '#000'
            })

            self.shapes = [self.leftTire, self.rightTire, self.bikeBody]
        };

        this.draw = function(ctx){
            ctx.fillStyle = '#ff0000';
            ctx.fillRect(0, 0, 5, 5);
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