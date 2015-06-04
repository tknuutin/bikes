
// A rectangle on the Canvas. Subclasses Shape.
define([
    'src/shapes/Shape',
    'src/phys/PhysManager',
    ], function(Shape, PhysManager){
    var Rectangle = function(opts){
        var self = this;

        var init = function(){
            Shape.call(self, opts);
            self.type = 'Rectangle';
            self.name = self.name || 'block';
            self.physics = opts.physics;
            self.register();
        };

        // Draw rectangle.
        this.draw = function(ctx){
            ctx.fillStyle = opts.fillStyle || '#CED9D5';
            ctx.fillRect(-self.width / 2, -self.height / 2, self.width, self.height);
        };

        init();

        // Initializes physics as a rectangle if physics flag was given.
        this.phystick = function(){
            if (self.physics) {
                PhysManager.physTickRect(self);    
            }
        };

        this.tick = function(){
            // nothing here
        };
    };

    return Rectangle;
});