
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

        self.startDebug = function(ctx){
            self.saves = 0;
            self.restores = 0;
            if (self.debug) {
                self.cachedTranslate = ctx.translate;
                ctx.translate = function(x, y){
                    console.log('translating to', x, y);
                    self.cachedTranslate.call(ctx, x, y);
                };

                self.cachedRestore = ctx.restore;
                ctx.restore = function(){
                    self.restores++;
                    self.cachedRestore.call(ctx);
                };

                self.cachedSave = ctx.save;
                ctx.save = function(){
                    self.saves++;
                    self.cachedSave.call(ctx);
                };
                console.log('--- STARTDRAW ---');
            }
        };

        self.stopDebug = function(){
             if (self.debug) {
                console.log('--- ENDDRAW ---');
                if (self.saves !== self.restores) console.log('UNEVEN SAVES/RESTORES!', saves, restores);

                ctx.restore = self.cachedRestore;
                ctx.translate = self.cachedTranslate;
                self.cachedRestore = null;
                self.cachedTranslate = null;   
                ctx.save = self.cachedSave;
                self.cachedSave = null; 
            }
        };

        var _render = function(){
            self.clear();
            self.startDebug(ctx);
            
            ctx.save();
            ctx.translate(-cameraPos.x, -cameraPos.y);

            for (var i = 0, len = self.shapes.length; i < len; i++) {
                self.shapes[i].predraw(ctx);
                self.shapes[i].draw(ctx);
                self.shapes[i].postdraw(ctx);
            }
            
            ctx.restore();
            fillEmptySpace();
            self.stopDebug(ctx);
           
        };

        var fillEmptySpace = function(){
            
            if (self.fillAfter !== undefined) {
                ctx.save();
                ctx.fillStyle = '#CED9D5';
                ctx.fillRect(0, self.fillAfter, width, height - self.fillAfter);
                ctx.restore();
            }
        };

        this.enableBlockCutoff = function(y){
            self.fillAfter = y;
        };

        this.scrollHorizontallyTo = function(x){
            cameraPos.x = x;
            self.render();
        };

        this.scrollHorizontal = function(amount){
            cameraPos.x += amount;
            self.render();
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