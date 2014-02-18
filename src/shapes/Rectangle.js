
define([
    'src/shapes/Shape',
    'src/phys/PhysProxy',
    ], function(Shape, PhysProxy){
    var Rectangle = function(opts){
        var self = this;

        var init = function(){
            Shape.call(self, opts);
            self.type = 'Rectangle';
            self.name = self.name || 'block';
            self.physdebug = true;

            self.register();
        };

        this.draw = function(ctx){
            ctx.fillStyle = opts.fillStyle || '#CED9D5';
            ctx.fillRect(-self.width / 2, -self.height / 2, self.width, self.height);
        };

        init();

        this.phystick = function(){
            if (self.physics) {
                PhysProxy.physTickRect(self);    
            }
        };

        this.tick = function(){
            // nothing here
        };
    };

    return Rectangle;
});