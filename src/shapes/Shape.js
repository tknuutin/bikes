
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
                    inst: self,
                    physics: self.physics,
                });    
            }
        };

        this.asVector = function(){
            return new b2Vec2(self.x, self.y);
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

        var getVertice = function(num){
            return self.body.m_shapeList.m_vertices[num];
        };

        this.postdraw = function(ctx){
            ctx.restore();

            // if (self.type === 'MapPolygon') {
            //     ctx.save();
            //     ctx.beginPath();
            //     ctx.lineWidth = 2;
            //     ctx.strokeStyle = '#ff0000';
            //     //ctx.translate(self.x, self.y);
            //     //console.log(self.body);
            //     ctx.translate(self.body.m_position.x, self.body.m_position.y);
            //     ctx.moveTo(getVertice(0).x , getVertice(0).y);
            //     //console.log('moved to', getVertice(0).x, getVertice(0).y);
            //     //throw 'sefs'
            //     //console.log(self.body);
            //     //throw 'ssf'
            //     ctx.lineTo(getVertice(1).x , getVertice(1).y)
            //     ctx.lineTo(getVertice(2).x , getVertice(2).y)
                
            //     ctx.closePath();
            //     ctx.stroke();
            //     ctx.restore();
            // }
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