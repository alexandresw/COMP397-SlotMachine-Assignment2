module config {

    // Scene Constants
    export class Scene {
        public static MENU: number = 0;
        public static SLOT_MACHINE: number = 1;
        public static GAME_OVER: number = 2;
    }
    
    
    // Screen Constants
    export class Screen {
        public static WIDTH: number = 720;
        public static HEIGHT: number = 540;
        public static CENTER_X: number = 360;
        public static CENTER_Y: number = 270;
    }
    
    // Game Constants
    export class Game {
        public static FPS: number = 60;
    }
    
    export class ReelHeroes {
        public static SUPERMAN  : number = 38;
        public static BLANK     : number = 113;
        public static BATMAN    : number = 188;
        public static CAPITAIN  : number = 263;
        public static HULK      : number = 338;
        public static IRONMAN   : number = 413;
        public static SPIDERMAN : number = 488;
        public static WOLVERINE : number = 563;
    }
}