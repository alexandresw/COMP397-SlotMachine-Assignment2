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
            this._captain = 0;
            this._ironman = 0;
            this._wolverine = 0;
            this._spiderman = 0;
            this._hulk = 0;
            this._batman = 0;
            this._superman = 0;
            this._blanks = 0;
        }
        // PUBLIC METHODS +++++++++++++++++++++
        // Start Method
        SlotMachine.prototype.start = function () {
            // add background image to the scene
            this._backgroundImage = new createjs.Bitmap(assets.getResult("SlotMachine"));
            this.addChild(this._backgroundImage);
            var bitmap = new createjs.Bitmap(assets.getResult("Reels"));
            var graphics = new createjs.Graphics().beginBitmapFill(assets.getResult("Reels")).drawRect(0, 36, 86, 150);
            var shape = new createjs.Shape(graphics);
            var container = new createjs.Container();
            //container.setBounds(190, 245, 90, 150);
            shape.x = 190;
            shape.y = 210;
            //shape.y = 246;
            shape.setBounds(0, 0, 86, 150);
            console.log("bounds=" + shape.getTransformedBounds());
            this.addChild(shape);
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
        };
        // SLOT_MACHINE Scene updates here
        SlotMachine.prototype.update = function () {
        };
        //PRIVATE METHODS
        /* Utility function to check if a value falls within a range of bounds */
        SlotMachine.prototype._checkRange = function (value, lowerBounds, upperBounds) {
            return (value >= lowerBounds && value <= upperBounds) ? value : -1;
        };
        /* When this function is called it determines the betLine results.
        e.g. Bar - Orange - Banana */
        SlotMachine.prototype._reels = function () {
            var betLine = [" ", " ", " "];
            var outCome = [0, 0, 0];
            for (var spin = 0; spin < 3; spin++) {
                outCome[spin] = Math.floor((Math.random() * 65) + 1);
                switch (outCome[spin]) {
                    case this._checkRange(outCome[spin], 1, 27):
                        betLine[spin] = "blank";
                        this._blanks++;
                        break;
                    case this._checkRange(outCome[spin], 28, 37):
                        betLine[spin] = "Captain";
                        this._captain++;
                        break;
                    case this._checkRange(outCome[spin], 38, 46):
                        betLine[spin] = "Ironman";
                        this._ironman++;
                        break;
                    case this._checkRange(outCome[spin], 47, 54):
                        betLine[spin] = "Wolverine";
                        this._wolverine++;
                        break;
                    case this._checkRange(outCome[spin], 55, 59):
                        betLine[spin] = "Spiderman";
                        this._spiderman++;
                        break;
                    case this._checkRange(outCome[spin], 60, 62):
                        betLine[spin] = "Hulk";
                        this._hulk++;
                        break;
                    case this._checkRange(outCome[spin], 63, 64):
                        betLine[spin] = "Batman";
                        this._batman++;
                        break;
                    case this._checkRange(outCome[spin], 65, 65):
                        betLine[spin] = "Superman";
                        this._superman++;
                        break;
                }
            }
            return betLine;
        };
        //EVENT HANDLERS ++++++++++++++++++++
        SlotMachine.prototype._bet1ButtonClick = function (event) {
            console.log("Bet 1 Credit");
        };
        SlotMachine.prototype._bet10ButtonClick = function (event) {
            console.log("Bet 10 Credit");
        };
        SlotMachine.prototype._bet100ButtonClick = function (event) {
            console.log("Bet 100 Credit");
        };
        SlotMachine.prototype._resetButtonClick = function (event) {
            console.log("Reset Game!");
        };
        SlotMachine.prototype._quitButtonClick = function (event) {
            console.log("Quit Game!");
        };
        SlotMachine.prototype._spinButtonClick = function (event) {
            console.log("Spin those reels!");
            console.log(this._reels());
        };
        return SlotMachine;
    })(objects.Scene);
    scenes.SlotMachine = SlotMachine;
})(scenes || (scenes = {}));
//# sourceMappingURL=slotmachine.js.map