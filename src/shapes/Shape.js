
// Generic Shape superclass for anything that is drawn on the Canvas.
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

        // Register as a shape on the game world. Will not do anything if
        // noRegister flag exists on the Shape, as then will assume Shape is
        // part of another Shape and is registered through it.
        this.register = function(){
            if (!self.noRegister) {
                ED.dispatch('ShapeCreated', {
                    inst: self,
                    physics: self.physics,
                });    
            }
        };

        // Get representation as b2Vec2 instance.
        this.asVector = function(){
            return new b2Vec2(self.x, self.y);
        };

        // Get absolute coordinates by crawling upwards on Shape parent tree.
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

        // Initializes draw operations by translating and rotating.
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

        var getVertice = function(num){
            return self.body.m_shapeList.m_vertices[num];
        };

        // Finishes draw operation.
        this.postdraw = function(ctx){
            ctx.restore();
        };

        // Move Shape to x, y coordinates.
        this.setPos = function(x, y){
            self.x = x;
            self.y = y;
        };

        // Abstract function for initializing physics on a Shape.
        this.initPhysics = function(){
            return undefined;
        };

        init();
    };

    return Shape;
});