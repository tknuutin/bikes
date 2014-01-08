
define(['src/shapes/Shape'], function(Shape){
    var MapPolygon = function(opts){
        var self = this;
        var bottomCutOff;

        var init = function(){
            bottomCutOff = opts.bottomCutOff;
            Shape.call(self, opts);
            self.debug = false;
            self.name = 'polygon' + self.x + '.' + self.y;
            self.tY = opts.tY;
            
            self.points = [];

            // Default polygon is vertical line
            self.points.push({
                x: 0, y: 0,
            });
            self.points.push({
                x: self.width, y: self.tY - self.y,
            });
        };

        this.draw = function(ctx){
            ctx.beginPath();
            ctx.moveTo(0, 0);

            var currPoint;
            for (var i = 1, len = self.points.length; i < len; i++) {
                currPoint = self.points[i];
                ctx.lineTo(currPoint.x, currPoint.y);
            }

            ctx.lineTo(currPoint.x, bottomCutOff - self.y);
            ctx.lineTo(0, bottomCutOff - self.y);
            ctx.closePath();

            ctx.strokeStyle = '#9F8CA8';
            ctx.fillStyle = '#CED9D5'
            ctx.stroke();
            ctx.fill();
        };

        init();
    };

    return MapPolygon;
});