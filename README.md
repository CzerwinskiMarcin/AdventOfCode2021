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
