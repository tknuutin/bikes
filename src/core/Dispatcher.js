

define([], function(){
    var Dispatcher = {};

    Dispatcher.dispatch = function(name, data){
        BIKEGLOBALS.pipe.dispatchEvent({
            name: name,
            data: data,
        });
    };

    return Dispatcher;
});