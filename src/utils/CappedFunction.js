

define([
    //'path/to/Thing'
    ], function(){

    var CappedFunction = function(func, interval){
        var self = this;
        interval = interval || 1000;

        var lastCall = null;

        var onCalled = function(){
            var context = this;

            if (lastCall === null || (Date.now() - interval) >= lastCall) {
                lastCall = Date.now();
                return func.apply(context, arguments);
            }
            else {
                console.log('capped!');
            }
        };

        return onCalled;
    };

    return CappedFunction;
});