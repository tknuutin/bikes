
// A simple wrapper over a function that limits how often it can be called.
// Takes in a function and an interval in milliseconds of how often it can
// be called. Useful for anything from the user.
//
// TODO: Remove console log and allow some sort of configuration of what
// happens when cap is reached.
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