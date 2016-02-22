// MENU SCENE
module scenes {
    export class SlotMachine extends objects.Scene {
        //PRIVATE INSTANCE VARIABLES ++++++++++++
        private _backgroundImage: createjs.Bitmap;
        private _bet1Button: objects.Button;
        private _bet10Button: objects.Button;
        private _bet100Button: objects.Button;
        private _resetButton: objects.Button;
        private _quitButton: objects.Button;
        private _spinButton: objects.Button;
        
        private _reel1: objects.Reel;
        private _reel2: objects.Reel;
        private _reel3: objects.Reel;

        private _captain = 0; 
        private _ironman = 0;
        private _wolverine = 0;
        private _spiderman = 0;
        private _hulk = 0;
        private _batman = 0;
        private _superman = 0;
        private _blanks = 0;
        // CONSTRUCTOR ++++++++++++++++++++++
        constructor() {
            super();
        }
        
        // PUBLIC METHODS +++++++++++++++++++++
        
        // Start Method
        public start(): void {    
            // add background image to the scene
            this._backgroundImage = new createjs.Bitmap(assets.getResult("SlotMachine"));
            this.addChild(this._backgroundImage);
            
            
            // create reel 1
            this._reel1 = new objects.Reel(190, 246);
            this.addChild(this._reel1);
            
            // create reel 2
            this._reel2 = new objects.Reel(310, 246);
            this.addChild(this._reel2);
            
            // create reel 3
            this._reel3 = new objects.Reel(430, 246);
            this.addChild(this._reel3);
            
            
            // add Bet1Button to the scene
            this._bet1Button = new objects.Button("Bet1Button", 205, 436, false);
            this.addChild(this._bet1Button);
            this._bet1Button.on("click", this._bet1ButtonClick, this); 
            
            // add Bet10Button to the scene
            this._bet10Button = new objects.Button("Bet10Button", 315, 436, false);
            this.addChild(this._bet10Button);
            this._bet10Button.on("click", this._bet10ButtonClick, this); 
            
            // add Bet100Button to the scene
            this._bet100Button = new objects.Button("Bet100Button", 440, 436, false);
            this.addChild(this._bet100Button);
            this._bet100Button.on("click", this._bet100ButtonClick, this); 
            
            // add ResetButton to the scene
            this._resetButton = new objects.Button("ResetButton", 485, 494, false);
            this.addChild(this._resetButton);
            this._resetButton.on("click", this._resetButtonClick, this); 
            
            // add QuitButton to the scene
            this._quitButton = new objects.Button("QuitButton", 180, 494, false);
            this.addChild(this._quitButton);
            this._quitButton.on("click", this._quitButtonClick, this); 
            
            // add SpinButton to the scene
            this._spinButton = new objects.Button("SpinButton", 585, 168, false);
            this.addChild(this._spinButton);
            this._spinButton.on("click", this._spinButtonClick, this); 
        
            // Setup Background
            this._setupBackground("WhiteBackground");
           
            // FadeIn
            this._fadeIn(500);
        
            // add this scene to the global stage container
            stage.addChild(this);
        }

        // SLOT_MACHINE Scene updates here
        public update(): void {

        }
        
        //PRIVATE METHODS
        /* Utility function to check if a value falls within a range of bounds */
        private _checkRange(value: number, lowerBounds: number, upperBounds: number): number {
            return (value >= lowerBounds && value <= upperBounds) ? value : -1;
        }
        
        /* When this function is called it determines the betLine results.
        e.g. Bar - Orange - Banana */
        private _reels(): number[] {
            var betLine = [0, 0, 0];
            var outCome = [0, 0, 0];

            for (var spin = 0; spin < 3; spin++) {
                outCome[spin] = Math.floor((Math.random() * 65) + 1);
                switch (outCome[spin]) {
                    case this._checkRange(outCome[spin], 1, 27):  // 41.5% probability
                        betLine[spin] = config.ReelHeroes.BLANK;
                        this._blanks++;
                        break;
                    case this._checkRange(outCome[spin], 28, 37): // 15.4% probability
                        betLine[spin] = config.ReelHeroes.CAPITAIN;
                        this._captain++;
                        break;
                    case this._checkRange(outCome[spin], 38, 46): // 13.8% probability
                        betLine[spin] = config.ReelHeroes.IRONMAN;
                        this._ironman++;
                        break;
                    case this._checkRange(outCome[spin], 47, 54): // 12.3% probability
                        betLine[spin] = config.ReelHeroes.WOLVERINE;
                        this._wolverine++;
                        break;
                    case this._checkRange(outCome[spin], 55, 59): //  7.7% probability
                        betLine[spin] = config.ReelHeroes.SPIDERMAN;
                        this._spiderman++;
                        break;
                    case this._checkRange(outCome[spin], 60, 62): //  4.6% probability
                        betLine[spin] = config.ReelHeroes.HULK;
                        this._hulk++;
                        break;
                    case this._checkRange(outCome[spin], 63, 64): //  3.1% probability
                        betLine[spin] = config.ReelHeroes.BATMAN;
                        this._batman++;
                        break;
                    case this._checkRange(outCome[spin], 65, 65): //  1.5% probability
                        betLine[spin] = config.ReelHeroes.SUPERMAN;
                        this._superman++;
                        break;
                }
            }
            return betLine;
        }
        
        //EVENT HANDLERS ++++++++++++++++++++
        private _bet1ButtonClick(event: createjs.MouseEvent): void {
            console.log("Bet 1 Credit");
        }

        private _bet10ButtonClick(event: createjs.MouseEvent): void {
            console.log("Bet 10 Credit");
        }

        private _bet100ButtonClick(event: createjs.MouseEvent): void {
            console.log("Bet 100 Credit");
        }
        
        private _resetButtonClick(event: createjs.MouseEvent): void {
            console.log("Reset Game!");
        }
        
        private _quitButtonClick(event: createjs.MouseEvent): void {
            console.log("Quit Game!");
        }

        private _spinButtonClick(event: createjs.MouseEvent): void {
            console.log("Spin those reels!");
            var result = this._reels();
            console.log("result="+result);
            
            this._reel1.setHero(result[0]);
            this._reel2.setHero(result[1]);
            this._reel3.setHero(result[2]);
            //this._test();
        }
        
        
        private _test(): void {
            
            //createjs.Tween.get(this._reel1).to({y:-600}, 0)
            
           
        }
        
        
    }
}