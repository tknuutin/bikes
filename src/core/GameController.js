
define([
    'src/core/PageManager',
    'src/core/Renderer',
    'src/input/InputTracker',
    'src/core/GameMap',
    'src/shapes/Bike'], function(PageManager, Renderer, InputTracker, GameMap, Bike){
    var GameController = function(container, canvas){
        var self = this;
        var page;
        var renderer;
        var gameMap;
        var input;
        var bike;
        
        var leftArrowDown = false;
        var rightArrowDown = false;

        var init = function(){
            page = new PageManager(container, canvas);
            renderer = new Renderer(page.getCanvas(), page.getCanvasWidth(), page.getCanvasHeight());
            gameMap = new GameMap(500, renderer);
            input = new InputTracker({
                leftArrowDown: onLeftArrowDown,
                leftArrowUp: onLeftArrowUp,
                rightArrowDown: onRightArrowDown,
                rightArrowUp: onRightArrowUp,
            });

            renderer.enableBlockCutoff(GameMap.BLOCKCUTOFF);
            bike = new Bike();
            renderer.register(bike);
            renderer.render();
        };

        this.start = function(){
            console.log('started!');
        };

        var CAMERAOFFSETX = -100;

        var moveBike = function(direction){
            var intervalId;
            intervalId = setInterval(function(){
                if ((direction === -1 && leftArrowDown) || (direction === 1 && rightArrowDown)) {
                    var amount = 5 * direction;
                    bike.x += amount;
                    renderer.scrollHorizontallyTo(bike.x + CAMERAOFFSETX );
                }
                else {
                    clearInterval(intervalId);
                }
            }, 33);
        };

        var onLeftArrowDown = function(evt){
            // Can only scroll in one direction at a time
            if (!leftArrowDown && !rightArrowDown) {
                moveBike(-1);
            }
            leftArrowDown = true;
        };

        var onLeftArrowUp = function(evt){
            leftArrowDown = false;
        };

        var onRightArrowDown = function(evt){
            if (!rightArrowDown) {
                moveBike(1);
            }
            rightArrowDown = true;
        };

        var onRightArrowUp = function(evt){
            rightArrowDown = false;
        };

        init();
    };

    return GameController;
});