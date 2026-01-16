<div align="center">

# ADAnswersBot Contributing Guide

</div>

---

## *An Introduction*; or, *The Reason This Took So Long*

First, I would like to take a moment to thank again all of the wonderful contributors who have come before to ADAnswersBot -- without them, of course, nothing here is possible. I am forever indebted to the wonderful community I have found myself immersed in, and I cannot thank them enough for giving me the inspiration to keep working at this silly thing day after day.

With this out of the way, I do want to make a note of some of the mental processes I have worked with as I have developed this rewrite over the course of the last year. It has certainly been a rocky road of insufficient and otherwise intermittent progress, but what I have found is that there is a certain quality to this codebase that (in my mind) is fairly reasonable and simple to become acquainted with. 

<small>_If you are simply interested in "how do I make a command" -- feel free to scroll down a bit._</small>

This rewrite was pretty much all done from the ground up. I had first gathered a [couple thoughts](https://canary.discord.com/channels/351476683016241162/351476683016241166/1326035473218404413) from the AD community on how folks wanted this all to happen; it was fairly resounding in the affirmative to simply rewrite the code using [Discord.js](https://discord.js.org/) as the bot was written in originally. I personally had slightly wanted to experiment with my other two options (the first being a new JS/TS library for the bot; the second, a whole new language and framework entirely) -- and privately, I did -- but I found that...well, there is a reason that Discord.js is lauded as the easiest framework to work with: it simply is.

I knew from the start I wanted to write all of this in TypeScript. Say what you will, but the truth is that the language lends itself really nicely to someone (like myself) coming from web development as their gateway into programming in the broader sense, and so I felt it would be fairly reasonable to maintain this general connection; it makes ADAB feel more of a passion project, like coming back to an old friend (education and academia has certainly sucked the soul out of programming, not to mention AI and what have you). AD being in JavaScript already means that folks who may have had a passing glance at either this codebase or AD's could also stand to make a passing glance in the other direction. Those who may have some knowledge of the original iteration (which is nearly five years old!) or some following ones may recall that ADAB was originally written in JavaScript, and this was mostly fine as it fit with what Discord.js guides put out. I also was young and naïve, to be fair, and had I known from the beginning about TypeScript, it's likely this whole thing could have been avoided. Me getting to rewrite the bot nearly five years on from when I started provides me with some interesting perspective on the whole thing -- when you have to rewrite everything, you find out how much sense things like object-oriented programming make, which is a nugget of knowledge I wouldn't have fully appreciated five years ago. I like to think I've matured in my programming reasoning; I suppose you can decide from the product here in front of you if that is for better or worse.

The general idea here is that you can write a command without ever wondering how it gets done -- encapsulation. The backend does not excite much anyone here. *However*, I do want to note that not every command here or command that can be written necessarily fits into some neat box; most notably, [the Eternity Challenges](./commands/eternity_challenges_dilation/eternitychallenge.ts) command suffers this fate. Now, the truth with this is that not many commands that could be conceived from here on in ADAB history would demand the sheer amount of low-level framework finagling that that command (and other commands like it) do. It is a bit of an outlier in that. Many commands are simply text -- these are the ones people like to write. The beautiful thing about that is that I have tried (and Discord.js has tried) to make these as accessible as possible to write. And if you ask me, they have pretty much succeeded in that! What I have done here is tried to shove a good amount of the backend work into classes that are, in a sense, plug-and-play. The user should not have to write much more than a Discord.js `SlashCommandBuilder` and their desired text that the command should output. For that, the [`BasicTextCommand`](./types/commands/BasicTextCommand.ts) was created. A good example to visit for this kind of command is something like [`/contributors`](./commands/misc_bot_server_info/contributors.ts). Then, when a command is created, it can be deployed and added to the bot with relative ease, as (nearly) all command handling is fully dynamic.

I tried to spend as much time as I reasonably could on making sure things here made sense. Some things might not make a ton of sense at first glance, but I think that the truth is that any other framework or language would have likely made things worse around here. There really is some level of "oh, I can do XYZ or ABC basically whenever or however I want" in Discord.js -- though, depending on who you ask, this probably makes things much more dangerous. It is a force to be reckoned with, to be certain. 


## A Tech Stack for the Knowing Ones

Much progress has been made in the terrifying landscape of "serverside JavaScript runtimes". We truly have been blessed enough to be gifted the wonderful tool [Bun.js](https://bun.sh/), a JavaScript runtime that handles TypeScript natively and also moonlights as a package manager. I have grown weary of Node, npm, and untangling legacy peer dependencies, unfortunately. But Bun pretty much works out of the box, or at least, I can't think of any severe issues I had when setting it up. It receives consistent updates and I can really appreciate the native TS support.

Our Discord framework, as has been mentioned, is Discord.js, which works fine for everything we need. There do exist frameworks on *top* of Discord.js (namely [Sapphire](https://sapphirejs.dev/)), but I didn't find it to be as extensible for what I wanted and needed out of ADAB. It is certainly neat and does play into the whole OOP thing I do here, so I do recommend checking it out for smaller or less complex projects.

I will also take some time here to mention some of the other tools that I used here while working on the bot. Originally, I had been using [ESLint](https://eslint.org/), an excellent [linter](https://en.wikipedia.org/wiki/Lint_(software)) for JavaScript and TypeScript, and so the configuration is still in this repository for that. Ideally, you should be pretty much able to install the ESLint extension in an IDE like [Visual Studio Code](https://code.visualstudio.com/) (my IDE of choice for JavaScript, TypeScript, React, Vue...etc development), and install the relevant packages for the bot, and it should run. However, I have recently been made aware of a new-generation tool (and you know me with my gadgets) known as [Oxc](https://oxc.rs/), which doubles as a linter and formatter. The goal of including a formatter and linter is to allow there to be extremely consistent code formatting across the whole codebase, which can be done automatically from the CLI (and is handled when certain `bun` scripts are ran).

I chose to complete this rewrite using TypeScript. This is not a major change from before, but I figured I'd mention it -- the safety of it all and the way it forces you to think about the code you are writing is a really nice quality that I have grown to appreciate, even though I've invariably gotten angry with some type error each time I work on the bot. Also, coming soon will be TSGo (TypeScript v7), which will be much faster and more performant than before, so there is at least something to be excited about there.

<small>*You can rejoin here if you're looking at simply making a command, without all my boring yammering.*</small>

## *The Sun Also Rises*...on your new command

First, I would like to conduct a general overview of the organisation of the file structure here. 

- It should not take much thought to reason that `commands` contains the commands for the bot itself. `context_commands` fulfills a similar role -- context commands are those that appear (in our case) when right-clicking or holding on a message and allow it to be reported.
- `events` very likely should not demand your attention at any point, but it is there that the actual mechanism of passing a command request to the bot is handled.
- `images` shouldn't be anything too shocking.
- `types` are where the types and sometimes classes are stored for use across the codebase. If it is used several times throughout the code, and not just in one place, it should belong here (though for some reason or other I have arbitrarily chosen a few exceptions to this rule).
- `utils` are where you can find helper functions or `enums`, as well as much of the game data that is used in the code and in bot responses to commands. It is likely that if you are not making a new command, **your work will be contained here** as you can find all of the bits and pieces of strategy and guides here (unless of course it is a simple text command, in which case that information is in its relevant file).

To get started:

```bash
bun i
```

will install all necessary packages. However, to run the bot locally for yourself to test you commands, it is a bit more involved. You will need to create an application on the [Discord Developer Portal](https://discord.com/developers/applications) and retrieve your Discord token and application ID. ***YOUR DISCORD TOKEN SHOULD NEVER BE SHARED!*** You will then create a file named `.env` in the root directory, a file that takes the form (without the square brackets)

```bash
DISCORD_TOKEN=[your Discord token]
APPLICATION_ID=[your Discord app ID]
VERSION="you can call it whatever version you want -- this file will not be pushed to Git"
```

and this will allow your bot to log in to Discord. To start the bot and deploy your command, run the following command in your terminal:

```bash
bun run initialise:global
```

This will first deploy your command "globally" (so that it can be used in any server your bot is in, as well as DMs) and also start the bot. However, this does bypass the formatter and linter, so be sure to run

```bash
bun run start
```

so that you can find any code quality issues before you open a pull request.

## *To Have and Have Not*...tested your new command

## A Bit About Git

Need to write
- How to actually make a command, not just how to run the bot