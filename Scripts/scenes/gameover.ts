// GAME_OVER SCENE
module scenes {
    export class GameOver extends objects.Scene {
        //PRIVATE INSTANCE VARIABLES ++++++++++++
        private _backgroundImage: createjs.Bitmap;
        private _startOverButton:objects.Button;
        private _gameOverLabel:objects.Label;
        
        // CONSTRUCTOR ++++++++++++++++++++++
        constructor() {
            super();
        }
        
        // PUBLIC METHODS +++++++++++++++++++++
        
        // Start Method
        public start(): void {   
            
            // add background image to the scene
            this._backgroundImage = new createjs.Bitmap(assets.getResult("GameOverBackground"));
            this.addChild(this._backgroundImage);  
            
            // add the WELCOME Label to the MENU scene
            this._gameOverLabel = new objects.Label(
                "GAME OVER", 
                "60px Consolas", 
                "#FFFFFF", 
                config.Screen.CENTER_X, 
                config.Screen.CENTER_Y - 50);
            this.addChild(this._gameOverLabel);      
                   
            // add the START button to the MENU scene
            this._startOverButton = new objects.Button(
                "StartOverButton",
                config.Screen.CENTER_X,
                config.Screen.CENTER_Y + 50, true);
            this.addChild(this._startOverButton);
            
            // START Button event listener
            this._startOverButton.on("click", this._startOverButtonClick, this);
            
            // add this scene to the global stage container
            stage.addChild(this);
        }

        // INTRO Scene updates here
        public update(): void {

        }
        
        
        //EVENT HANDLERS ++++++++++++++++++++
        
        // START Button click event handler
        private _startOverButtonClick(event: createjs.MouseEvent) {
            // Switch to the LEFT_CAVE Scene
            scene = config.Scene.SLOT_MACHINE;
            changeScene();
        }
        
    }
}