
define([
    //'path/to/Thing',
    'src/phys/PhysManager',
    ], function(PhysManager){

    var EntityManager = function(worldManager){
        var self = this;

        var init = function(){
            self.entities = [];
            self.namedEntities = {};
            self.physentities = [];
        };

        var addPhysEntity = function(entity, opts){
            PhysManager.createBody(worldManager, entity, opts);
            if (!opts.fixed) {
                self.physentities.push(entity);    
            }
        };

        this.teleportWorld = function(border){
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

        this.addPhysEntity = function(entity, opts){
            addPhysEntity(entity, opts);
                
            if (entity.shapes) {
                for (var i = 0, len = entity.shapes.length; i < len; i++) {
                    addPhysEntity(entity.shapes[i], opts);
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
        };

        this.getEntity = function(name){
            return self.namedEntities[name];
        };

        init();
    };

    return EntityManager;
});