/*
@title: getting_started
@author: leo, edits: samliu, belle, kara

Check the tutorial in the bottom right, the run button is in the top right.
Make sure to remix this tutorial if you want to save your progress!
*/

// define the sprites in our game
const player = "p";
const box = "b";
const goal = "g";
const wall = "w";

// assign bitmap art to each sprite
setLegend(
  [ player, bitmap`
....00..........
..0000........0.
..0110.....00000
..0LL100..000110
..0LL110..0111L0
..0LLL10.0111LL0
...0LL100111LLL0
...0LLL0011LLL00
...00L00LLLL00..
.....000LL000...
...00000L0......
..00000000......
...0000..0......
................
................
................`],
  [ box, bitmap`
................
......CC........
......CFCC......
.....CFFFCC.....
....CFFFFFCC....
....CCFFFFFC....
....CCCCCCCC....
...CCCCCCCCC....
..CCCCFFFFFFC...
..CCCCCCCCCCC...
...CCCCCCCCCC...
.CCCFFFFFFFFCC..
.CCCCFFFFFFFFC..
...CCCCCCCCCC...
.....CCCCCC.....
.......CC.......`],
  [ goal, bitmap`
................
....0......0....
....0......0....
....0......0....
....0......0....
................
......00000.....
...000....000...
...0........00..
..0..........0..
..0..333333..0..
..0.33333333.0..
..0.33300003.0..
..000000..000...
................
................`],
  [ wall, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`]
);

const myTune = tune`
500: C5^500 + F5^500 + D5-500 + B4-500,
15500`;
playTune(myTune);
onInput("w", ()=> {
  getFirst(player).y -= 1;
  playTune(myTune);
});

onInput("a", ()=> {
  getFirst(player).x -= 1;
  playTune(myTune);
});

onInput("s", ()=> {
  getFirst(player).y += 1;
  playTune(myTune);
});

onInput("d", ()=> {
  getFirst(player).x += 1;
  playTune(myTune);
});
  


// create game levels
let level = 0; // this tracks the level we are on
const levels = [
  map`
ww.www
ww.w.g
w.p...
.b.w..
....ww`,
  map`
wp
w.b.
w...
..gw`,
  map`
pw..
.b..
.ww.
..wg`,
  map`
.w....
..ww..
..bpw.
..wgww
......
.w....`,
  map`
p.w.
.bwg
....
....`
];

// set the map displayed to the current level
const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player, box, wall ]); // other sprites cannot go inside of these sprites

// allow certain sprites to push certain other sprites
setPushables({
  [player]: [box],
  [box]: [box]
});


// input to reset level
onInput("j", () => {
  const currentLevel = levels[level]; // get the original map of the level

  // make sure the level exists before we load it
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

// these get run after every input
afterInput(() => {
  // count the number of tiles with goals
  const targetNumber = tilesWith(goal).length;
  
  // count the number of tiles with goals and boxes
  const numberCovered = tilesWith(goal, box).length;

  // if the number of goals is the same as the number of goals covered
  // all goals are covered and we can go to the next level
  if (numberCovered === targetNumber) {
    // increase the current level number
    level = level + 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    // otherwise, we have finished the last level, there is no level
    // after the last level
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4, color: color`3` });
    }
  }
});
