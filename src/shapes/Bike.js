
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

        var init = function(){

            self.x = 0;
            self.y = 0;
            self.name = 'bike';
            self.type = 'Bike';

            self.leftTire = new Wheel({
                parent: self,
                name: 'lefttire',
                //radius: 20,
                physics: true,
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
                physics: true,
                onLoaded: function(){
                    imageLoaded();
                },
            });

            self.bikeBody = new Rectangle({
                name: 'bikebody',
                x: 100, y: 50,
                width: 60, height: 10,
                fillStyle: '#000',
                physics: true,
            });

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
            //
        };

        this.accelerate = function(amount){
            self.leftTire.setTurn(self.leftTire.turn + 2);
            self.leftTire.body.ApplyTorque(10000);
            console.log('torque now', self.leftTire.body.m_torque);
        };

        init();
    };

    return Bike;
});