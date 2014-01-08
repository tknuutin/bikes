
define(['src/shapes/Rectangle'], function(Rectangle){
    var Renderer = function(canvas, width, height){
        var self = this;
        var ctx;
        var renderCalled = false;
        var cameraPos = {
            x: 0, y: 0,
        };

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

        self.clear = function(){
            ctx.fillStyle = '#FFF';
            ctx.fillRect(0, 0, width, height);
        };

        var _render = function(){
            self.clear();

            ctx.save();
            ctx.translate(cameraPos.x, cameraPos.y);

            for (var i = 0, len = self.shapes.length; i < len; i++) {
                self.shapes[i].predraw(ctx);
                self.shapes[i].draw(ctx);
                self.shapes[i].postdraw(ctx);
            }
            ctx.restore();
        };

        this.scrollHorizontal = function(amount){
            cameraPos.x += amount;
            self.render();
        };

        this.createFooterBlock = function(y){
            self.shapes.push(new Rectangle({
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