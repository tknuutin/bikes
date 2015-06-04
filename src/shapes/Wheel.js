
// A game object describing the bike wheel that can accelerate and rotate.
define([
    'src/shapes/Shape',
    'src/phys/PhysManager'
    ], function(Shape, PhysManager){
    var Wheel = function(opts){
        var self = this;

        var maxTurn = 20;

        var init = function(){
            Shape.call(self, opts);

            self.physics = opts.physics !== undefined ? opts.physics : {};
            self.physics.type = 'ball';
            

            //self.physics = true;
            self.type = 'Wheel';

            self.img = new Image();
            self.img.onload = function(){
                self.turn = 0;
                self.width = 50;
                self.height = 50;
                
                self.radius = Math.round(self.width / 2);
                self.physics.radius = self.width / 2;
                self.rotation = 0;

                self.register();

                if (opts.onLoaded) {
                    opts.onLoaded.call(self);    
                }
                
            };

            self.img.src = 'assets/img/wheel3.png';
        };

        // Calculate physics tick for this wheel, which is a rotating circle.
        this.phystick = function(){
            PhysManager.physTickCircle(self);
        };

        // Game logic tick for this wheel, currently empty.
        this.tick = function(){
            //console.log(self.name);
            
            //console.log('torque', self.body.m_torque);
        };

        this.draw = function(ctx){
            ctx.translate(-self.width / 2, -self.height / 2);
            ctx.beginPath();
            ctx.drawImage(self.img, 0, 0, self.img.width, self.img.height, 0, 0, self.width, self.height);
            ctx.closePath();
        };

        init();
    };

    return Wheel;
});