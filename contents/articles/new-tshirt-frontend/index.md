---
title: I Rebuilt The Jason's Tees Frontend!
author: Jason Lambert
date: 2021-05-07
template: article.pug
graphic: /images/jasons-tees-logo.png
---

One of my favorite projects in recent years was my custom ebay lister I made for my (failure of a) t-shirt business.
The project originally started out as a for-my-eyes-only ordeal, but I have made some modifications and it is now a public website.

<span class="more"></span>

You can play around with it right [here][jasonstees].

My original attempt at the website was somewhat... unattractive.

[![](old-version.jpg 'My first attempt..')](old-version.jpg)

Most importantly, it was not secure. For starters, I put the database access keys directly in the public javascript. I can't be too upset at myself considering this was never meant to be seen by other people.

### Time To Learn Angular!

I just wanted to see what all the hype was about, to be honest. It was a toss up for me between Angular and React.
I really fell in love with Angular. My old client side javascript got pretty garbled up by the time everything was working the way I wanted and when I came back to refactor the code for public consumption, I had a very difficult time parsing through what I had done.

The Angular environment is very modular which helped me organize my thoughts and of course my actual code.

This is what I came up with for the new version.

[![](new-version.jpg 'Try, try again!')](new-version.jpg)

Not too shabby, my dear sir.

### The Results Are In

[![](for-sale.jpg 'Buy my shirt!')](for-sale.jpg)

The full scale mockup image looks pretty good, btw.
Credit to [Fred's t-shirt script][fred]. Excellent work, Fred.

[![](for-sale-zoomed.jpg 'Detail')](for-sale-zoomed.jpg)

### Next Steps

Once you click publish, the server gets to work creating the full size mockup images and uploads them to Ebay along with all of the information required to sell an actual t-shirt.
Most of this is automatically filled in, including prices.

The code responsible for these assumed values is [right here][my-pricing-code].

My next steps for Jason's Tees is to allow the user to customize all of these values in the settings panel.

Another cool idea I'm considering implementing would be to set up a websocket to feed all of those console logs to the client so the user can see some sort of feedback. Right now you click publish and just hope for the best.

[jasonstees]: https://t-shirts.jasonlambert.io/create
[old-version]: https://t-shirts.jasonlambert.io/old-version
[my-pricing-code]: https://raw.githubusercontent.com/selfVSmind/jasons-tees-backend/main/ebay/createEbayListing.js
[fred]: http://www.fmwconcepts.com/imagemagick/tshirt/index.php
