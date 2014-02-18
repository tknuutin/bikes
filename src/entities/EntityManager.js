
define([
    //'path/to/Thing',
    'src/phys/PhysProxy',
    ], function(PhysProxy){

    var EntityManager = function(worldManager){
        var self = this;

        var init = function(){
            self.entities = {};
            self.physentities = [];
        };

        var addPhysEntity = function(entity){
            PhysProxy.createBody(worldManager, entity);
            self.physentities.push(entity);  
        };

        this.addEntity = function(entity){
            if (entity.name) {
                var name = entity.name;
                if (self.entities[name]) {
                    throw new Error('Entity with name ' + name + ' already exists.');
                }
                else {
                    self.entities[name] = entity;
                }
            }

            if (entity.physics) {
                addPhysEntity(entity);
                
                if (entity.shapes) {
                    for (var i = 0, len = entity.shapes.length; i < len; i++) {
                        addPhysEntity(entity.shapes[i]);
                    }
                }
            }
        };

        this.getEntity = function(name){
            return self.entities[name];
        };

        init();
    };

    return EntityManager;
});