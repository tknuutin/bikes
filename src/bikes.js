
window.onload = function(){
    require(['src/GameController'], function(GameController){
        var canvas = document.getElementById('canvas');
        var container = document.getElementById('container');

        var game = new GameController(container, canvas);
        game.start();
    });
};