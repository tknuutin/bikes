
// Initialize game on window load and attach to canvas and container.
window.onload = function(){
    require(['src/core/GameController'], function(GameController){
        var canvas = document.getElementById('canvas');
        var container = document.getElementById('container');

        var game = new GameController(container, canvas);
        game.start();
    });
};