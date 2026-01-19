# <div align="center">ADAnswersBot Contributing Guide</div>

---

## _An Introduction_; or, _The Reason This Took So Long_

First, I would like to take a moment to thank again all of the wonderful contributors who have come before to ADAnswersBot -- without them, of course, nothing here is possible. I am forever indebted to the wonderful community I have found myself immersed in, and I cannot thank them enough for giving me the inspiration to keep working at this silly thing day after day.

With this out of the way, I do want to make a note of some of the mental processes I have worked with as I have developed this rewrite over the course of the last year. It has certainly been a rocky road of insufficient and otherwise intermittent progress, but what I have found is that there is a certain quality to this codebase that (in my mind) is fairly reasonable and simple to become acquainted with.

_If you are simply interested in "how do I make a command" -- feel free to scroll down a bit._

This rewrite was pretty much all done from the ground up. I had first gathered a [couple thoughts](https://canary.discord.com/channels/351476683016241162/351476683016241166/1326035473218404413) from the AD community on how folks wanted this all to happen; it was fairly resounding in the affirmative to simply rewrite the code using [Discord.js](https://discord.js.org/) as the bot was written in originally. I personally had slightly wanted to experiment with my other two options (the first being a new JS/TS library for the bot; the second, a whole new language and framework entirely) -- and privately, I did -- but I found that...well, there is a reason that Discord.js is lauded as the easiest framework to work with: it simply is.

I knew from the start I wanted to write all of this in TypeScript. Say what you will, but the truth is that the language lends itself really nicely to someone (like myself) coming from web development as their gateway into programming in the broader sense, and so I felt it would be fairly reasonable to maintain this general connection; it makes ADAB feel more of a passion project, like coming back to an old friend (education and academia has certainly sucked the soul out of programming, not to mention AI and what have you). AD being in JavaScript already means that folks who may have had a passing glance at either this codebase or AD's could also stand to make a passing glance in the other direction. Those who may have some knowledge of the original iteration (which is nearly five years old!) or some following ones may recall that ADAB was originally written in JavaScript, and this was mostly fine as it fit with what Discord.js guides put out. I also was young and naïve, to be fair, and had I known from the beginning about TypeScript, it's likely this whole thing could have been avoided. Me getting to rewrite the bot nearly five years on from when I started provides me with some interesting perspective on the whole thing -- when you have to rewrite everything, you find out how much sense things like object-oriented programming make, which is a nugget of knowledge I wouldn't have fully appreciated five years ago. I like to think I've matured in my programming reasoning; I suppose you can decide from the product here in front of you if that is for better or worse.

The general idea here is that you can write a command without ever wondering how it gets done -- encapsulation. The backend does not excite much anyone here. _However_, I do want to note that not every command here or command that can be written necessarily fits into some neat box; most notably, [the Eternity Challenges](./commands/eternity_challenges_dilation/eternitychallenge.ts) command suffers this fate. Now, the truth with this is that not many commands that could be conceived from here on in ADAB history would demand the sheer amount of low-level framework finagling that that command (and other commands like it) do. It is a bit of an outlier in that. Many commands are simply text -- these are the ones people like to write. The beautiful thing about that is that I have tried (and Discord.js has tried) to make these as accessible as possible to write. And if you ask me, they have pretty much succeeded in that! What I have done here is tried to shove a good amount of the backend work into classes that are, in a sense, plug-and-play. The user should not have to write much more than a Discord.js `SlashCommandBuilder` and their desired text that the command should output. For that, the [`BasicTextCommand`](./types/commands/BasicTextCommand.ts) was created. A good example to visit for this kind of command is something like [`/contributors`](./commands/misc_bot_server_info/contributors.ts). Then, when a command is created, it can be deployed and added to the bot with relative ease, as (nearly) all command handling is fully dynamic.

I tried to spend as much time as I reasonably could on making sure things here made sense. Some things might not make a ton of sense at first glance, but I think that the truth is that any other framework or language would have likely made things worse around here. There really is some level of "oh, I can do XYZ or ABC basically whenever or however I want" in Discord.js -- though, depending on who you ask, this probably makes things much more dangerous. It is a force to be reckoned with, to be certain.

## _A Tech Stack for the Knowing Ones_

Much progress has been made in the terrifying landscape of "serverside JavaScript runtimes". We truly have been blessed enough to be gifted the wonderful tool [Bun.js](https://bun.sh/), a JavaScript runtime that handles TypeScript natively and also moonlights as a package manager. I have grown weary of Node, npm, and untangling legacy peer dependencies, unfortunately. But Bun pretty much works out of the box, or at least, I can't think of any severe issues I had when setting it up. It receives consistent updates and I can really appreciate the native TS support.

Our Discord framework, as has been mentioned, is Discord.js, which works fine for everything we need. There do exist frameworks on _top_ of Discord.js (namely [Sapphire](https://sapphirejs.dev/)), but I didn't find it to be as extensible for what I wanted and needed out of ADAB. It is certainly neat and does play into the whole OOP thing I do here, so I do recommend checking it out for smaller or less complex projects.

I will also take some time here to mention some of the other tools that I used here while working on the bot. Originally, I had been using [ESLint](https://eslint.org/), an excellent [linter](<https://en.wikipedia.org/wiki/Lint_(software)>) for JavaScript and TypeScript, and so the configuration is still in this repository for that. Ideally, you should be pretty much able to install the ESLint extension in an IDE like [Visual Studio Code](https://code.visualstudio.com/) (my IDE of choice for JavaScript, TypeScript, React, Vue...etc development), and install the relevant packages for the bot, and it should run. However, I have recently been made aware of a new-generation tool (and you know me with my gadgets) known as [Oxc](https://oxc.rs/), which doubles as a linter and formatter and is written in Rust, so it of course is blazingly fast. The goal of including a formatter and linter is to allow there to be extremely consistent code formatting across the whole codebase, which can be done automatically from the CLI (and is handled when certain `bun` scripts are ran). Oxc, too, has a Visual Studio Code extension you can install to implement it.

I chose to complete this rewrite using TypeScript. This is not a major change from before, but I figured I'd mention it -- the safety of it all and the way it forces you to think about the code you are writing is a really nice quality that I have grown to appreciate, even though I've invariably gotten angry with some type error each time I work on the bot. Also, coming soon will be TSGo (TypeScript v7), which will be much faster and more performant than before, so there is at least something to be excited about there.

_You can rejoin here if you're looking at simply making a command, without all my boring yammering._

## _The Sun Also Rises_...on your new command

_If you are not comfortable working with code, that is okay! You can either give it a shot here again, or feel free to open a GitHub issue or use the server suggestions channel in the Antimatter Dimensions Discord._

First, I would like to conduct a general overview of the organisation of the file structure here.

- It should not take much thought to reason that `commands` contains the commands for the bot itself. `context_commands` fulfills a similar role -- context commands are those that appear (in our case) when right-clicking or holding on a message and allow it to be reported.
- `events` very likely should not demand your attention at any point, but it is there that the actual mechanism of passing a command request to the bot is handled.
- `images` shouldn't be anything too shocking.
- `types` are where the types and sometimes classes are stored for use across the codebase. If it is used several times throughout the code, and not just in one place, it should belong here (though for some reason or other I have arbitrarily chosen a few exceptions to this rule).
- `utils` are where you can find helper functions or `enums`, as well as much of the game data that is used in the code and in bot responses to commands. It is likely that if you are not making a new command, **your work will be contained here** as you can find all of the bits and pieces of strategy and guides here (unless of course it is a simple text command, in which case that information is in its relevant file).
  - Things like the Eternity Challenge information, Achievement guides and information, Time Study data...is all contained in here. If it helps, you can always Ctrl+Shift+F in Visual Studio Code to search the entire codebase.

_To install a copy of the code on your own computer, visit the "A Bit About Git" section below._

In this guide, I will take you through the generic process of creating a basic text command. To me, this will likely be all that is required; should something more complicated like embeds be necessary, looking at [`BasicEmbedCommand`](./types/Commands/BasicEmbedCommand.ts) and its implementations (something like the [`/glyph`](./commands/reality/glyph.ts) command) could provide some clues. The use of embeds is governed by the generic [`CustomEmbed`](./types/Embeds/CustomEmbed.ts) class, which is easily extensible for whatever use case may arise.

We can begin by visiting the `commands` directory, and choosing whichever folder you find will correspond the best to the part of the game that your command belongs. Things should be pretty self-explanatory as far as what goes where; the distinct folders here correspond to pages in the `/help` command. Create a file in your chosen folder and given it a name that matches what the command's name will be. I will be looking at [`eternityprogression.ts`](./commands/eternity/eternityprogression.ts) as my "guide". Arguably, you could simply copy the entire contents of that file and simply edit what you need to get a new command working.

Ideally, you should be able to start typing `export default new BasicTextCommand({})` and a small pop-up should appear that, when you press tab, will import `BasicTextCommand` for you, so that you do not need to worry about it. Then, inside your object `{}`, you will need a `data` and `text` field. With properly installed TypeScript, it should throw an error if you are missing something it needs. In `data` will always be a `SlashCommandBuilder()` from Discord.js. This is what will get converted into JSON and sent to Discord; it is where the name of your command comes from. You will then use `.setName()` and `.setDescription()` on it to configure it as you like it. After this, for a basic text command, you simply need to write the `text` field with whatever you want the message to send. That should, in essence, do it.

## _To Have and Have Not_...tested your new command

Testing your command will require some trust (in me) and a loose idea of the command line. Assuming you have implemented your command as specified above, not much more should have to happen here aside from installing your packages and setting up a Discord application.

### A Bit About Git

It is fair to ask what a "pull request" actually is. Or what Git is. Or how GitHub works. These are all reasonable things to wonder in the early goings of your programming. I do not wish to make this document any longer than it already is, so for a GitHub terminology and GitHub Desktop setup guide, visit [this GitHub wiki article I wrote a few years back](https://github.com/IvarK/AntimatterDimensionsSourceCode/wiki/Basic-GitHub-terminology,-GitHub-Desktop-setup) for the Antimatter Dimensions codebase. For the ADAnswersBot repository, you will have to make a _fork_ of the codebase to your own GitHub account to contribute. The reason for this is that you need "write access" to be able to explicitly alter the code of ADAB yourself without a contributor's approval. You are able to create "pull requests" from your fork to my original codebase, so it functionally acts as a "branch" of this codebase, just your own.

_If you are already comfortable using some other Git interface, like Git Bash, a) you're a real one, and b) feel free to skip through this whole Git song and dance here._

To start with [GitHub Desktop](https://desktop.github.com/download/), after you have successfully forked my repository on the GitHub site (there should be a button in the top-right of the main screen), you will want to _clone_ your repository to your computer. This way, you will have a full copy of all of the code in ADAB on your computer, and it will already be a functioning Git repository. You need not worry too much about the specifics and semantics of it all, just know that you now have the code on your computer and you can now edit the code. When you are done, GitHub Desktop should show a summary of your changes and a few text boxes to enter in a name for your commit and a small, optional description. After you commit the code, you will see a button along the top header change to allow you to push the code to your remote repository. Doing so will publish the code on GitHub on your fork, and it is from here that you can open a pull request to the original codebase.

If you visit the original codebase on GitHub after committing to your fork, there may be a yellow banner that appears that would allow you to create a pull request from your codebase to the original repository. If that appears, then you can simply click the green button and follow the steps there. Otherwise, go to the "Pull Requests" tab on the top bar, and click "New pull request". From there, you should be able to select your fork and branch to open the pull request, then simply follow the instructions to post it. I promise you -- I will receive a notification and get to it as soon as I can. I will **absolutely** ask of you that you _test_, _lint_, and _format_ your code and command before creating a pull request -- follow the steps below to handle all of that -- so that I don't have to leave snippy comments on your code about your formatting, or that something doesn't work.

### Installing packages and testing your command

You can do one of the following:

1. Use a built-in terminal to Visual Studio code to handle all command line stuff here;
2. Open your own command prompt and navigate to the directory with the code.

To get started:

```bash
bun i
```

will install all necessary packages. However, to run the bot locally for yourself to test your commands, it is a bit more involved. You will need to create an application on the [Discord Developer Portal](https://discord.com/developers/applications) and retrieve your Discord token and application ID. **_YOUR DISCORD TOKEN SHOULD NEVER BE SHARED!_** You will then create a file named `.env` in the root directory, a file that takes the form (without the square brackets)

```bash
DISCORD_TOKEN=[your Discord token]
APPLICATION_ID=[your Discord app ID]
VERSION="you can call it whatever version you want -- this file will not be pushed to Git"
```

and this will allow your bot to log in to Discord. To start the bot and deploy your command, run the following command in your terminal:

```bash
bun run initialise:global
```

This will first deploy your command "globally" (so that it can be used in any server your bot is in, as well as DMs) and also start the bot. You can now (hopefully) run your command! Test it however you please. However, this does bypass the formatter and linter, so be sure to run

```bash
bun run start
```

so that you can find any code quality issues before you open a pull request.

## _Three Stories and Ten Extensions_

The least I can do is go over my Visual Studio Code setup. There are a few extensions that I frequently use or otherwise find imperative to working in a GitHub repository. In alphabetical order they are as follows:

- [**Discord Presence**](https://marketplace.visualstudio.com/items?itemName=icrawl.discord-vscode): a fully configurable Discord Rich Presence updater so that all of your friends can see how much of a loser you are;
- [**Error Lens**](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens): to make it easier to see any errors that you have caused;
- [**ESLint**](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint): though I mostly use `oxlint` now, this is still an extremely powerful extension for code quality;
- [**GitLens**](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens): more helpful for large repositories with many contributors, but in effect lets you look into the past and see who has contributed on whatever file;
- [**JavaScript and TypeScript Nightly**](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-next): a consistently updated TypeScript version for use in VSCode;
- [**Oxc**](https://marketplace.visualstudio.com/items?itemName=oxc.oxc-vscode): powers `oxlint` and `oxfmt` for use as a formatter and linter within Visual Studio Code itself;
- [**Path Intellisense**](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense): an extension that autocompletes filenames;
- [**TODO Highlight**](https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight) and [**Todo Tree**](https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.todo-tree): kind of the same vein here, but both make TODOs stick out more and able to be viewed in a reasonable format;
- and...well, I was going to do ten, but I only found nine that I thought would be actually helpful.

## Some Basic Guidelines

I unfortunately do not have a good way of strangely incorporating a Hemingway title here.

In general, I have tried to make it as easy to contribute to this silly thing as I could. I have grown older by accident, and I have less time than I've had ever before. As such, it was my goal to make it reasonable for anybody to edit or move things around here. To a degree, I find that I have succeeded in this task, and so here are some guidelines for all ye who enter here.

1. Never write code you would be shocked to see, or that you aren't used to seeing.
2. Never write a lot of code when a little code will do.
3. If it is possible to cut code out, always cut it out.
4. Never use functional programming where you can use object-oriented programming.
5. Never use a strange feature of TypeScript when you can think of an everyday equivalent.
6. Break any of these rules sooner than write anything outright barbarous.

I'm getting word that I ripped off Orwell's _Politics and the English Language_. Regardless, write reasonable, well-structured, human-readable code. I do not believe that this codebase is some mecca of code quality (rather, quite the opposite), but I do think there are standards that should be adhered to (as given in the formatter and linter configuration files).

Thank you for your contribution!
