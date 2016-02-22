var config;
(function (config) {
    // Scene Constants
    var Scene = (function () {
        function Scene() {
        }
        Scene.MENU = 0;
        Scene.SLOT_MACHINE = 1;
        Scene.GAME_OVER = 2;
        return Scene;
    })();
    config.Scene = Scene;
    // Screen Constants
    var Screen = (function () {
        function Screen() {
        }
        Screen.WIDTH = 720;
        Screen.HEIGHT = 540;
        Screen.CENTER_X = 360;
        Screen.CENTER_Y = 270;
        return Screen;
    })();
    config.Screen = Screen;
    // Game Constants
    var Game = (function () {
        function Game() {
        }
        Game.FPS = 60;
        return Game;
    })();
    config.Game = Game;
    var ReelHeroes = (function () {
        function ReelHeroes() {
        }
        ReelHeroes.SUPERMAN = 38;
        ReelHeroes.BLANK = 113;
        ReelHeroes.BATMAN = 188;
        ReelHeroes.CAPITAIN = 263;
        ReelHeroes.HULK = 338;
        ReelHeroes.IRONMAN = 413;
        ReelHeroes.SPIDERMAN = 488;
        ReelHeroes.WOLVERINE = 563;
        return ReelHeroes;
    })();
    config.ReelHeroes = ReelHeroes;
})(config || (config = {}));
//# sourceMappingURL=config.js.map