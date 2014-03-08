
define([
    'src/core/PageManager',
    'src/core/Renderer',
    'src/core/EventHandler',
    'src/core/GameMap',
    'src/shapes/Bike',
    'src/core/Looper',
    'src/phys/PhysManager',
    'src/entities/EntityManager',
    'src/utils/CappedFunction'
    ], function(PageManager, Renderer, EventHandler, GameMap, Bike, Looper, PhysManager, EntityManager, CappedFunction){
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

            worldManager = PhysManager.getWorld();
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

            self.pullFront = new CappedFunction(self.pullFront, 600);
            self.pullBack = new CappedFunction(self.pullBack, 600);
        };

        this.tick = function(){
            gameMap.tick();
            bike.tick();

            

            renderer.scrollHorizontallyTo(bike.x + CAMERAOFFSETX );

            if (bike.x > 1500) {
                evthandler.onTeleportWorld();
            }
        };

        this.teleportWorld = function(){
            entityManager.teleportWorld(1500);
            gameMap.teleportWorld(1500);
        };

        var onScroll = function(cameraX){
            gameMap.onScroll(cameraX);
        };

        this.addEntity = function(entity){
            entityManager.addEntity(entity);
        };

        this.addPhysEntity = function(entity, physics){
            entityManager.addPhysEntity(entity, physics);
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

        this.pullFront = function(){
            bike.pullFront();
        };

        this.pullBack = function(){
            bike.pullBack();
        };

        this.startBrake = function(){
            bike.startBrake();
        };

        this.stopBrake = function(){
            bike.stopBrake();
        };

        init();
    };

    return GameController;
});