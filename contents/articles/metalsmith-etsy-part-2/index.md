---
title: Metalsmith Etsy Boilerplate Project
author: Jason Lambert
date: 2016-09-06
template: article.jade
---

This is a part two of a [previous post][partone].

### Metalsmith-Etsy is Live
You can check out [metalsmith-etsy on NPM][npm].

The [metalsmith-etsy github repo][github] is also available for public gawking.

### Documentation
So if you followed the [previous post][partone], congratulations. I wasn't very coherent plus I assumed a lot of familiarity with Metalsmith in my instructions.

I've decided that the best way to show you how the plugin is designed to work is just to give you a working example. You can [find that example here][boilerplate].

The instructions that come with the boilerplate project are very straightforward, so I'm just going to copy them here.

Please contact me with any suggestions or errors in my work or for fun or with cute cat pictures.

## metalsmith-etsy-boilerplate
Essential boilerplate code to get you up and running with a custom Etsy website.

## Installation
    $ git clone http://github.com/selfVSmind/metalsmith-etsy-boilerplate.git
    $ cd metalsmith-etsy-boilerplate
    $ npm install
    
## Requirements
You must [register for and Etsy API key](https://www.etsy.com/developers/register) and enter that key in **build.js**.

My Etsy shop name is filled in for demonstration purposes so keep that or change it to your own shop.

The **listing_template** field is important. Right now it is set to a Handlebars template. You can change the project to use Jade instead and update the template.

## Build
    $ node build
    
## What's Next?
Now I suggest you brush off your CSS skills and make this site worth looking at. Have fun!

[partone]: http://jasonlambert.io/articles/metalsmith-etsy
[npm]: https://www.npmjs.com/package/metalsmith-etsy
[github]: https://github.com/selfVSmind/metalsmith-etsy
[boilerplate]: https://github.com/selfVSmind/metalsmith-etsy-boilerplate