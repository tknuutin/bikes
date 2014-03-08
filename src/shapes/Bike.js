
define([
    'src/shapes/Wheel',
    'src/shapes/Rectangle',
    'src/core/Dispatcher',

    ], function(Wheel, Rectangle, ED){
    var Bike = function(opts){
        var self = this;
        opts = opts || {};

        var loaded = 0;
        var LOADS;
        var MAX_ANGULAR = 30;

        var init = function(){

            self.x = 0;
            self.y = 0;
            self.name = 'bike';
            self.type = 'Bike';

            self.leftTire = new Wheel({
                parent: self,
                name: 'lefttire',
                //radius: 20,
                x: 50, y: 50,
                onLoaded: function(){
                    imageLoaded();
                },
            });

            LOADS = 2;

            self.rightTire = new Wheel({
                name: 'righttire',
                //radius: 20,
                x: 130, y: 50,
                onLoaded: function(){
                    imageLoaded();
                },
            });

            self.bikeBody = new Rectangle({
                name: 'bikebody',
                x: 100, y: 50,
                width: 60, height: 10,
                fillStyle: '#000',
                physics: {
                    type: 'box',
                    width: 60, height: 10,
                },
            });

            //setInterval(function(){
            //    console.log('bike at', self.x);
            //    console.log('tire mpos', self.leftTire.body.m_position.x);
            //}, 2000);

            self.shapes = [self.leftTire, self.rightTire, self.bikeBody];
            //
        };

        var finalizePhysics = function(){
            ED.dispatch('GenerateJoint', {
                shape1: self.leftTire,
                shape2: self.bikeBody,
                anchor: self.leftTire.body.GetCenterPosition(),
                type: 'revolute',
            });

            ED.dispatch('GenerateJoint', {
                shape1: self.rightTire,
                shape2: self.bikeBody,
                anchor: self.rightTire.body.GetCenterPosition(),
                type: 'revolute',
            });
        };

        var imageLoaded = function(){
            loaded++;
            if (loaded >= LOADS) {
                if (opts.onLoaded) {
                    opts.onLoaded();    
                }
                finalizePhysics();
            }
        };

        this.tick = function(){
            for (var i = 0, len = self.shapes.length; i < len; i++) {
                self.shapes[i].tick();
            }

            self.x = self.leftTire.x;
            self.y = self.leftTire.y;
        };

        var getFrontTireNormal = function(direction, multiplier){
            var x2 = self.rightTire.x;
            var x1 = self.bikeBody.x;
            var y2 = self.rightTire.y;
            var y1 = self.bikeBody.y;
            var dx = x2 - x1;
            var dy = y2 - y1;

            var impulse = new b2Vec2(dy * direction, dx * (direction * -1));
            impulse.Multiply(multiplier * 100);
            return impulse;
        };

        this.pullFront = function(){
            self.rightTire.body.ApplyImpulse(getFrontTireNormal(1, 200), self.rightTire.asVector());
            self.leftTire.body.ApplyImpulse(getFrontTireNormal(-1, 200), self.leftTire.asVector());  
        };

        this.pullBack = function(){
            self.leftTire.body.ApplyImpulse(getFrontTireNormal(1, 150), self.leftTire.asVector());
            self.rightTire.body.ApplyImpulse(getFrontTireNormal(-1, 150), self.rightTire.asVector());
        };

        this.accelerate = function(amount){
            var angularVelocity = self.leftTire.body.GetAngularVelocity();
            if (angularVelocity < MAX_ANGULAR) {
                self.leftTire.body.ApplyTorque(40000000);
            }
        };

        this.startBrake = function(){
            self.leftTire.body.SetAngularVelocity(0);
            self.leftTire.joint.m_enableLimit = true;

            self.leftTire.body.m_shapeList.m_friction = 1000000000000000;
        };

        this.stopBrake = function(){
            self.leftTire.body.m_shapeList.m_friction = 10000000;
            self.leftTire.joint.m_enableLimit = false;
        };

        init();
    };

    return Bike;
});