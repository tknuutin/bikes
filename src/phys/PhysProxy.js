

define([
    //''
    ], function(){

    var PhysProxy = {};

    PhysProxy.physTick = function(obj){
        obj.x = obj.body.m_position.x;
        obj.y = obj.body.m_position.y;
        obj.rotation = obj.body.GetRotation() % Math.PI;
    };

    PhysProxy.physTickRect = function(rect){
        PhysProxy.physTick(rect);
    };

    PhysProxy.physTickCircle = function(circle){
        PhysProxy.physTick(circle);
    };

    PhysProxy.getWorld = function(){
        var worldAABB = new b2AABB();
        worldAABB.minVertex.Set(-1000, -1000);
        worldAABB.maxVertex.Set(1000, 1000);
        var gravity = new b2Vec2(0, 700);
        var doSleep = true;
        var world = new b2World(worldAABB, gravity, doSleep);

        //createBox(world, 0, 125, 10, 250);
        //createBox(world, { x: 50, y: 200, width: 10, height: 50 });

        var ground = world.CreateBody(PhysProxy.createGround(world));

        BIKEGLOBALS.physstopped = false;

        var foo = world.CreateBody;
        world.CreateBody = function(){
            return foo.apply(world, arguments);
        };

        return {
            world: world,
            ground: ground,
        }
    };

    PhysProxy.createGround = function(){
        var groundSd = new b2BoxDef();
        groundSd.extents.Set(1000, 300);
        //groundSd.density = 1.0;
        groundSd.restitution = 0.2;
        var groundBd = new b2BodyDef();
        groundBd.AddShape(groundSd);
        groundBd.position.Set(-500, 600);

        return groundBd;
    };

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
        var ballSd = new b2CircleDef();
        ballSd.density = 1.0;

        var tranlatedRadius = circle.radius;
        ballSd.radius = tranlatedRadius;
        ballSd.restitution = 0.2;
        ballSd.friction = 0.2;
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

    var createBikePhys = function(world, bike){
        createBall(world, bike.leftTire);
        // createBall(world, bike.rightTire);
        // createBox(world, bike.bikeBody);

        // var leftJoint = new b2RevoluteJointDef();
        // leftJoint.body1 = bike.leftTire.body;
        // leftJoint.body2 = bike.bikeBody.body;
        // leftJoint.anchorPoint = bike.leftTire.body.GetCenterPosition();
        // world.CreateJoint(leftJoint);

        // var rightJoint = new b2RevoluteJointDef();
        // rightJoint.body1 = bike.rightTire.body;
        // rightJoint.body2 = bike.bikeBody.body;
        // rightJoint.anchorPoint = bike.rightTire.body.GetCenterPosition();
        // world.CreateJoint(rightJoint);
    };

    PhysProxy.joint = function(world, shape1, shape2, type, anchor){
        console.log('joint:', shape1, shape2, type, anchor);
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
        world.CreateJoint(joint);
    };

    PhysProxy.createBody = function(worldManager, shape){
        if (shape.type === 'Wheel') {
            console.log('ball physics');
            createBall(worldManager.world, shape);
        }

        if (shape.type === 'Rectangle') {
            createBox(worldManager.world, shape);
        }

        if (shape.type === 'Bike') {
            console.log('bike physics!!');
            createBikePhys(worldManager.world, shape);
        }
    };

    return PhysProxy;
});