

define(['src/core/Dispatcher'], function(ED){

    EntityFinder = {};

    // Find an entity with a given name and pass it to a receiving function.
    EntityFinder.find = function(name, func){
        ED.dispatch('GetEntity', {
            receiver: func,
            name: name,
        });
    };

    return EntityFinder;
});
