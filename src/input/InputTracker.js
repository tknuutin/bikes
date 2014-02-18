
define([], function(){
    var InputTracker = function(controller){
        var self = this;

        var init = function(){
            document.body.onkeydown = onDown;
            document.body.onkeyup = onUp;
        };

        var onDown = function(evt){
            var keyName = getKeyName(evt.which);
            var callbackName = 'on' + keyName + 'Down';
            if (self[callbackName]) {
                self[callbackName](evt);
            }
        };

        var onUp = function(evt){
            var keyName = getKeyName(evt.which);
            var callbackName = 'on' + keyName + 'Up';
            if (self[callbackName]) {
                self[callbackName](evt);
            }
        };

        var getKeyName = function(key) {
            switch (key) {
                case 37:
                    return 'LeftArrow';
                case 38:
                    return 'UpArrow';
                case 39:
                    return 'RightArrow';
                case 40:
                    return 'DownArrow';
                default:
                    return 'Unknown'
            }
        };

        var stopAcceleration = false;
        var accelerating = false;

        this.onUpArrowDown = function(evt){
            if (!accelerating) {
                controller.accelerate();
                accelerating = true;

                var accelInterval;
                accelInterval = setInterval(function(){
                    if (!stopAcceleration) {
                        controller.accelerate(5);
                    }
                    else {
                        stopAcceleration = false;
                        accelerating = false;
                        clearInterval(accelInterval);
                    }
                }, 33);    
            }
            
        };

        this.onUpArrowUp = function(evt){
            stopAcceleration = true;
        };

        this.onLeftArrowDown = function(evt){
            // Can only scroll in one direction at a time
            if (!controller.leftArrowDown && !controller.rightArrowDown) {
                controller.moveBike(-1);
            }
            controller.leftArrowDown = true;
        };

        this.onLeftArrowUp = function(evt){
            controller.leftArrowDown = false;
        };

        this.onRightArrowDown = function(evt){
            if (!controller.rightArrowDown) {
                controller.moveBike(1);
            }
            controller.rightArrowDown = true;
        };

        this.onRightArrowUp = function(evt){
            controller.rightArrowDown = false;
        };

        init();
    };

    return InputTracker;
});