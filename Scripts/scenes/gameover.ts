// INTRO SCENE
module scenes {
    export class GameOver extends objects.Scene {
        //PRIVATE INSTANCE VARIABLES ++++++++++++
        private _introImage: createjs.Bitmap;
        private _startOverButton: objects.Button;
        private _gameOverLabel: objects.Label;
        
        // CONSTRUCTOR ++++++++++++++++++++++
        constructor() {
            super();
        }
        
        // PUBLIC METHODS +++++++++++++++++++++
        
        // Start Method
        public start(): void {
            // add Intro Image
            this._introImage = new createjs.Bitmap(assets.getResult("IntroCave"));
            this.addChild(this._introImage);
            
            this._gameOverLabel = new objects.Label("Game Over", "60px Consolas", "#000", 
                config.Screen.CENTER_X,
                config.Screen.CENTER_Y
            );
            this.addChild(this._gameOverLabel);
            
            
            
            // add the Start button to the MENU scene
            this._startOverButton = new objects.Button(
                "StartOverButton",
                config.Screen.CENTER_X,
                config.Screen.CENTER_Y + 180);
            this.addChild(this._startOverButton);
            
            // Start Button event listener
            this._startOverButton.on("click", this._startOverButtonClick, this);
           
            
            // add this scene to the global stage container
            stage.addChild(this);
        }

        // INTRO Scene updates here
        public update(): void {

        }
        
        
        //EVENT HANDLERS ++++++++++++++++++++
        
        // Start Button click event handler
        private _startOverButtonClick(event: createjs.MouseEvent) {
            // Switch to the LEFT_CAVE Scene
            scene = config.Scene.MENU;
            changeScene();
        }
        

    }
}