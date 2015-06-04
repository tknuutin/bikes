
// Physics manager class for managing box2d physics.

define([
    'src/phys/PhysFactory',
    ], function(PhysFactory){

    var PhysManager = {};

    // Physics tick for a generic object.
    PhysManager.physTick = function(obj){
        obj.x = obj.body.m_position.x;
        obj.y = obj.body.m_position.y;
        obj.rotation = obj.body.GetRotation() % (Math.PI * 2);
    };

    // Physics tick for a rectangular object.
    PhysManager.physTickRect = function(rect){
        PhysManager.physTick(rect);
    };

    // Physics tick for a circular object.
    PhysManager.physTickCircle = function(circle){
        PhysManager.physTick(circle);
    };

    // Create world.
    PhysManager.getWorld = function(){
        var worldAABB = new b2AABB();
        worldAABB.minVertex.Set(-1000, -1000);
        worldAABB.maxVertex.Set(3000, 1000);
        var gravity = new b2Vec2(0, 700);
        var doSleep = true;
        var world = new b2World(worldAABB, gravity, doSleep);

        var ground = world.CreateBody(PhysManager.createGround(world));

        BIKEGLOBALS.physstopped = false;

        return {
            world: world,
            ground: ground,
        }
    };

    // Create ground. 
    PhysManager.createGround = function(){
        var groundSd = new b2BoxDef();
        groundSd.extents.Set(1000, 300);
        //groundSd.density = 1.0;
        groundSd.restitution = 0.2;
        var groundBd = new b2BodyDef();
        groundBd.AddShape(groundSd);
        groundBd.position.Set(-500, 600);

        return groundBd;
    };

    var createMapPolygon = function(world, polygon){
        var polySd = new b2PolyDef();

        polySd.vertexCount = 4;
        polySd.vertices[0].Set(0, 0);
        polySd.vertices[1].Set(polygon.width, (polygon.tY - polygon.y) / 1);
        polySd.vertices[2].Set(polygon.width, 100);
        polySd.vertices[3].Set(0, 100);

        var polyBd = new b2BodyDef();
        polyBd.AddShape(polySd);
        polyBd.position.Set(polygon.x, polygon.y);

        polygon.body = world.CreateBody(polyBd);
    };

    // Loaned from box2d - create world box.
    function createBox(world, rect) {
        var boxSd = new b2BoxDef();
        boxSd.density = 1.0;
        boxSd.friction = 0.5;
        //console.log(rect.width, rect.height);
        boxSd.extents.Set(rect.width / 2, rect.height / 2);
        var boxBd = new b2BodyDef();
        boxBd.AddShape(boxSd);
        var abscoords = rect.getAbsoluteCoordinates();
        boxBd.position.Set(abscoords.x, abscoords.y);

        var boxBody = world.CreateBody(boxBd);
        rect.body = boxBody;
        rect.physics = true;
        boxBody.userData = rect;
        return boxBody;
    }

    var createBall = function(world, circle){
        
        ballSd.density = 1.0;

        var tranlatedRadius = circle.radius;
        ballSd.radius = tranlatedRadius;
        ballSd.restitution = 0.2;
        ballSd.friction = 10000000;
        var ballBd = new b2BodyDef();
        ballBd.AddShape(ballSd);
        var abscoords = circle.getAbsoluteCoordinates();
        ballBd.position.Set(abscoords.x, abscoords.y);
        
        var ballBody = world.CreateBody(ballBd);
        circle.body = ballBody;
        circle.physics = true;
        ballBody.userData = circle;
        console.log(circle.body);
    };

    // Create a joint between two shapes.
    PhysManager.joint = function(world, shape1, shape2, type, anchor){
        //console.log('joint:', shape1, shape2, type, anchor);
        var joint;
        if (type == 'revolute') {
            joint = new b2RevoluteJointDef();
        }
        else {
            throw new Error('Joint type not recognized!');
        }

        joint.body1 = shape1.body;
        joint.body2 = shape2.body;
        joint.anchorPoint = anchor;

        var created = world.CreateJoint(joint);
        shape1.joint = created;
        shape2.joint = created;
    };

    // Create a physics body.
    PhysManager.createBody = function(worldManager, shape, options){
        PhysFactory.create(worldManager.world, shape, options);
    };

    return PhysManager;
});