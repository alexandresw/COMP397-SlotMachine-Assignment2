var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// MENU SCENE
var scenes;
(function (scenes) {
    var SlotMachine = (function (_super) {
        __extends(SlotMachine, _super);
        // CONSTRUCTOR ++++++++++++++++++++++
        function SlotMachine() {
            _super.call(this);
        }
        // PUBLIC METHODS +++++++++++++++++++++
        // Start Method
        SlotMachine.prototype.start = function () {
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
            this._initialize();
            // add this scene to the global stage container
            stage.addChild(this);
        };
        // SLOT_MACHINE Scene updates here
        SlotMachine.prototype.update = function () {
        };
        //PRIVATE METHODS
        /* Initialize game variables */
        SlotMachine.prototype._initialize = function () {
            this._playerMoney = 1000;
            this._winnings = 0;
            this._jackpot = 5000;
            this._turn = 0;
            this._playerBet = 0;
            this._winNumber = 0;
            this._lossNumber = 0;
            this._captain = 0;
            this._ironman = 0;
            this._wolverine = 0;
            this._spiderman = 0;
            this._hulk = 0;
            this._batman = 0;
            this._superman = 0;
            this._blanks = 0;
            // set initial position
            var result = this._reels();
            this._reel1.setHero(result[0]);
            this._reel2.setHero(result[1]);
            this._reel3.setHero(result[2]);
        };
        /* Utility function to reset all Heroes tallies */
        SlotMachine.prototype._resetHeroesTally = function () {
            this._captain = 0;
            this._ironman = 0;
            this._wolverine = 0;
            this._spiderman = 0;
            this._hulk = 0;
            this._batman = 0;
            this._superman = 0;
            this._blanks = 0;
        };
        /* Utility function to reset the player stats */
        SlotMachine.prototype._resetAll = function () {
            this._playerMoney = 1000;
            this._winnings = 0;
            this._jackpot = 5000;
            this._turn = 0;
            this._playerBet = 0;
            this._winNumber = 0;
            this._lossNumber = 0;
            //this._winRatio = 0;
        };
        SlotMachine.prototype._showPlayerStats = function () {
            console.log("------RESULTS------");
            // winRatio = winNumber / turn;
            console.log("Jackpot: " + this._jackpot);
            console.log("Player Bet: " + this._playerBet);
            console.log("Player Money: " + this._playerMoney);
            console.log("Turn: " + this._turn);
            console.log("Wins: " + this._winNumber);
            console.log("Losses: " + this._lossNumber);
            //console.log("Win Ratio: " + (winRatio * 100).toFixed(2) + "%");
            console.log("--------------------");
        };
        /* Check to see if the player won the jackpot */
        SlotMachine.prototype._checkJackPot = function () {
            /* compare two random values */
            var jackPotTry = Math.floor(Math.random() * 51 + 1);
            var jackPotWin = Math.floor(Math.random() * 51 + 1);
            if (jackPotTry == jackPotWin) {
                alert("You Won the $" + this._jackpot + " Jackpot!!");
                this._playerMoney += this._jackpot;
                this._jackpot = 1000;
            }
        };
        /* Utility function to show a win message and increase player money */
        SlotMachine.prototype._showWinMessage = function () {
            this._playerMoney += this._winnings;
            console.log("You Won: $" + this._winnings);
            this._resetHeroesTally();
            this._checkJackPot();
        };
        /* Utility function to show a loss message and reduce player money */
        SlotMachine.prototype._showLossMessage = function () {
            this._playerMoney -= this._playerBet;
            console.log("You Lost!");
            this._resetHeroesTally();
        };
        /* Utility function to check if a value falls within a range of bounds */
        SlotMachine.prototype._checkRange = function (value, lowerBounds, upperBounds) {
            return (value >= lowerBounds && value <= upperBounds) ? value : -1;
        };
        /* When this function is called it determines the betLine results.
        e.g. Bar - Orange - Banana */
        SlotMachine.prototype._reels = function () {
            var betLine = [0, 0, 0];
            var outCome = [0, 0, 0];
            for (var spin = 0; spin < 3; spin++) {
                outCome[spin] = Math.floor((Math.random() * 65) + 1);
                switch (outCome[spin]) {
                    case this._checkRange(outCome[spin], 1, 27):
                        betLine[spin] = config.ReelHeroes.BLANK;
                        this._blanks++;
                        break;
                    case this._checkRange(outCome[spin], 28, 37):
                        betLine[spin] = config.ReelHeroes.CAPITAIN;
                        this._captain++;
                        break;
                    case this._checkRange(outCome[spin], 38, 46):
                        betLine[spin] = config.ReelHeroes.IRONMAN;
                        this._ironman++;
                        break;
                    case this._checkRange(outCome[spin], 47, 54):
                        betLine[spin] = config.ReelHeroes.WOLVERINE;
                        this._wolverine++;
                        break;
                    case this._checkRange(outCome[spin], 55, 59):
                        betLine[spin] = config.ReelHeroes.SPIDERMAN;
                        this._spiderman++;
                        break;
                    case this._checkRange(outCome[spin], 60, 62):
                        betLine[spin] = config.ReelHeroes.HULK;
                        this._hulk++;
                        break;
                    case this._checkRange(outCome[spin], 63, 64):
                        betLine[spin] = config.ReelHeroes.BATMAN;
                        this._batman++;
                        break;
                    case this._checkRange(outCome[spin], 65, 65):
                        betLine[spin] = config.ReelHeroes.SUPERMAN;
                        this._superman++;
                        break;
                }
            }
            return betLine;
        };
        /* This function calculates the player's winnings, if any */
        SlotMachine.prototype._determineWinnings = function () {
            if (this._blanks == 0) {
                if (this._captain == 3) {
                    this._winnings = this._playerBet * 10;
                }
                else if (this._ironman == 3) {
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
            else {
                this._lossNumber++;
                this._showLossMessage();
            }
        };
        //EVENT HANDLERS ++++++++++++++++++++
        SlotMachine.prototype._bet1ButtonClick = function (event) {
            console.log("Bet 1 Credit");
            this._playerBet = 1;
        };
        SlotMachine.prototype._bet10ButtonClick = function (event) {
            console.log("Bet 10 Credit");
            this._playerBet = 10;
        };
        SlotMachine.prototype._bet100ButtonClick = function (event) {
            console.log("Bet 100 Credit");
            this._playerBet = 100;
        };
        SlotMachine.prototype._resetButtonClick = function (event) {
            console.log("Reset Game!");
            // Restart Scene
            scene = config.Scene.SLOT_MACHINE;
            changeScene();
        };
        SlotMachine.prototype._quitButtonClick = function (event) {
            console.log("Quit Game!");
            // Switch to MENU Scene
            scene = config.Scene.MENU;
            changeScene();
        };
        SlotMachine.prototype._spinButtonClick = function (event) {
            console.log("Spin those reels!");
            if (this._playerMoney == 0) {
                if (confirm("You ran out of Money! \nDo you want to play again?")) {
                    this._resetAll();
                    this._showPlayerStats();
                }
            }
            else if (this._playerBet > this._playerMoney) {
                alert("You don't have enough Money to place that bet.");
            }
            else if (this._playerBet < 0) {
                alert("All bets must be a positive $ amount.");
            }
            else if (this._playerBet <= this._playerMoney) {
                var spinResult = this._reels();
                //fruits = spinResult[0] + " - " + spinResult[1] + " - " + spinResult[2];
                //$("div#result>p").text(fruits);
                this._reel1.setHero(spinResult[0]);
                this._reel2.setHero(spinResult[1]);
                this._reel3.setHero(spinResult[2]);
                this._determineWinnings();
                this._turn++;
                this._showPlayerStats();
            }
            else {
                alert("Please enter a valid bet amount");
            }
            //this._test();
        };
        SlotMachine.prototype._test = function () {
            //createjs.Tween.get(this._reel1).to({y:-600}, 0)
        };
        return SlotMachine;
    })(objects.Scene);
    scenes.SlotMachine = SlotMachine;
})(scenes || (scenes = {}));
//# sourceMappingURL=slotmachine.js.map