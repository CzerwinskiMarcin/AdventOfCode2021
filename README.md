# AdventOfCode2021
This repository contains solutions for puzzles for Advent Of Code 2021 event

___
### Why I've created this repo?
Simple - to force upon myself regularity in solving puzzles from the events and to keep the code somewhat readable.


_If you have some audience you will put more work in your code_.

---
#### First day - Ascending into the darkness
##### _01.12.2021_
I love those stories! The characters, ridiculous situations and problem to solve. Didn't expect the ocean themed puzzles 

Made it in time regardless going into overthinking of the structure of the files. To notice for tomorrow - I need to think
about running scripts without need to run _node pathToFile.js_. Also needs some parametrization for running examples while
debugging and running main puzzle. 

---

#### Second day - Moving through the darkness
##### _02.12.2021_
Second day - second puzzle. This time we need to calculate the summary distance from the beginning point after executing 
command of movements. 

Honestly, if you strip this puzzle out of the story it is just some mapping and vector mathematics. I cannot be amazed 
how adding background to the task can change the attitude towards the task. This should be done in school!

As for today, there is still no parametrization of running the scrips. I was thinking about yargs - but cannot decide if 
this is good approach. If I was to go with this, I should keep some convention in organizing main scripts files and data for puzzles...
Needs to do some more thoughts about this.

---

#### Third day - Submarine health issues
##### _03-04.12.2021_

Third and fourth day - for now the most complex puzzle. Spend _WAY_ to much time on this. At some point I've debugged code for 1 hours just to find 
that there is comparison with lower and equal instead of just lower.

I've added some parametrization with _*yargs*_. So now I can run any code frm one point. I need just make previous 2 days.

Alsa I've gone with this puzzle towards specific approach. As I'm front-end developer I do not have much possibility to work with bits
therefore I wanted to make whole solution with bit calculation approach. It _*WAS*_ hard but I'm glad that I have done this.

I'm far from being proud for my code but I need to do this faster, because I'm being late - there is already fourth puzzle.

---

#### Fourth day - Squid Game (not THAT Squid Game)
##### _04.12.2021_

This day has been long. Giant squid was easier for me this time. The code if far from being perfect, and has many flaws
(_psss. If there is more than one winning board per turn this will crush, don't tell anyone~~~~~~_) but it works. I'm currently out of home
and cannot solve them with comfortable environment. But hey, sometimes this happens. 

Thankfully I've fixed and adjusted codes from previous days to match the parametrization so today is double win
(_triple if you count finishing 3rd day's puzzle today_).

Next one tomorrow ;)

---

### Fifth day - Drawing map of the ocean floor
#### _05.12.2012_

Puzzle where you must draw map - I've solved one or two in the past so this was something similar and one of the easiest for now.
I was able to implement second part of the puzzle even before the context was revealed - going with some approaches 
makes you job easier in the future. I've done this also on being away from home. I'm waiting for next puzzle.

---

### Sixth day - Calculation Laternfishnation
#### _06-07.12.2021_

Laternfish - I will dream about you for a long time in the future. 

This task is close to my heart - I have bachelor degree in Biotechnology therefore I have some interest in nature ;) 
While this task was easy at first glance it soon happend to show that my calculation complexity is far from good at first part approach.
Thanks to second part I've also noticed that I spend to little time on understanding the topic and all steps of puzzle. 
Need to improve in this field. 

I do not know if I can make next (7th) puzzle today. If not, I will catch up at weekend. 

Bye :)

---

### Seventh day - Combustion problem
#### _07-08.12.2021_

Crabs submarines are here to save us but not without our help. I think that this puzzle is one of easier one from this year.
I didn't have much problem with the puzzle in terms of algorithm but in one point I've used wrong value (length of positions instead of 
max position).

I need some tool to debug (of course by printing values in fancy ways) and a mechanism to turning it on/off. For now I'm using simple 
```console.log()``` :D. 

---

### Eighth day - North Pole - we have a problem with display
#### _08-09.12.2021_

This one will be short - Firstly I've approached without thought and overcomplicated this. Only at the end of the 08 I've found easier
solution for this, therefore I've done it now

Thanks ;)

---

### Tenth day - Navigation problem
#### _10-11.12.2021_

This task was fun. I wanted to use some more bit operations therefore I've done some manipulations on them. It went more
smooth this time than last time :) 

I also wanted to use some advanced types to define Chunk type but I had some problems with manipulating types. Need to 
read more about this.

Thanks for the task. Today will be new one! 

---

### 11th day - Octo flashes
#### _11-12.12.2021_

I've found one of the cutest animals on the Earth! They are perfect, little and cute. Ah....

Returning to the puzzle - sow second time map-like puzzle therefore I've created _*EnhancedMap*_ model for storing the information 
in map-like manner. As for the puzzle, first impression tells you (me in this case) that hard times are in the future. 
But it is quite simple puzzle. 

Also I've created script for creating structure for the puzzle for given day xD My laziness is limitless. Of course it has
many flows but I need if for like 15 day now.

Thanks for sharing this cute Dumbo Octopus AoC team!

---

### 12th day - _Leave all hope ye who enter here_
#### _11-12.12.2021_

Honestly I was not hoping to finish this puzzle at all. I was thinking about abandoning it and move on to today puzzle. 
But thanks to my stubbornness I was able to finish it with *_only_* one day of delay :) I do not know what what the case of 
this slip in schedule - nothing has been gone right starting from understanding the puzzle questions, including to complex 
implementation (two first tries) and making silly mistakes. Maybe it some kind of tiredness or too much chores to do before 
Christmas? 

*BUT* it is not important now because 🎺 I did it 🎺 :D

Now is 23:30 (11:30 PM) time to go to today puzzle ;)

---

### 13th day  - Origami folding
#### _13.12.2021_

This puzzle went quicker than I thought it would be. I'm overcomplicated code and first run took about 8s, but after reducing
some unnecessary code now it takes 30ms - quite big different. 

I'm hopping to catch up new puzzle :) Wish me luck!

---

### 14th day - Polymerisation Optimalisation
#### _14.12.2021_

This puzzle was a headache to me. I've focused more on the polimerisation chain result, less on the puzzles question.
After this I spent loooong time spinning around and trying to make things better, and done nothing. After conversation
with my steps brother I've cleared my head and made another approach. And I've succeeded. That all for today. Thanks!

---
