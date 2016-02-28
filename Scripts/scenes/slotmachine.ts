// MENU SCENE
module scenes {
    export class SlotMachine extends objects.Scene {
        //PRIVATE INSTANCE VARIABLES ++++++++++++
        private _backgroundImage: createjs.Bitmap;
        private _slotmachineImage: createjs.Bitmap;
        private _bet1Button: objects.Button;
        private _bet10Button: objects.Button;
        private _bet100Button: objects.Button;
        private _resetButton: objects.Button;
        private _quitButton: objects.Button;
        private _spinButton: objects.Button;
        
        private _bet1ButtonListener;
        private _bet10ButtonListener;
        private _bet100ButtonListener;
        private _spinButtonListener;
        
        private _reel1: objects.Reel;
        private _reel2: objects.Reel;
        private _reel3: objects.Reel;
        
        private _playerMoneyLabel: createjs.Text;
        private _winnerLabel: createjs.Text;
        
        private _spinning: boolean;
        
        private _playerMoney: number;
        private _winnings: number;
        private _jackpot: number;
        private _turn: number;
        private _playerBet: number;
        private _winNumber: number;
        private _lossNumber: number;
        private _captain: number; 
        private _ironman: number;
        private _wolverine: number;
        private _spiderman: number;
        private _hulk: number;
        private _batman: number;
        private _superman: number;
        private _blanks: number;
        // CONSTRUCTOR ++++++++++++++++++++++
        constructor() {
            super();
        }
        
        // PUBLIC METHODS +++++++++++++++++++++
        
        // Start Method
        public start(): void {    

            // add background image to the scene
            this._backgroundImage = new createjs.Bitmap(assets.getResult("SlotMachineBackground"));
            this.addChild(this._backgroundImage);

            // add slotmachine image to the scene
            this._slotmachineImage = new createjs.Bitmap(assets.getResult("SlotMachine"));
            this.addChild(this._slotmachineImage);
            
            // create reel 1
            this._reel1 = new objects.Reel(1, 190, 246);
            this.addChild(this._reel1);
            
            // create reel 2
            this._reel2 = new objects.Reel(2, 310, 246);
            this.addChild(this._reel2);
            
            // create reel 3
            this._reel3 = new objects.Reel(3, 430, 246);
            this.addChild(this._reel3);
            this._reel3.on('reelCompleted', this._reelsCompleted, this);
            
            // add PlayerMoney text
            this._playerMoneyLabel = new createjs.Text(this._paddingLeft("0", 5), "20px Monaco", "#0F0");
            this._playerMoneyLabel.x = 408;
            this._playerMoneyLabel.y = 198;
            this._playerMoneyLabel.lineWidth = config.Screen.WIDTH - 40;
            this.addChild(this._playerMoneyLabel);
            
            // add PlayerMoney text
            this._winnerLabel = new createjs.Text(this._paddingLeft("0", 5), "20px Monaco", "#0F0");
            this._winnerLabel.x = 250;
            this._winnerLabel.y = 198;
            this._winnerLabel.lineWidth = config.Screen.WIDTH - 40;
            this.addChild(this._winnerLabel);
            
            
            // add Bet1Button to the scene
            this._bet1Button = new objects.Button("Bet1Button", 205, 436, false);
            this.addChild(this._bet1Button);
            
            // add Bet10Button to the scene
            this._bet10Button = new objects.Button("Bet10Button", 315, 436, false);
            this.addChild(this._bet10Button);
            
            // add Bet100Button to the scene
            this._bet100Button = new objects.Button("Bet100Button", 440, 436, false);
            this.addChild(this._bet100Button);
            
            // add ResetButton to the scene
            this._resetButton = new objects.Button("ResetButton", 485, 494, false);
            this.addChild(this._resetButton);
            this._resetButton.on("click", this._resetButtonClick, this);
            
            // add QuitButton to the scene
            this._quitButton = new objects.Button("QuitButton", 180, 494, false);
            this.addChild(this._quitButton);
            this._quitButton.on("click", this._quitButtonClick, this);
            
            // add SpinButton to the scene
            this._spinButton = new objects.Button("SpinButton", 585, 172, false);
            this.addChild(this._spinButton);
            this._spinButton.removeAllEventListeners();
            
            this._initialize();
            
            this._spinning = false;
            this._updateButtons();
        
            // add this scene to the global stage container
            stage.addChild(this);
        }

        // SLOT_MACHINE Scene updates here
        public update(): void {
            
        }
        
        //PRIVATE METHODS
        
        private _updateButtons(){
            
            var bet1Button = false;
            var bet10Button = false;
            var bet100Button = false;
            var spinButton = false;
            
            if( !this._spinning ) {
                if(this._playerMoney >= 1) bet1Button = true;
                if(this._playerMoney >= 10) bet10Button = true;
                if(this._playerMoney >= 100) bet100Button = true;
                if(this._playerBet > 0) spinButton = true;
            }
            
            this._bet1Button.off("click", this._bet1ButtonListener);
            this._bet10Button.off("click", this._bet10ButtonListener);
            this._bet100Button.off("click", this._bet100ButtonListener);
            this._spinButton.off("click", this._spinButtonListener);
            
            
            
            if(bet1Button) {
                this._bet1ButtonListener = this._bet1Button.on("click", this._bet1ButtonClick, this);
                this._playerBet == 1? this._bet1Button.pressed() : this._bet1Button.enabled();
            } else {
                this._bet1Button.disabled();
            }
            
            if(bet10Button) {
                this._bet10ButtonListener = this._bet10Button.on("click", this._bet10ButtonClick, this);
                this._playerBet == 10? this._bet10Button.pressed() : this._bet10Button.enabled();
            } else {
                this._bet10Button.disabled();
            }
            
            if(bet100Button) {
                this._bet100ButtonListener = this._bet100Button.on("click", this._bet100ButtonClick, this);
                this._playerBet == 100? this._bet100Button.pressed() : this._bet100Button.enabled();
            } else {
                this._bet100Button.disabled();
            }
            
            if(spinButton) {
                this._spinButtonListener = this._spinButton.on("click", this._spinButtonClick, this);
                this._spinButton.enabled();
            } else {
                this._spinButton.disabled();
            }
        }
        
        /* Initialize game variables */
        private _initialize(): void {
            this._resetAll();
            
            // set initial heroes position
            var result = this._reels();
            this._reel1.setHero(result[0]);
            this._reel2.setHero(result[1]);
            this._reel3.setHero(result[2]);
            
            // set game labels
            this._winnerLabel.text = this._paddingLeft(""+this._winnings, 5);
            this._playerMoneyLabel.text = this._paddingLeft(""+this._playerMoney, 5);
        }
        
        /* Utility function to reset all Heroes tallies */
        private _resetHeroesTally() {
            this._captain = 0;
            this._ironman = 0;
            this._wolverine = 0;
            this._spiderman = 0;
            this._hulk = 0;
            this._batman = 0;
            this._superman = 0;
            this._blanks = 0;
        }

        /* Utility function to reset the player stats */
        private _resetAll() {
            this._playerMoney = 500;
            this._winnings = 0;
            this._jackpot = 5000;
            this._turn = 0;
            this._playerBet = 0;
            this._winNumber = 0;
            this._lossNumber = 0;
            this._resetHeroesTally();
        }
        
        /* Check to see if the player won the jackpot */
        private _checkJackPot(): void {
            /* compare two random values */
            var jackPotTry = Math.floor(Math.random() * 51 + 1);
            var jackPotWin = Math.floor(Math.random() * 51 + 1);
            if (jackPotTry == jackPotWin) {
                alert("You Won the $" + this._jackpot + " Jackpot!!");
                this._playerMoney += this._jackpot;
                this._jackpot = 1000;
            }
        }
        
        /* Utility function to show a win message and increase player money */
        private _showWinMessage() {
            this._playerMoney += this._winnings;
            console.log("You Won: $" + this._winnings);
            this._resetHeroesTally();
            this._checkJackPot();
        }

        /* Utility function to show a loss message and reduce player money */
        private _showLossMessage() {
            this._playerMoney -= this._playerBet;
            console.log("You Lost!");
            this._resetHeroesTally();
        }
        
        /* Utility function to check if a value falls within a range of bounds */
        private _checkRange(value: number, lowerBounds: number, upperBounds: number): number {
            return (value >= lowerBounds && value <= upperBounds) ? value : -1;
        }
        
        /* When this function is called it determines the betLine results.  */
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
        
        /* This function calculates the player's winnings, if any */
        private _determineWinnings(): void {
            if (this._blanks == 0)
            {
                if (this._captain == 3) {
                    this._winnings = this._playerBet * 10;
                }
                else if(this._ironman == 3) {
                    this._winnings = this._playerBet * 20;
                }
                else if (this._wolverine == 3) {
                    this._winnings = this._playerBet * 30;
                }
                else if (this._spiderman == 3) {
                    this._winnings = this._playerBet * 40;
                }
                else if (this._hulk == 3) {
                    this._winnings = this._playerBet * 50;
                }
                else if (this._batman == 3) {
                    this._winnings = this._playerBet * 75;
                }
                else if (this._superman == 3) {
                    this._winnings = this._playerBet * 100;
                }
                else if (this._captain == 2) {
                    this._winnings = this._playerBet * 2;
                }
                else if (this._ironman == 2) {
                    this._winnings = this._playerBet * 2;
                }
                else if (this._wolverine == 2) {
                    this._winnings = this._playerBet * 3;
                }
                else if (this._spiderman == 2) {
                    this._winnings = this._playerBet * 4;
                }
                else if (this._hulk == 2) {
                    this._winnings = this._playerBet * 5;
                }
                else if (this._batman == 2) {
                    this._winnings = this._playerBet * 10;
                }
                else if (this._superman == 2) {
                    this._winnings = this._playerBet * 20;
                }
                else if (this._superman == 1) {
                    this._winnings = this._playerBet * 5;
                }
                else {
                    this._winnings = this._playerBet * 1;
                }
                this._winNumber++;
                this._showWinMessage();
            }
            else
            {
                this._winnings = 0;
                this._lossNumber++;
                this._showLossMessage();
            }
            
        }
        
        //EVENT HANDLERS ++++++++++++++++++++
        private _bet1ButtonClick(event: createjs.MouseEvent): void {
            console.log("Bet 1 Credit");
            this._playerBet = 1;
            this._playerMoneyLabel.text = this._paddingLeft(""+(this._playerMoney-1), 5);
            this._updateButtons();
        }

        private _bet10ButtonClick(event: createjs.MouseEvent): void {
            console.log("Bet 10 Credit");
            this._playerBet = 10;
            this._playerMoneyLabel.text = this._paddingLeft(""+(this._playerMoney-10), 5);
            this._updateButtons();
        }

        private _bet100ButtonClick(event: createjs.MouseEvent): void {
            console.log("Bet 100 Credit");
            this._playerBet = 100;
            this._playerMoneyLabel.text = this._paddingLeft(""+(this._playerMoney-100), 5);
            this._updateButtons();
        }
        
        private _resetButtonClick(event: createjs.MouseEvent): void {
            console.log("Reset Game!");
            // Restart Scene
            this._resetAll();
            scene = config.Scene.SLOT_MACHINE;
            changeScene();
        }
        
        private _quitButtonClick(event: createjs.MouseEvent): void {
            console.log("Quit Game!");
            // Switch to MENU Scene
            scene = config.Scene.MENU;
            changeScene();
        }

        private _spinButtonClick(event: createjs.MouseEvent): void {
            console.log("Spin those reels!");
            this._spinning = true;
            this._updateButtons();
            
            var betLine = this._reels();
            
            // animated spin button
            createjs.Tween.get(this._spinButton).to({y: 260}, 100).to({y: 172}, 800);
            
            // set reels with heroes
            this._reel1.setHeroAnimated(betLine[0]);
            this._reel2.setHeroAnimated(betLine[1]);
            this._reel3.setHeroAnimated(betLine[2]);
        }
        
        
        private _reelsCompleted(): void {
            console.log("reels completed");
            this._determineWinnings();
            
            this._turn++;
            this._playerBet = 0;
            this._spinning = false;
            
            console.log("------RESULTS------");
            console.log("Jackpot: " + this._jackpot);
            console.log("Player Winning: " + this._winnings);
            console.log("Player Money: " + this._playerMoney);
            console.log("Turn: " + this._turn);
            console.log("Wins: " + this._winNumber);
            console.log("Losses: " + this._lossNumber);
            console.log("--------------------");
            
            // update labels
            this._winnerLabel.text = this._paddingLeft(""+this._winnings, 5);
            this._playerMoneyLabel.text = this._paddingLeft(""+this._playerMoney, 5);
            
            this._updateButtons();
            
            // game over
            if(this._playerMoney == 0){
                setTimeout(function(){
                    scene = config.Scene.GAME_OVER;
                    changeScene();
                }, 2000);
            }
        }
        
        // left padding str with blank to a total of count chars
        private _paddingLeft(str, count): string {
            if (!str || str.length >= count) {
                return str;
            }
            var max = (count - str.length);
            for (var i = 0; i < max; i++) {
                str = ' ' + str;
            }
            return str;
        }
        
        
    }
}