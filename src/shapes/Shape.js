
define(['src/core/Dispatcher'], function(ED){
    var Shape = function(opts){
        var self = this;
        var options = opts || {};

        var init = function(){
            self.name = self.name || options.name;
            self.x = options.x !== undefined ? options.x : 0;
            self.y = options.y !== undefined ? options.y : 0;
            self.width = options.width !== undefined ? options.width : 0;
            self.height = options.height !== undefined ? options.height : 0;
            self.parent = options.parent;
            self.rotation = 0;
            self.rotationPointX = 0;
            self.rotationPointY = 0;
            self.noRegister = options.noRegister;
            self.debug = options.debug;
            self.physics = options.physics !== undefined ? options.physics : false;        
        };

        this.register = function(){
            if (!self.noRegister) {
                ED.dispatch('ShapeCreated', {
                    inst: self
                });    
            }
        };

        this.getAbsoluteCoordinates = function(){
            var parent = self.parent;

            var x = self.x;
            var y = self.y;
            while (parent) {
                x += parent.x;
                y += parent.y;
                parent = parent.parent;
            }
            return { x: x, y: y };
        };

        this.predraw = function(ctx){
            ctx.save();

            ctx.translate(self.x, self.y);
            if (self.rotation !== 0) {

                ctx.translate(self.rotationPointX, self.rotationPointY);
                //console.log('rotating:', self.rotation);
                ctx.rotate(self.rotation);
                ctx.translate(-self.rotationPointX, -self.rotationPointY);
            }
        };

        this.postdraw = function(ctx){
            ctx.restore();

            if (self.physics && self.body && self.physdebug) {
                //self.drawVector(ctx);
                ctx.save();
                ctx.fillStyle = '#ff0055';

                // X, Y
                ctx.fillRect(self.body.m_position.x - 2, self.body.m_position.y - 2, 4, 4);

                // Center
                var centerPos = self.body.GetCenterPosition();
                //console.log('centerpos', centerPos.x, centerPos.y);//    'topleft', self.body.m_position.x, self.body.m_position.y);
                ctx.fillRect(centerPos.x - 10, centerPos.y - 10, 4, 4);
                ctx.restore();
            }
        };

        this.setPos = function(x, y){
            self.x = x;
            self.y = y;
        };

        this.initPhysics = function(){
            return undefined;
        };

        init();
    };

    return Shape;
});