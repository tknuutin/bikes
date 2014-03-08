
define([
    //
    ], function(){

    var PhysFactory = {};

    var def = function(val, defValue){
        return val !== undefined ? val : defValue;
    };

    var createBody = function(world, shape, fixture, options){
        var bodyDef = new b2BodyDef();
        bodyDef.AddShape(fixture);

        var abscoords = shape.getAbsoluteCoordinates();
        bodyDef.position.Set(abscoords.x, abscoords.y);

        var finalBody = world.CreateBody(bodyDef);
        shape.body = finalBody;
        shape.physics = true;
        finalBody.userData = shape;
        return finalBody;
    };

    var types = {
        ball: function(options){
            var fixture = new b2CircleDef();
            fixture.radius = def(options.radius, 10);
            return fixture;
        },
        box: function(options){
            var fixture = new b2BoxDef();
            fixture.extents.Set(options.width / 2, options.height / 2);
            return fixture;
        },
        polygon: function(options){
            var fixture = new b2PolyDef();
            fixture.vertexCount = options.vertices.length;
            for (var i = 0, len = options.vertices.length; i < len; i++) {
                var vx = options.vertices[i].x;
                var vy = options.vertices[i].y;
                fixture.vertices[i].Set(vx, vy);
            }
            return fixture;
        },

        common: function(fixture, options){
            if (options.fixed !== true) {
                fixture.density = def(options.density, 1.0);
            }

            fixture.restitution = def(options.restituion, 0.2);
            fixture.friction = def(options.friction, 10);
            return fixture;
        },
    }

    PhysFactory.create = function(world, shape, options){
        var fixture = types[options.type](options);
        return createBody(world, shape, types.common(fixture, options), options);
    };

    return PhysFactory;
});