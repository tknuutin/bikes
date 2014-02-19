
define([
    //'path/to/Thing',
    'src/phys/PhysProxy',
    ], function(PhysProxy){

    var EntityManager = function(worldManager){
        var self = this;

        var init = function(){
            self.entities = [];
            self.namedEntities = {};
            self.physentities = [];
        };

        var addPhysEntity = function(entity){
            PhysProxy.createBody(worldManager, entity);
            self.physentities.push(entity);  
        };

        this.teleportWorld = function(border){
            console.log('helloouuuu');
            var entities = self.entities;
            for (var i = 0, len = entities.length; i < len; i++) {
                var entity = entities[i];
                entity.x -= border;

                if (entity.body) {
                    var pos = entity.body.GetCenterPosition();
                    var rotation = entity.body.GetRotation();
                    entity.body.SetCenterPosition(new b2Vec2(pos.x - border, pos.y), rotation);
                    //console.log('physobj set to', pos.x - border);  
                }
            }
        };

        this.addEntity = function(entity){
            self.entities.push(entity);

            if (entity.name) {
                var name = entity.name;
                if (self.namedEntities[name]) {
                    throw new Error('Entity with name ' + name + ' already exists.');
                }
                else {
                    self.namedEntities[name] = entity;
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
            return self.namedEntities[name];
        };

        init();
    };

    return EntityManager;
});