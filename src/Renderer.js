
define(['src/MapBlock'], function(MapBlock){
    var Renderer = function(canvas, width, height){
        var self = this;
        var ctx;
        var renderCalled = false;

        var init = function(){
            ctx = canvas.getContext('2d');
            self.shapes = [];

            // Replace with RAF at some point I guess
            setInterval(function(){
                if (renderCalled) {
                    renderCalled = false;
                    _render();
                }
            }, 33);
        };

        var _render = function(){
            for (var i = 0, len = self.shapes.length; i < len; i++) {
                console.log('drawing', self.shapes[i].name);
                self.shapes[i].predraw(ctx);
                self.shapes[i].draw(ctx);
                self.shapes[i].postdraw(ctx);
            }
        };

        this.createFooterBlock = function(y){
            self.shapes.push(new MapBlock({
                x: 0, y: y, width: width, height: height - y
            }));
        };

        this.register = function(shape){
            self.shapes.push(shape);
        };

        this.render = function(){
            renderCalled = true;
        };

        init();
    };

    return Renderer;
});