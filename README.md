# Refined Peapod

[![Build Status](https://travis-ci.org/soleo/refined-peapod.svg?branch=master)](https://travis-ci.org/soleo/refined-peapod)

An opinionated way of using Peapod. I'm not saying this is the only way,
but I do like cleaner design rather than complex.

### UI Improvements
- [X] Night Mode Support
- [X] Cleaner Category Tree and Remove Icons Before the Category Name
- [X] Larger font size for the headings and copy block in splash pages
- [X] Better Alignment for specials pod groups shelf header
- [X] Remove all sales flags to make UI cleaner
- [X] Simplify Navigation and Removed Express Shop, Delivery Time and Favorites
- [X] Remove Notification Bar and Hi, User Message
- [ ] Auto "view more" when scroll down to the button position
- [ ] Scroll To Top In Product Search Results
- [ ] Highlight Each Ingredient in Item Detail and Link to Wiki (I want to learn more about them)
- [ ] Add share link to each item detail so that I can share with other people and help them find the product I saw
- [ ] Support Custom Domain Name

### Function Improvements
- [ ] Linkify the content in Item Detail
- [ ] Quick Search in Google, Amazon, Instacart
- [ ] Add "Request an Item" to the top Navigation

### Installation

[Download From Chrome Webstore](https://chrome.google.com/webstore/detail/refined-peapod/ldecagemlljkdfmjbebocobandonleok)

### Development

```shell
$ yarn
$ yarn run watch
```

#### Load Extension In Chrome

- Visit chrome://extensions/ in Chrome
- Enable the Developer mode
- Click on Load unpacked extension
- Select the folder extension

### Publish

```shell
$ yarn run release
```

### Reference

- [Using Webstore API](https://developer.chrome.com/webstore/using_webstore_api)
- [How to generate Google API keys](https://github.com/DrewML/chrome-webstore-upload/blob/master/How%20to%20generate%20Google%20API%20keys.md)

