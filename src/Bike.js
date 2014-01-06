
define(['src/Circle'], function(Circle){
    var Bike = function(opts){
        var self = this;
        opts = opts || {};

        var init = function(){
            self.leftTire = new Circle({
                radius: 30,
                x: 10, y: 10,
            });

            self.rightTire = new Circle({
                radius: 30,
                x: 70, y: 10
            });
        };

        init();
    };

    return Bike;
});