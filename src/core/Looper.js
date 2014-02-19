
define([], function(){
    var Looper = function(controller, worldManager, entityManager, renderer){
        var self = this;

        var init = function(){
            self.stopped = false;

            // Replace with RAF at some point I guess
            setInterval(function(){
                window.requestAnimationFrame(function(){

                    if (!BIKEGLOBALS.stopped) {
                        if (!BIKEGLOBALS.physstopped) {
                            worldManager.world.Step((1.0/60), 1);
                        }

                        var physentities = entityManager.physentities;
                        for (var i = 0, len = physentities.length; i < len; i++) {
                            physentities[i].phystick();
                        }

                        self.tick();
                    }
                });
            }, 33);
            
        };

        this.tick = function(){
            controller.tick();
            renderer.render();
        };

        init();
    };

    return Looper;
});