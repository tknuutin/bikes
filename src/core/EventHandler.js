
define([
    'src/input/InputTracker',
    'src/phys/PhysManager'
    ], function(InputTracker, PhysManager){
    var EventHandler = function(controller, worldManager, renderer){
        var self = this;
        var input;
        var observers = {};

        var init = function(){
            BIKEGLOBALS.pipe = {
                dispatchEvent: function(evt){
                    parseEvent(evt);
                },
            };

            input = new InputTracker(controller);
        };

        this.onRegisterObserver = function(data){
            if (!observers[data.name]) {
                observers[data.name] = [];
            }

            observers[data.name].push(data);
        };

        this.onRemoveObserver = function(data){
            for (var i = 0, len = observers[data.name].length; i < len; i++) {
                var observer = observers[data.name][i];
                if (observer.uid == data.uid) {
                    observers.splice(i, 1);
                    break;
                }
            }
        };

        this.onGetEntity = function(data){
            var entity = controller.getEntity(data.name);
            if (data.receiver) {
                data.receiver(entity);
            }
        };

        this.onTeleportWorld = function(){
            controller.teleportWorld();
        };

        this.onGenerateJoint = function(data){
            PhysManager.joint(worldManager.world, data.shape1, data.shape2, data.type, data.anchor);
        };

        this.onShapeCreated = function(data){
            renderer.register(data.inst);
            controller.addEntity(data.inst);
            if (data.physics) {
                controller.addPhysEntity(data.inst, data.physics);
            }
            renderer.render();
        };

        var parseEvent = function(evt){
            if (self['on' + evt.name]) {
                self['on' + evt.name](evt.data);
            }

            if (observers[evt.name] && !evt.override) {
                for (var i = 0, len = observers[data.name].length; i < len; i++) {
                    observers[data.name][i].notify(evt.data);
                };
            }
        };

        init();
    };

    return EventHandler;
});