
define(['src/entities/EntityFinder'], function(EF){
    var PageManager = function(container){
        var self = this;
        var canvas;

        var init = function(){
            canvas = document.createElement('canvas');
            canvas.setAttribute('width', '500px');
            canvas.setAttribute('height','400px');
            container.appendChild(canvas);

            initEventListeners();
            initDebugButton();
        };

        var initDebugButton = function(){
            BIKEGLOBALS.onOneClick = function(){
                console.log('hello?');
                BIKEGLOBALS.pipe.dispatchEvent({
                    name: 'TeleportWorld',
                    data: undefined,
                });
            };

            BIKEGLOBALS.onTwoClick = function(){
                var block;

                EF.find('redblock2', function(foundBlock){
                    block = foundBlock;
                });

                if (block) {
                    console.log('redblock2 pos', block.body.m_position);
                }
                else {
                    console.log('not found yet!');
                }
            };
        };

        var initEventListeners = function(){
            var buttonOne = document.getElementById('one');
            buttonOne.addEventListener('click', function(){
                if (BIKEGLOBALS.onOneClick) {
                    BIKEGLOBALS.onOneClick();
                }
            }, true);

            var buttonTwo = document.getElementById('two');
            buttonTwo.addEventListener('click', function(){
                if (BIKEGLOBALS.onTwoClick) {
                    BIKEGLOBALS.onTwoClick();
                }  
            }, true);
        };

        this.getCanvas = function(){
            return canvas;
        };

        this.getCanvasWidth = function(){
            return 500;
        };

        this.getCanvasHeight = function(){
            return 400;
        };

        init();
    };

    return PageManager;
});