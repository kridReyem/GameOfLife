/* 
author: Dirk Meyer
project: Game of Life (it-talents.de)
date: 2018 05 31
details: javaScript-file with functions for GameOfLife.html 
*/


/*  
common variables, which are in use by multiple functions

*/

//controlling animation pause and restart
var animationStop = false;
var started = false;

//user-input
var pace = 1;
var userProb = 75;
var radius = 25;

//rule checking for single cells, belongs to the rule choices the user did
var checkedLiveRules = [];
var checkedReliveRules = [];



//getting size of canvas
var selectedX = $("#selectedX").val();
var selectedY = $("#selectedY").val();
//initialise first playground (PG)
var actPG = initPG(selectedY, selectedX);



//counters
var generation = 0;
var livingCells = 0;
var percentageLivingCells = 0;
var sumCells = selectedX * selectedY;
$("#sumCells").text("Zellen: " + sumCells);

//to handle user input clicking pause-button
var pausePitch = actPG;




/* +++++ Main-Function +++++ */
$(document).ready(function() {


    canvas = document.getElementById('canvas');
    canvas.setAttribute('width', '1000');
    canvas.setAttribute('height', '500');
    $("#living2").trigger('click');
    $("#living3").trigger('click');
    $("#dying3").trigger('click');

    //console.log(actPG);
    draw(actPG);
});





//click-event listener for pace-sllider
$("#paceSlider").slider();
$("#paceSlider").on("slide", function(slideEvt) {
    $("#paceSliderValLabel").text("Geschwindigkeit: " + slideEvt.value);
    pace = $("#paceSlider").val();
});

//click-event listener for probability-sllider
$("#probSlider").slider();
$("#probSlider").on("slide", function(slideEvt) {
    $("#probSliderValLabel").text("Wahrscheinlichkeit: " + slideEvt.value + " %");
    userProb = $("#probSlider").val();
    actPG = initPG($("#selectedY").val(), $("#selectedX").val());
    draw(actPG);
});

//click-event listener for radius-sllider
$("#radiusSlider").slider();
$("#radiusSlider").on("slide", function(slideEvt) {
    $("#radiusSliderValLabel").text("Radius: " + slideEvt.value + "%");
    radius = $("#radiusSlider").val();
    actPG = initPG($("#selectedY").val(), $("#selectedX").val());
    draw(actPG);
});






/* Event-Listeners for further living cell-rule checkboxes */
$("#living1").click(function() {
    check($("#lCheck1"), 1, "stay");
});
$("#living2").click(function() {
    check($("#lCheck2"), 2, "stay");
});
$("#living3").click(function() {
    check($("#lCheck3"), 3, "stay");
});
$("#living4").click(function() {
    check($("#lCheck4"), 4, "stay");
});
$("#living5").click(function() {
    check($("#lCheck5"), 5, "stay");
});
$("#living6").click(function() {
    check($("#lCheck6"), 6, "stay");
});
$("#living7").click(function() {
    check($("#lCheck7"), 7, "stay");
});
$("#living8").click(function() {
    check($("#lCheck8"), 8, "stay");
});


/* Event-Listeners for reliving cell-rule checkboxes */
$("#dying1").click(function() {
    check($("#dCheck1"), 1, "comeBack");
});
$("#dying2").click(function() {
    check($("#dCheck2"), 2, "comeBack");
});
$("#dying3").click(function() {
    check($("#dCheck3"), 3, "comeBack");
});
$("#dying4").click(function() {
    check($("#dCheck4"), 4, "comeBack");
});
$("#dying5").click(function() {
    check($("#dCheck5"), 5, "comeBack");
});
$("#dying6").click(function() {
    check($("#dCheck6"), 6, "comeBack");
});
$("#dying7").click(function() {
    check($("#dCheck7"), 7, "comeBack");
});
$("#dying8").click(function() {
    check($("#dCheck8"), 8, "comeBack");
});







//event-binding on mouse-action on canvas
$("#canvas").mousedown(function(e) {
    handleMouseDown(e);
});
$("#canvas").mousemove(function(m) {
    handleMouseMove(m);
});
$("#canvas").mouseup(function(u) {
    handleMouseUp(u);
});



// function for user-drawing directly on canvas
//mousedown-event let the user draw manually cells as living or died

var isDown = false;
var mouseMoveValues = [];

//event to handle if mouse is not clicked anymore by user
function handleMouseUp(u) {
    isDown = false;
    mouseMoveValues = [];

}

//event to handle movement of user if he has clicked before. Otherwise its ignored
function handleMouseMove(u) {
    if (!isDown) {
        return;
    } else {
        var $canvas = $("#canvas");
        //get offset of canvas (margins,...)
        var canvasOffset = $canvas.offset();
        var offsetX = canvasOffset.left;
        var offsetY = canvasOffset.top;
        // tell the browser we're handling this event
        u.preventDefault();
        u.stopPropagation();
        startX = parseInt(u.clientX - offsetX);
        startY = parseInt(u.clientY - offsetY);
        
        //compute which coordinates the mouseevent has been
        var drawX = Math.floor(startX / 10);
        var drawY = Math.floor(startY / 10);

        var helperMMV = Array.from(new Set(mouseMoveValues.map(JSON.stringify)), JSON.parse);;
        helperMMV.push([drawY, drawX]);
        helperMMV = Array.from(new Set(helperMMV.map(JSON.stringify)), JSON.parse);
        console.log("Helper: " + helperMMV);
        console.log("MMV: " + mouseMoveValues);
        console.log("Länge Helper: " + helperMMV.length);
        console.log("Länge MMV: " + mouseMoveValues.length);
        //compare if the user targets  new cells and change if true the cell-status
        if (helperMMV.length !== mouseMoveValues.length) {
            mouseMoveValues = helperMMV;
            if (actPG[drawY][drawX] == 0) {
                actPG[drawY][drawX] = 1;
            } else {
                actPG[drawY][drawX] = 0;
            }
            //redraw new pitch
            draw(actPG);
        }
    }
}

//event to handle user-click on canvas
function handleMouseDown(e) {
    isDown = true;
    var $canvas = $("#canvas");
    var canvasOffset = $canvas.offset();
    var offsetX = canvasOffset.left;
    var offsetY = canvasOffset.top;
    // handling the event
    e.preventDefault();
    e.stopPropagation();
    startX = parseInt(e.clientX - offsetX);
    startY = parseInt(e.clientY - offsetY);
    var drawX = Math.floor(startX / 10);
    var drawY = Math.floor(startY / 10);
    mouseMoveValues.push([drawY, drawX]);

    if (actPG[drawY][drawX] == 0) {
        actPG[drawY][drawX] = 1;
    } else {
        console.log("jo");
        actPG[drawY][drawX] = 0;
    }
    draw(actPG);
};




$('#startButton').on('click', function(event) {
    started = true;
    console.log(started);

    console.log("yo");
    pitchCalc(actPG.slice(0));
    $("[id=lock").each(function() {
        $(this).css("display", "block");
    });
    $("#probS").css("display", "none");
    $("#radiusS").css("display", "none");
    $("#xValueSpinner").css("display", "none");
    $("#yValueSpinner").css("display", "none");
    hideSettings();



});

$('#pauseButton').on('click', function(event) {
    animationStop = true;
    console.log("pause!");
});

$('#resumeButton').on('click', function(event) {
    console.log("Resume");
    if (animationStop == true) {
        animationStop = false;
        pitchCalc(pausePitch);
    }

});

$('#restartButton').on('click', function(event) {
    $("[id=lock").each(function() {
        $(this).css("display", "none");
    });
    $("#probS").css("display", "block");
    $("#radiusS").css("display", "block");
    $("#xValueSpinner").css("display", "flex");
    $("#yValueSpinner").css("display", "flex");
    displaySettings();
    started = false;
    animationStop = false;
    canvas = document.getElementById('canvas');
    var newY = $("#selectedY").val();
    var newX = $("#selectedX").val();
    console.log(newY, newX);
    canvas.setAttribute('width', $("#selectedX").val() * 10);
    canvas.setAttribute('height', $("#selectedY").val() * 10);
    generation = 0;
    sumCells = newX * newY;
    actPG = initPG(newY, newX);
    draw(actPG);
    $("#generationCounter").text("Generation: " + generation);
    $("#livingCounter").text("Lebende Zellen: " + livingCells + " | " + (livingCells / (sumCells / 100)).toFixed(2) + " %");
    $("#sumCells").text("Zellen: " + sumCells);
});





//function to redraw pitch after user used size-pickers
var action;


$(".number-spinner button").mousedown(function() {
    btn = $(this);
    input = btn.closest('.number-spinner').find('input');
    btn.closest('.number-spinner').find('button').prop("disabled", false);

    if (btn.attr('data-dir') == 'up') {
        action = setInterval(function() {
            if (input.attr('max') == undefined || parseInt(input.val()) < parseInt(input.attr('max'))) {
                input.val(parseInt(input.val()) + 1);
            } else {
                btn.prop("disabled", true);
                clearInterval(action);
            }
        }, 50);
    } else {
        action = setInterval(function() {
            if (input.attr('min') == undefined || parseInt(input.val()) > parseInt(input.attr('min'))) {
                input.val(parseInt(input.val()) - 1);
            } else {
                btn.prop("disabled", true);
                clearInterval(action);
            }
        }, 50);
    }
    //mouseup-event draws new pitch
}).mouseup(function() {
    canvas = document.getElementById('canvas');
    var newY = $("#selectedY").val();
    var newX = $("#selectedX").val();
    console.log(newY, newX);
    canvas.setAttribute('width', $("#selectedX").val() * 10);
    canvas.setAttribute('height', $("#selectedY").val() * 10);
    draw(initPG(newY, newX));
    sumCells = newX * newY;
    $("#sumCells").text("Zellen: " + sumCells);
    clearInterval(action);

});

//initialise playground
//webapp-start, restarting by user
function initPG(x, y) {
    var plGround = [];
    for (var i = 0; i < x; i++) {
        plGround.push([]);
        for (var j = 0; j < y; j++) {
            if ((x * (0.5 - (radius / 100) / 2) < i && i < x * (0.5 + (radius / 100) / 2)) && (y * (0.5 - (radius / 100) / 2) < j && j < y * (0.5 + (radius / 100) / 2))) {
                var randomNum = getRandomInt(0, 1)
                plGround[i].push(randomNum);
                if (randomNum == 1) {
                    livingCells += 1;
                }
            } else {
                plGround[i].push(0);
            }

        }

    }
    return (plGround);


}


//draw the playground
function draw(playGround) {
    var canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        for (var y = 0; y < playGround.length; y++) {
            for (var x = 0; x < playGround[y].length; x++) {

                //size of rectangles
                xCoord = x * 10;
                yCoord = y * 10;

                //green (alive) rectangle if value == 1
                if (playGround[y][x] == 1) {
                    ctx.fillStyle = "rgba(100,221,23 ,1)";
                    ctx.fillRect(xCoord, yCoord, 9, 9);
                }
                //red (dead) rectangle if value == 0
                else {
                    ctx.fillStyle = "rgba(117,117,117 ,1)";
                    ctx.fillRect(xCoord, yCoord, 9, 9);
                }
            }
        }
    }
}



//function to calculate which cells have to be redrawn depending of users clicked rules for further living and reliving
function pitchCalc(pitch) {

    if ((animationStop == false) && (started == true)) {
        t = setTimeout(function() {

            livingCells = 0;
            var cyclePG = actPG;
            for (var y = 0; y < actPG.length; y++) {
                for (var x = 0; x < actPG[y].length; x++) {


                    // +++ CASE:   1  // 
                    // array of neighbour-cells (case: corner)
                    // ++++++++++++++ //

                    // top left corner
                    if (x == 0 && y == 0) {
                        var actCell = actPG[y][x];

                        var neighbourCells = [];
                        //cell left diagonal above
                        neighbourCells.push(actPG[actPG.length - 1][actPG[y].length - 1]);
                        //cell middle above
                        neighbourCells.push(actPG[actPG.length - 1][x]);
                        //cell right diagonal above
                        neighbourCells.push(actPG[actPG.length - 1][x + 1]);

                        //cell left 
                        neighbourCells.push(actPG[y][actPG[y].length - 1]);
                        //cell right
                        neighbourCells.push(actPG[y][x + 1]);

                        //cell left diagnoal  beneath
                        neighbourCells.push(actPG[y + 1][actPG[y].length - 1]);
                        //cell beneath
                        neighbourCells.push(actPG[y + 1][x]);
                        //cell right diagnoal beneath
                        neighbourCells.push(actPG[y + 1][x + 1]);
                        var sumLivingCells = neighbourCells.reduce(function(acc, val) {
                            return acc + val;
                        });
                        cyclePG[y][x] = checkRules(actCell, sumLivingCells);

                    }
                    // bottom left corner
                    else if (x == 0 && y == actPG.length - 1) {
                        var actCell = actPG[y][x];

                        var neighbourCells = [];
                        //cell left diagonal above
                        neighbourCells.push(actPG[y - 1][actPG[y].length - 1]);
                        //cell middle above
                        neighbourCells.push(actPG[y - 1][x]);
                        //cell right diagonal above
                        neighbourCells.push(actPG[y - 1][x + 1]);

                        //cell left 
                        neighbourCells.push(actPG[y][actPG[y].length - 1]);
                        //cell right
                        neighbourCells.push(actPG[y][x + 1]);

                        //cell left diagnoal beneath
                        neighbourCells.push(actPG[0][actPG[y].length - 1]);
                        //cell beneath
                        neighbourCells.push(actPG[0][x]);
                        //cell right diagnoal beneath
                        neighbourCells.push(actPG[0][x + 1]);
                        var sumLivingCells = neighbourCells.reduce(function(acc, val) {
                            return acc + val;
                        });
                        cyclePG[y][x] = checkRules(actCell, sumLivingCells);
                    }
                    // top right corner
                    else if (x == actPG[y].length - 1 && y == 0) {
                        var actCell = actPG[y][x];

                        var neighbourCells = [];
                        //cell left diagonal above
                        neighbourCells.push(actPG[actPG.length - 1][x - 1]);
                        //cell middle above
                        neighbourCells.push(actPG[actPG.length - 1][x]);
                        //cell right diagonal above
                        neighbourCells.push(actPG[actPG.length - 1][0]);

                        //cell left 
                        neighbourCells.push(actPG[y][actPG[y].length - 1]);
                        //cell right
                        neighbourCells.push(actPG[y][0]);

                        //cell left diagnoal beneath
                        neighbourCells.push(actPG[y + 1][y - 1]);
                        //cell beneath
                        neighbourCells.push(actPG[y + 1][x]);
                        //cell right diagnoal beneath
                        neighbourCells.push(actPG[y + 1][0]);
                        var sumLivingCells = neighbourCells.reduce(function(acc, val) {
                            return acc + val;
                        });
                        cyclePG[y][x] = checkRules(actCell, sumLivingCells);
                    }
                    // bottom right corner
                    else if (x == actPG[y].length - 1 && y == actPG.length - 1) {
                        var actCell = actPG[y][x];

                        var neighbourCells = [];
                        //cell left diagonal above
                        neighbourCells.push(actPG[y - 1][actPG[y].length - 1]);
                        //cell middle above
                        neighbourCells.push(actPG[y - 1][x]);
                        //cell right diagonal above
                        neighbourCells.push(actPG[y - 1][0]);

                        //cell left 
                        neighbourCells.push(actPG[y][actPG[y].length - 1]);
                        //cell right
                        neighbourCells.push(actPG[y][0]);

                        //cell left diagnoal beneath
                        neighbourCells.push(actPG[0][x - 1]);
                        //cell beneath
                        neighbourCells.push(actPG[0][x]);
                        //cell right diagnoal beneath
                        neighbourCells.push(actPG[0][0]);
                        var sumLivingCells = neighbourCells.reduce(function(acc, val) {
                            return acc + val;
                        });
                        cyclePG[y][x] = checkRules(actCell, sumLivingCells);
                    }

                    // +++ CASE:   2  // 
                    // array of neighbour-cells (case: edge, but no corner)
                    // ++++++++++++++ //

                    // left edge
                    else if (x == 0) {
                        var actCell = actPG[y][x];

                        var neighbourCells = [];
                        //cell left diagonal above
                        neighbourCells.push(actPG[y - 1][actPG[y].length - 1]);
                        //cell middle above
                        neighbourCells.push(actPG[y - 1][x]);
                        //cell right diagonal above
                        neighbourCells.push(actPG[y - 1][x + 1]);

                        //cell left 
                        neighbourCells.push(actPG[y][actPG[y].length - 1]);
                        //cell right
                        neighbourCells.push(actPG[y][x + 1]);

                        //cell left diagnoal beneath
                        neighbourCells.push(actPG[y - 1][actPG[y].length - 1]);
                        //cell beneath
                        neighbourCells.push(actPG[0][x]);
                        //cell right diagnoal beneath
                        neighbourCells.push(actPG[0][0]);
                        var sumLivingCells = neighbourCells.reduce(function(acc, val) {
                            return acc + val;
                        });
                        cyclePG[y][x] = checkRules(actCell, sumLivingCells);

                    }
                    // right edge
                    else if (x == actPG[y].length - 1) {
                        var actCell = actPG[y][x];

                        var neighbourCells = [];
                        //cell left diagonal above
                        neighbourCells.push(actPG[y - 1][x - 1]);
                        //cell middle above
                        neighbourCells.push(actPG[y - 1][x]);
                        //cell right diagonal above
                        neighbourCells.push(actPG[y - 1][0]);

                        //cell left 
                        neighbourCells.push(actPG[y][x - 1]);
                        //cell right
                        neighbourCells.push(actPG[y][0]);

                        //cell left diagnoal beneath
                        neighbourCells.push(actPG[y + 1][x - 1]);
                        //cell beneath
                        neighbourCells.push(actPG[y + 1][x]);
                        //cell right diagnoal beneath
                        neighbourCells.push(actPG[y + 1][0]);
                        var sumLivingCells = neighbourCells.reduce(function(acc, val) {
                            return acc + val;
                        });
                        cyclePG[y][x] = checkRules(actCell, sumLivingCells);

                    }
                    // top edge
                    else if (y == 0) {
                        var actCell = actPG[y][x];

                        var neighbourCells = [];
                        //cell left diagonal above
                        neighbourCells.push(actPG[actPG.length - 1][x - 1]);
                        //cell middle above
                        neighbourCells.push(actPG[actPG.length - 1][x]);
                        //cell right diagonal above
                        neighbourCells.push(actPG[actPG.length - 1][x + 1]);

                        //cell left 
                        neighbourCells.push(actPG[y][x - 1]);
                        //cell right
                        neighbourCells.push(actPG[y][x + 1]);

                        //cell left diagnoal beneath
                        neighbourCells.push(actPG[y + 1][x - 1]);
                        //cell beneath
                        neighbourCells.push(actPG[y + 1][x]);
                        //cell right diagnoal beneath
                        neighbourCells.push(actPG[y + 1][x + 1]);
                        var sumLivingCells = neighbourCells.reduce(function(acc, val) {
                            return acc + val;
                        });
                        cyclePG[y][x] = checkRules(actCell, sumLivingCells);
                    }
                    // bottom edge
                    else if (y == actPG.length - 1) {
                        var actCell = actPG[y][x];

                        var neighbourCells = [];
                        //cell left diagonal above
                        neighbourCells.push(actPG[y - 1][x - 1]);
                        //cell middle above
                        neighbourCells.push(actPG[y - 1][x]);
                        //cell right diagonal above
                        neighbourCells.push(actPG[y - 1][x + 1]);

                        //cell left 
                        neighbourCells.push(actPG[y][x - 1]);
                        //cell right
                        neighbourCells.push(actPG[y][x + 1]);

                        //cell left diagnoal beneath
                        neighbourCells.push(actPG[0][x - 1]);
                        //cell beneath
                        neighbourCells.push(actPG[0][x]);
                        //cell right diagnoal beneath
                        neighbourCells.push(actPG[0][x + 1]);
                        var sumLivingCells = neighbourCells.reduce(function(acc, val) {
                            return acc + val;
                        });
                        cyclePG[y][x] = checkRules(actCell, sumLivingCells);
                    } else {
                        var actCell = actPG[y][x];

                        // +++ CASE:   3  //
                        // array of neighbour-cells (case: not at edges or corner) 
                        // ++++++++++++++ //

                        var neighbourCells = [];
                        //cell left diagonal above
                        neighbourCells.push(actPG[y - 1][x - 1]);
                        //cell middle above
                        neighbourCells.push(actPG[y - 1][x]);
                        //cell right diagonal above
                        neighbourCells.push(actPG[y - 1][x + 1]);

                        //cell left 
                        neighbourCells.push(actPG[y][x - 1]);
                        //cell right
                        neighbourCells.push(actPG[y][x + 1]);

                        //cell left diagnoal  beneath
                        neighbourCells.push(actPG[y + 1][x - 1]);
                        //cell beneath
                        neighbourCells.push(actPG[y + 1][x]);
                        //cell right diagnoal beneath
                        neighbourCells.push(actPG[y + 1][x + 1]);
                        var sumLivingCells = neighbourCells.reduce(function(acc, val) {
                            return acc + val;
                        });
                        cyclePG[y][x] = checkRules(actCell, sumLivingCells);
                    }
                    if (cyclePG[y][x] == 1) {
                        livingCells += 1;
                    }

                }
            }
            generation += 1;
            draw(cyclePG);
            $("#generationCounter").text("Generation: " + generation);
            $("#livingCounter").text("Lebende Zellen: " + livingCells + " | " + (livingCells / (sumCells / 100)).toFixed(2) + " %");
            pausePitch = cyclePG;
            pitchCalc(cyclePG);

        }, 200 / pace);
    } else {
        //
    }


}






/* Function to check the rules */
function checkRules(actCell, sumLivingCells) {
    if (actCell == 0) {
        if (checkedReliveRules.indexOf(sumLivingCells) !== -1) {
            //every dead cell, which has exactly three living neighbour-cells, will be reanimated in the next round 
            return 1;
        } else {
            //every dead cell, which has living neighbour-cells unlike the amount of 3 will not be alive in the next round
            return 0;
        }
    }
    if (actCell == 1) {
        //every living cell, which has two or three living neighbour-cells, continues living
        if (checkedLiveRules.indexOf(sumLivingCells) !== -1) {
            return 1;
        }
        //every living cell, which has less than two living neighbour-cells or has more than 3 living neighbour-cells, dies 
        else {
            return 0;
        }
    }
}



/*############################################## */
/* Stored Helper-Functions */


// checks if a rule-button is checked or not and toggles between the classes and icons
function check(checkNum, num, mode) {

    if (checkNum.attr("class") == "deactivated") {
        checkNum.text("").removeClass().addClass("fa fa-check icon");
        if (mode == "stay") {
            checkedLiveRules.push(num);
        } else {
            checkedReliveRules.push(num);
        }

    } else {
        checkNum.text(num).removeClass().addClass("deactivated");
        if (mode == "stay") {
            var indexLive = checkedLiveRules.indexOf(num);
            if (indexLive !== -1) {
                checkedLiveRules.splice(indexLive, 1);
            }
        } else {
            var indexRelive = checkedReliveRules.indexOf(num);
            if (indexRelive !== -1) {
                checkedReliveRules.splice(indexRelive, 1);
            }
        }

    }
    var output1 = checkedLiveRules.sort(function(a, b) {
        return a - b;
    });
    var output2 = checkedReliveRules.sort(function(a, b) {
        return a - b;
    });
}


/*Generate random integers between min. and max. (inclusive)*/
//get a zero (0) if lower than user probability else a one (1) as return value (integer)
function getRandomInt(min, max) {
    var prob = Math.floor(Math.random() * (max - min + 100)) + min;
    if (userProb == 0) {
        return 1;
    } else if (prob <= userProb) {
        return 0;
    } else {
        return 1;
    }
}


/* Hide Settings */
function hideSettings() {
    $(".hideSettings").css("opacity", "0").on('transitionend webkitTransitionEnd oTransitionEnd otransitionend', deleteSettings);
}

function deleteSettings() {
    $(".hideSettings").css("display", "none");
}

/* Display Settings again */
function displaySettings() {
    $(".hideSettings").css("display", "block").css("opacity", "1").unbind("transitionend webkitTransitionEnd oTransitionEnd otransitionend");
}