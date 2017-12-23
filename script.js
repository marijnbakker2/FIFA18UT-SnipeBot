(function(){
    const APP_NAME = 'snipeybot';

    log('Initializing...');

    window.addEventListener('keydown', function(ev) {
        const keyCode = ev.keyCode;

        switch (keyCode) {
            case 191 /* '/' */: // Must get new value for snipe
                snipePrefilledPlayer();
                break;
            default:
                break;
        }
    });

    function touchElement(element){
      element.dispatchEvent(new MouseEvent('mousedown'));
      element.dispatchEvent(new MouseEvent('mouseup'));
    }
    /**
     * Snipes prefilled player
     */
     function snipePrefilledPlayer() {
        log('Starting script');
        var sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
        sleep(5000);
        // Fill in search field and start search
        try {
          log('Start putting values in place')
          // Get min and max BIN values
          var minBinField = document.getElementsByClassName("numericInput")[2];
          var maxBinField = document.getElementsByClassName("numericInput")[3];
          var minBinValue = parseInt((document.getElementsByClassName("numericInput")[2].value).replace('.',''));
          var maxBinValue = parseInt((document.getElementsByClassName("numericInput")[3].value).replace('.',''));

          // Check if minBin is higher or lower than 75% of maxbin
          if ((minBinValue / maxBinValue) > 0.35){
            // Reset minBin to 200
            document.getElementsByClassName("numericInput")[2].value = 250;
            var decrButton = document.getElementsByClassName('decrementBtn')[2];
            touchElement(decrButton);
          } else {
            var incrButton = document.getElementsByClassName('standard incrementBtn')[2];
            touchElement(incrButton);
          }

          var searchButton = document.getElementsByClassName('standard call-to-action')[0];
          touchElement(searchButton);

        } catch (error) {
          log('Failed search function')
        }

        // Try to buy a player on the player screen
        try {
          setTimeout(function(){
            // Check for available snipe
            if (document.getElementsByClassName('buyButton')[0] != undefined){
              try {
                log('Attempting to snipe');
                // Click buy now button
                var buyButton = document.getElementsByClassName('buyButton')[0];
                touchElement(buyButton);

                // Click OK button
                setTimeout(function(){
                  var okButton = document.getElementsByClassName('btn-flat')[1];
                  touchElement(okButton);
                }, 75);
                /**
                / Player is now bought if no failure has occurred
                / Snipeybot will now try to send this player to the transfer list
                **/
                setTimeout(function(){
                  try {
                    log('Attempting to send player to transfer list');
                    var transferListButton = document.getElementsByClassName('btn-text')[7].parentElement;
                    touchElement(transferListButton);

                    setTimeout(function(){
                      var headerButton = document.getElementsByClassName('btn-flat back headerButton')[0];
                      touchElement(headerButton);
                    }, 150);
                  } catch (e) {
                    log ('Failed to send player to transferlist, going back to transfer page');
                    // Ok button from alert box if failed buy
                    // setTimeout(function(){
                    //   var okAlertButton = document.getElementsByClassName('Dialog ui-dialog-type-alert')[0].children[1].children[1].children[0];
                    //   touchElement(okAlertButton);
                    //   // Click header back button to go back to search
                    //   setTimeout(function(){
                    //     var headerButton = document.getElementsByClassName('btn-flat headerButton')[0];
                    //     touchElement(headerButton);
                    //   }, 550);
                    // }, 1250);

                    // Click transfers on sidebar, then go back to transfer page
                    setTimeout(function(){
                      var okButton = document.getElementsByClassName('btn-flat')[0];
                      touchElement(okButton);
                      var tranfersButton = document.getElementsByClassName('btnTransfers')[0];
                      touchElement(tranfersButton);
                      // Click header back button to go back to search
                      setTimeout(function(){
                        var transferMarketTile = document.getElementsByClassName('transferMarketTile')[0];
                        touchElement(transferMarketTile);
                      }, 1010);
                    }, 1750);
                  }
                }, 1200);
              } catch (e) {
                log ('Failed to snipe');
              }

            } else {
              // If no player is found, click the BACK button
              setTimeout(function(){
                log('Going back to input page')
                var backButton = document.getElementsByClassName('standard call-to-action')[0];
                touchElement(backButton);
              }, 1050);
            }
          }, 850);
        } catch (e) {
          setTimeout(function(){
            var okButton = document.getElementsByClassName('btn-flat')[0];
            touchElement(okButton);
            setTimeout(function(){
              var headerButton = document.getElementsByClassName('btn-flat headerButton')[0];
              touchElement(headerButton);
            }, 450);
          }, 750);
        }

        setTimeout(function(){
          snipePrefilledPlayer();
        }, Math.floor(Math.random() * 3300) + 2700);
        // document.getElementsByClassName("numericInput")[3].value = 440
     }

    /**
     * Logs a message to the console with app information.
     *
     * @param {string} message
     * @param {boolean} isError
     */
    function log(message, isError) {
        // Default to info.
        let logFunction = console.info;

        if (isError) {
            logFunction = console.error;
        }

        logFunction(`${APP_NAME}: ${message}`)
    }

    /**
     * Simulates a tap/click on an element.
     *
     * @param {HTMLElement} element
     */
    function tapElement(element) {
        sendTouchEvent(element, 'touchstart');
        sendTouchEvent(element, 'touchend');
    }

    /**
     * Dispatches a touch event on the element.
     * https://stackoverflow.com/a/42447620
     *
     * @param {HTMLElement} element
     * @param {string} eventType
     */
    function sendTouchEvent(element, eventType) {
        const touchObj = new Touch({
          identifier: 'Keyboard shortcuts should be supported natively without an extension!',
          target: element,
          clientX: 0,
          clientY: 0,
          radiusX: 2.5,
          radiusY: 2.5,
          rotationAngle: 10,
          force: 0.5
        });

        const touchEvent = new TouchEvent(eventType, {
          cancelable: true,
          bubbles: true,
          touches: [touchObj],
          targetTouches: [touchObj],
          changedTouches: [touchObj],
          shiftKey: true
        });

        element.dispatchEvent(touchEvent);
      }
})();
