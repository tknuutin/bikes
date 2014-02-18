
define([
    'src/core/PageManager',
    'src/core/Renderer',
    'src/core/EventHandler',
    'src/core/GameMap',
    'src/shapes/Bike',
    'src/core/Looper',
    'src/phys/PhysProxy',
    'src/entities/EntityManager',
    ], function(PageManager, Renderer, EventHandler, GameMap, Bike, Looper, PhysProxy, EntityManager){
    var GameController = function(container, canvas){
        var self = this;
        var page;
        var renderer;
        var gameMap;
        var entityManager;
        var evthandler;
        var bike;
        var world;

        var init = function(){
            
            window.BIKEGLOBALS = {};
            window.BIKEGLOBALS.stage = container;
            window.BIKEGLOBALS.stopped = false;

            worldManager = PhysProxy.getWorld();
            entityManager = new EntityManager(worldManager);
            self.rightArrowDown = false;
            self.leftArrowDown = false;

            page = new PageManager(container, canvas);
            renderer = new Renderer({
                canvas: page.getCanvas(),
                width: page.getCanvasWidth(),
                height: page.getCanvasHeight(),
                onScroll: onScroll,
            });

            evthandler = new EventHandler(self, worldManager, renderer);
            gameMap = new GameMap(500);
            renderer.enableBlockCutoff(GameMap.BLOCKCUTOFF);
            bike = new Bike();

            var looper = new Looper(self, worldManager, entityManager, renderer);
        };

        this.tick = function(){
            gameMap.tick();
            bike.tick();
        };

        var onScroll = function(cameraX){
            gameMap.onScroll(cameraX);
        };

        this.addEntity = function(entity){
            entityManager.addEntity(entity);
        };

        this.getEntity = function(name){
            return entityManager.getEntity(name);
        };

        this.start = function(){
            console.log('started!');
        };

        this.accelerate = function(amount){
            bike.accelerate(amount);
        };

        var CAMERAOFFSETX = -100;

        this.moveBike = function(direction){
            var intervalId;
            intervalId = setInterval(function(){
                if ((direction === -1 && self.leftArrowDown) || (direction === 1 && self.rightArrowDown)) {
                    var amount = 5 * direction;
                    bike.x += amount;
                    renderer.scrollHorizontallyTo(bike.x + CAMERAOFFSETX );
                }
                else {
                    clearInterval(intervalId);
                }
            }, 33);
        };

        init();
    };

    return GameController;
});