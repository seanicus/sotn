/**
 * Created with JetBrains PhpStorm.
 * User: badger
 * Date: 10/14/13
 * Time: 2:28 PM
 * To change this template use File | Settings | File Templates.
 */
var Game =  {
    //init some stuff
    _mainDisplay: null,
    _displayOne: null,
    _currentScreen: null,
    _screenWidth: 50,
    _screenHeight: 14,
    init: function() {
        // Any necessary initialization will go here. this is a different comment
        var mainDisplayOptions = {
            fontSize: 24,
            layout: "hex",
            fontFamily: "droid sans mono",
            border: 0.5,
            spacing: 0.88,
            width: this._screenWidth,
            height: this._screenHeight
        };
        var displayOneOptions = {
            fontSize: 24,
            layout: "rect",
            fontFamily: "droid sans mono",
            border: 0.5,
            spacing: 0.88,
            width: 10,
            height: 25,
            bg: "green"
        };
        //this._mainDisplay = new ROT.Display({width: this._screenWidth, height: this._screenHeight, fontSize: 23, layout: "hex"});
        this._mainDisplay = new ROT.Display(mainDisplayOptions);
        this._displayOne = new ROT.Display(displayOneOptions);
        // Create a helper function for binding to an event
        // and making it send it to the screen
        var game = this; // So that we don't lose this
        var bindEventToScreen = function(event) {
            window.addEventListener(event, function(e) {
                // When an event is received, send it to the
                // screen if there is one
                if (game._currentScreen !== null) {
                    // Send the event type and data to the screen
                    game._currentScreen.handleInput(event, e);
                    game._mainDisplay.clear();
                    game._currentScreen.render(game._mainDisplay);
                }
            });
        }
        // Bind keyboard input events
        bindEventToScreen('keydown');
        bindEventToScreen('keyup');
        bindEventToScreen('keypress');

    },
    getDisplay: function() {
        return this._mainDisplay;
    },
    getInventoryDisplay: function() {
        return this._displayOne;
    },
    getScreenWidth: function() {
        return this._screenWidth;
    },
    getScreenHeight: function() {
        return this._screenHeight;
    },
    switchScreen: function(screen) {
        // If we had a screen before, notify it that we exited
        if (this._currentScreen !== null) {
            this._currentScreen.exit();
        }
        // Clear the display
        this.getDisplay().clear();
        // Update our current screen, notify it we entered
        // and then render it
        this._currentScreen = screen;
        if (!this._currentScreen !== null) {
            this._currentScreen.enter();
            this._currentScreen.render(this._mainDisplay);
        }
    }
}

window.onload = function() {
    // Check if rot.js can work on this browser
    if (!ROT.isSupported()) {
        alert("The rot.js library isn't supported by your browser.");
    } else {
        // Initialize the game
        Game.init();
        // Add the container to our HTML page
        //document.body.appendChild(Game.getDisplay().getContainer());
        document.getElementById("mainDisplay").appendChild(Game.getDisplay().getContainer());
        document.getElementById("inventoryDisplay").appendChild(Game.getInventoryDisplay().getContainer());
        // Load the start screen
        Game.switchScreen(Game.Screen.startScreen);
    }
}