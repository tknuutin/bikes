

define(['src/core/Dispatcher'], function(ED){

    EntityFinder = {};

    EntityFinder.find = function(name, func){
        ED.dispatch('GetEntity', {
            receiver: func,
            name: name,
        });
    };

    return EntityFinder;
});
