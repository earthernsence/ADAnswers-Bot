/* eslint-disable max-len */
"use strict";

// These are genius shortened versions of the achievement names, what do you mean?

module.exports = {
  number: 2,
  name: "achievements",
  description: "sends link to achievements guide",
  // eslint-disable-next-line complexity
  execute(message, args) {
    switch (args[0]) {
    case "r23":
    case "9d":
      message.channel.send(`Get it after your first galaxy and the 90 8th dim costing dimboost by toggling Until 10 next to tickspeed.`);
      break;
    case "r28":
    case "tnp":
      message.channel.send(`After you have e150 1st dims, toggle Until 10 next to tickspeed and buy a 1st dim.`);
      break;
    case "r36":
    case "claus":
      message.channel.send(`Do ***not*** do this on your first Infinity. When you Infinity, Galaxies are reset back to 0, so you can attempt it later when it's easier.`);
      break;
    case "r41":
    case "sc":
      message.channel.send(`Get it after infinity. Change notation to Cancer in options and buy 10 galaxies. You can just switch to Cancer Notation before buying a Galaxy.`);
      break;
    case "r71":
    case "909":
      message.channel.send(`Do it after the e39 ID2. Disable boost, galaxy and all dim autobuyers, go into C2 and buy 10 1st dims.`);
      break;
    case "r73":
    case "zd":
      message.channel.send(`Trivial after you get ID1 in C3. It doesn't need to be attempted early; if it is, it takes about 16+ hours before ID1.`);
      break;
    case "r81":
    case "hdnw":
      message.channel.send(`Trivial after Eternity. You can do it before then, but it's more tedious.`);
      break;
    case "r88":
    case "2mi":
      message.channel.send(`Buy TS 32, disable galaxy autobuyer, set boost autobuyer to 0s, and crunch autobuyer to 0.1-1s depending on how long it takes to buy dimboosts for 32.`);
      break;
    case "r91":
    case "r92":
    case "r98":
    case "ls":
    case "ibfn":
    case "ytih":
      message.channel.send(`Trivial after Eternity. Takes up too much time pre-Eternity, and Eternity just simplifies it a whole lot.`);
      break;
    case "r107":
    case "dyrnagft":
      message.channel.send(`Respec out of TS 32 and infinity in under 5s to avoid multiplying your infinity gain. Effortless with TS181.`);
      break;
    case "r108":
    case "wca9":
    case "r116":
    case "dirnti":
      message.channel.send(`Get it once you can eternity easily without buying replicanti, then do an eternity and buy 100% replicanti chance and a few interval upgrades.`);
      break;
    case "r111":
    case "yd":
      message.channel.send(`Get it once you can quickly reach e4000 IP. Set autocrunch to 1.8e308, eternity, and wait.`);
      break;
    case "r114":
    case "yam":
      message.channel.send(`Can only be done in EC4 and EC12, as those are the only Eternity Challenges that can be failed.`);
      break;
    case "r125":
    case "lfoab":
      message.channel.send(`Only possible after you buy TS 181. Using idle, disable AD/ID autobuyers, enter normal challenge 12, and buy a 4th dim. Will take ~30-60 minutes.`);
      break;
    case "r126":
    case "pm":
      message.channel.send(`Reach at least 180 max RGs (can buy antimatter galaxies). Use active path because of 50% more RGs. Disable galaxy autobuyer, crunch, then buy 180 RGs.`);
      break;
    case "r131":
    case "nec":
      message.channel.send(`See \`++infinitygrinding\`.`);
      break;
    case "r133":
    case "inltisa":
      message.channel.send(`Disable the autobuyer for the IP multiplier on the Infinity Upgrades (not Break Infinity Upgrades!) tab.

Due to eternity milestone 7 you beat ICs as soon as you unlock them. But you don't have the rewards in the first few ticks on a new eternity, because you still need to reach the amount of AM to unlock those ICs.
This achievements grants you those rewards even if you haven't unlocked ICs yet.
However, this achievement reward is pretty much negligible as not having the IC rewards in the first ~100ms won't hinder you that much.`);
      break;
    case "r134":
    case "wwibe":
      message.channel.send(`Disable RG autobuyer while grinding banked infinities and wait. Done in conjunction with r131 (No Ethical Consumption).`);
      break;
        
    default:
      if (args.length === 0) message.channel.send(`Check out this cool guide by Hellbach! https://docs.google.com/document/d/1C8W_lt9EPxpu9wIloWZo5CPDdZ4ItP1-IU1Vs3x7lEg`);
      else if (!(args.length === 0)) message.channel.send(`This achievement is either useless or can easily be achieved.`);
      else message.channel.send(`Hi.`);
    }
  }
};
