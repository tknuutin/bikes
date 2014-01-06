
define([], function(){
    var PageManager = function(container){
        var self = this;
        var canvas;

        var init = function(){
            canvas = document.createElement('canvas');
            canvas.setAttribute('width', '500px');
            canvas.setAttribute('height','400px');
            container.appendChild(canvas);
        };

        this.getCanvas = function(){
            return canvas;
        };

        this.getCanvasWidth = function(){
            return 500;
        };

        this.getCanvasHeight = function(){
            return 400;
        };

        init();
    };

    return PageManager;
});