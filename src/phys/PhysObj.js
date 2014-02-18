
define([
    //'path/to/Thing'
    ], function(){

    var PhysObj = function(opts){
        var self = this;

        var TERMINAL = 50;

        var init = function(){
            self.physics = false;
            self.physdebug = true;
            self.vector = {
                x: 0, y: 0,
            };
        };

        var applyGravity = function(vector){
            var multiplier = 33/1000;
            return {
                x: vector.x,
                y: vector.y + (9.81 * multiplier),
            };
        };

        this.applyVector = function(vector){
            self.vector.x += vector.x;
            self.vector.y += vector.y;
        };

        this.drawVector = function(ctx){
            var drawMultiplier = 5;

            ctx.save();

            ctx.translate(self.x + Math.round(self.width / 2), self.y + Math.round(self.height / 2));
            ctx.lineWidth = 5;
            ctx.strokeStyle = '#ff0000';
            ctx.beginPath();

            ctx.moveTo(0, 0);
            ctx.lineTo(self.vector.x * drawMultiplier, self.vector.y * drawMultiplier);

            ctx.closePath();
            ctx.stroke();
            ctx.restore();
        };

        this.physTick = function(){
            if (self.physics) {
                self.vector = applyGravity(self.vector);

                self.vector.y = Math.min(self.vector.y, TERMINAL);

                self.x += self.vector.x;
                self.y += self.vector.y;
            }
        };

        init();
    };

    return PhysObj;
});