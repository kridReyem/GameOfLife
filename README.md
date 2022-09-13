# GameOfLife
JavaScript Implementation of the Game Of Life (Conway's Game of Life). Language settings on the actual website are in german, because the coding challenge has been provided in german.

# General Information
This is a implementation of Conways game of life from 1970 (https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life). 
The project was developed in relation to a online coding challenge by it-talents.de in May 2018.

# Rules
The following game rules are the preset game rules. However, these can be customized using the various settings in this WebApp.

The next generation of living cells (i.e. the status of all cells in the next game round) is calculated by a simple ruleset:
- Any living cell that has less than 2 living neighboring cells dies
- Any living cell that has 2 or 3 living neighboring cells continues to live
- Any living cell that has more than 3 living neighboring cells dies
- Any dead cell that has exactly 3 living neighbor cells becomes alive

# Features
In the following all features of this web app are explained

- change the rules of the game (continue living and resuscitate)
- draw manually on the board (mouse drag/click) - both at start occupancy and during simulation
- Specify number of living cells as a percentage during start occupancy
- Adjusting the simulation speed
- Change the area that should contain living cells at start occupancy

# Tech Stack
- JavaScript
- HTML
- CSS
- jquery, bootstrap, fontawesome
