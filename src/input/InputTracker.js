
// Tracks all user given input on the application. Currently only
// attaches keyboard listeners on the body.
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
        var braking = false;

        // Resolve UpArrow press down event.
        this.onUpArrowDown = function(evt){
            if (!accelerating) {
                stopAcceleration = false;
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

        // Resolve DownArrow press down event.
        this.onDownArrowDown = function(evt){
            if (!braking) {
                controller.startBrake();
                braking = true;
            }
        };

        // Resolve DownArrow up event.
        this.onDownArrowUp = function(evt){
            if (braking) {
                controller.stopBrake();
            }
            braking = false;
        };

        // Resolve UpArrow up event.
        this.onUpArrowUp = function(evt){
            stopAcceleration = true;
        };

        // Resolve LeftArrow down event.
        this.onLeftArrowDown = function(evt){
            // nothing
        };

        // Resolve LeftArrow up event.
        this.onLeftArrowUp = function(evt){
            controller.pullFront();
        };

        // Resolve RightArrow down event.
        this.onRightArrowDown = function(evt){
            // nothing
        };

        // Resolve RightArrow up event.
        this.onRightArrowUp = function(evt){
            controller.pullBack();
        };

        init();
    };

    return InputTracker;
});