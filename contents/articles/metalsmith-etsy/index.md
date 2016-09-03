---
title: The Beginnings of a Metalsmith Plugin
author: Jason Lambert
date: 2016-09-02
template: article.jade
---

The beauty of [Metalsmith][metalsmith] is in its simplicity. It doesn't assume anything about your project or what you want to achieve. Instead it relies on plugins to transform your information into something new. Most people think of Metalsmith as a static site generator and I am no different.

### But What If I Don't Want to Build a Blog?

<span class="more"></span>

Like I tried to express, Metalsmith is capable of almost ***anything***. So what if you're interested in building an ecommerce site. Specifically, what if you want to build a website to showcase your Etsy shop?

### Metalsmith Can Do This!

Quite easily, in fact. But we'll need to add the functionality ourselves. Let's say your Metalsmith build file looks something like this:

```javascript
var Metalsmith = require('metalsmith'),
    markdown = require('metalsmith-markdown'),
    templates = require('metalsmith-templates')

Metalsmith(__dirname)
    .use(markdown())
    .use(templates({
        engine: 'handlebars',
        partials: {
            header: 'partials/header',
            footer: 'partials/footer'
        }
    }))
    .destination('./build')
    .build(function (err) { if(err) console.log(err) })
```

We're going to squeeze our code in at the very top of that daisychain like so:

```javascript
var Metalsmith = require('metalsmith'),
    markdown = require('metalsmith-markdown'),
    templates = require('metalsmith-templates'),
    my_custom_etsy_plugin = require('./my_custom_etsy_plugin.js')

Metalsmith(__dirname)
    .use(my_custom_etsy_plugin())
    .use(markdown())
    .use(templates({
        engine: 'handlebars',
        partials: {
            header: 'partials/header',
            footer: 'partials/footer'
        }
    }))
    .destination('./build')
    .build(function (err) { if(err) console.log(err) })
```

Beautiful! Ok let's make a new file named **my_custom_etsy_plugin.js** and put this inside:

```javascript
var getJSON = require('get-json')
var request = require('sync-request');

module.exports = function (options) {
    
    var my_etsy_api_key = '<your_api_key>'
    var my_etsy_shop_name = 'StickToThePlannerCOM'

    return function (files, metalsmith, done) {

        // Let's grab the first 5 active listings for testing's sake
        getJSON('https://openapi.etsy.com/v2/shops/' + my_etsy_shop_name + '/listings/active?limit=5&api_key='+my_etsy_api_key, function(error, response){
         
            if(error) console.log(error)

            else {
                
                var allActiveListings = []
                
                // loop through every active etsy listing in the shop
                response.results.forEach(function(listing) {
                    
                    // make up a name of a virtual markdown file named after the etsy listing id
                    var workingFile = 'listings/' + listing.listing_id + '/index.md'
                    
                    // push that file to allActiveListings
                    allActiveListings.push('listings/' + listing.listing_id + '/index.html')
                    
                    // OK this is the fun part!
                    // We're creating a virtual markdown file that the other Metalsmith plugins can manipulate!!
                    // When doing this sort of thing DO NOT FORGET the contents variable.. It is required by the Metalsmith environment
                    // Also note that we're using a Handlebars template named listing that we will define next
                    files[workingFile] = {contents: listing.description, etsy_link: listing.url, template: 'listing.hbt'}

                    // let's grab all of the images for the listing
                    // etsy api requires that you do this in a seperate request
                    var res = request('GET', 'https://openapi.etsy.com/v2/listings/' + listing.listing_id + '/images?api_key='+my_etsy_api_key);

                    var jsonRes = JSON.parse(res.getBody())
                    
                    // I'm choosing to make an array with a url to each image
                    // We're going to pass this into the virtual markdown file as YAML data
                    files[workingFile].listingImages = []
                    jsonRes.results.forEach(function(result) {
                        files[workingFile].listingImages.push(result.url_fullxfull)
                    })

                    // OK this last part is so we can reference our virtual files later from the site's root index.md
                    var indexContentString = ''
                    allActiveListings.forEach(function(listingLink) {
                        indexContentString += '<a href="' + listingLink + '">' + listingLink + '</a><br>'
                    })
                    files['index.md'].contents = indexContentString
                })
            }
            
            // done() signifies our re-entry into the daisychain we snuck into earlier
            done()         
        })
    }
}
```

If you're wondering where to get your API key, you have to [register a new Etsy app here][register_etsy]. Just make up whatever you want! It's free and you can always make another if you're unhappy with the name.

We'll need to define our **listing.hbt**

```handlebars
{{> header}}

<h2>{{title}}</h2>

<div class="product-images">
    <ul>
        <li>
            <img src="{{listingImages.[0]}}">
        </li>
        <li>
            <img src="{{listingImages.[1]}}">
        </li>
        <li>
            <img src="{{listingImages.[2]}}">
        </li>
        <li>
            <img src="{{listingImages.[3]}}">
        </li>
    </ul>
</div>

{{> footer}}
```

Make sure to install the dependencies:

```sh
npm install --save get-json
```
and..
```sh
npm install --save sync-request
```

So far so good. Now build your project.
```sh
node build
```

Here is the result:

```
├── listings
│   ├── 461955714
│   │   ├── index.html
│   ├── 461956582
│   │   ├── index.html
│   ├── 461957474
│   │   ├── index.html
│   ├── 461981564
│   │   ├── index.html
│   ├── 475445151
│   │   ├── index.html
└── index.html
```

Not very pretty but it was a success! Let's take a look at [**listings/461955714/index.html**][exampleoutput]. (Don't forget to Ctrl+U)

The paragraph tag was an unexpected artifact but we clearly accomplished our goal. In a later post we can make this more generalized and get it published as an official node package! Until next time..

[metalsmith]: http://www.metalsmith.io/
[register_etsy]: https://www.etsy.com/developers/register
[exampleoutput]: ./examplelisting.html