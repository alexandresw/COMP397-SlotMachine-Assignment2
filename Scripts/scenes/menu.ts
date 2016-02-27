// MENU SCENE
module scenes {
    export class Menu extends objects.Scene {
        //PRIVATE INSTANCE VARIABLES ++++++++++++
        private _backgroundImage: createjs.Bitmap;
        private _startButton: objects.Button;
        
        // CONSTRUCTOR ++++++++++++++++++++++
        constructor() {
            super();
        }
        
        // PUBLIC METHODS +++++++++++++++++++++
        
        // Start Method
        public start(): void {   

            // add background image to the scene
            this._backgroundImage = new createjs.Bitmap(assets.getResult("MenuBackground"));
            this.addChild(this._backgroundImage); 

            // add the START button to the MENU scene
            this._startButton = new objects.Button(
                "StartButton",
                config.Screen.CENTER_X + 20,
                config.Screen.CENTER_Y + 120, true);
            this.addChild(this._startButton);
            
            // START Button event listener
            this._startButton.on("click", this._startButtonClick, this);
           
            // Setup Background
            this._setupBackground("WhiteBackground");
           
            // FadeIn
            this._fadeIn(500);
           
            // add this scene to the global stage container
            stage.addChild(this);
        }

        // INTRO Scene updates here
        public update(): void {

        }
        
        
        //EVENT HANDLERS ++++++++++++++++++++
        
        // START Button click event handler
        private _startButtonClick(event: createjs.MouseEvent) {
            //FadeOut 
            this._fadeOut(500, () => {
                // Switch to the LEFT_CAVE Scene
                scene = config.Scene.SLOT_MACHINE;
                changeScene();
            });
        }

    }
}