
define([], function(){
    var InputTracker = function(callbacks){
        var self = this;

        var init = function(){
            document.body.onkeydown = onDown;
            document.body.onkeyup = onUp;
        };

        var onDown = function(evt){
            console.log('down', getKeyName(evt.which));
        };

        var onUp = function(evt){
            console.log('up', getKeyName(evt.which));
        };

        var getKeyName = function(key) {
            switch (key) {
                case 37:
                    return 'left arrow';
                case 38:
                    return 'up arrow';
                case 39:
                    return 'right arrow';
                case 40:
                    return 'down arrow';
            }
        };

        init();
    };

    return InputTracker;
});