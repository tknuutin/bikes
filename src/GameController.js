
define([
    'src/PageManager',
    'src/Renderer',
    'src/InputTracker',
    'src/GameMap',
    'src/Bike'], function(PageManager, Renderer, InputTracker, GameMap, Bike){
    var GameController = function(container, canvas){
        var self = this;
        var page;
        var renderer;
        var gameMap;
        var input;
        var bike;

        var init = function(){
            page = new PageManager(container, canvas);
            renderer = new Renderer(page.getCanvas(), page.getCanvasWidth(), page.getCanvasHeight());
            gameMap = new GameMap(500, renderer);
            input = new InputTracker();

            renderer.createFooterBlock(GameMap.BLOCKCUTOFF);
            bike = new Bike();
            renderer.register(bike);
            renderer.render();
        };

        this.start = function(){
            console.log('started!');
        };

        init();
    };

    return GameController;
});