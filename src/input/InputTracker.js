
define([], function(){
    var InputTracker = function(callbacks){
        var self = this;
        var callbacks = callbacks || {};

        var init = function(){
            document.body.onkeydown = onDown;
            document.body.onkeyup = onUp;
        };

        var onDown = function(evt){
            var keyName = getKeyName(evt.which);
            var callbackName = keyName + 'Down';
            if (callbacks[callbackName]) {
                callbacks[callbackName](evt);
            }
        };

        var onUp = function(evt){
            var keyName = getKeyName(evt.which);
            var callbackName = keyName + 'Up';
            if (callbacks[callbackName]) {
                callbacks[callbackName](evt);
            }
        };

        var getKeyName = function(key) {
            switch (key) {
                case 37:
                    return 'leftArrow';
                case 38:
                    return 'upArrow';
                case 39:
                    return 'rightArrow';
                case 40:
                    return 'downArrow';
            }
        };

        init();
    };

    return InputTracker;
});