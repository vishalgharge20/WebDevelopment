# passport-nexmo-otp

[![Dependency Status](https://img.shields.io/david/compwright/passport-nexmo-otp.svg?style=flat-square)](https://david-dm.org/compwright/passport-nexmo-otp)
[![Download Status](https://img.shields.io/npm/dm/passport-nexmo-otp.svg?style=flat-square)](https://www.npmjs.com/package/passport-nexmo-otp)
[![Sponsor on GitHub](https://img.shields.io/static/v1?label=Sponsor&message=❤&logo=GitHub&link=https://github.com/sponsors/compwright)](https://github.com/sponsors/compwright)

Nexmo one-time-pin (OTP) strategy for Passport.js

## Requirements

* Node.js 8+
* [nexmo](https://www.npmjs.com/package/nexmo)

## Installation

```bash
$ npm install --save passport-nexmo-otp nexmo
```

## Usage

app.js:

```javascript
const path = require("path");
const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const OtpStrategy = require("passport-nexmo-otp").Strategy;
const nexmo = require("nexmo");

const app = express();
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.urlencoded({ extended: false }));
app.use(express.session(...));
app.use(flash());
app.use(passport.init());
app.use(passport.session());

passport.use("otp", new OtpStrategy({
  nexmo: new Nexmo(nexmoConfig),
  brand: "My App",
  phoneField: "phone",  // optional
  codeField: "code"     // optional
}));

app.get("/otp", (req, res) => {
  if (get(req, "session.flash.passport_nexmo_verify", []).length === 0) {
    res.render("otp", {
      title: "Request security code",
      verify: false,
      error: req.flash("error")
    });
  } else {
    res.render("otp", {
      title: "Enter security code",
      verify: true,
      error: req.flash("error")
    });
  }
});

// To chain this strategy with a primary authentication strategy, such as passport-local,
// see passport-compose (https://www.npmjs.com/package/passport-compose).
app.post("/otp", passport.authenticate("otp", {
  failureRedirect: "/otp",
  failureFlash: true,
  successRedirect: "/"
}));
```

otp.pug:

```
doctype html
html
  head
    title= title
    
  body
    h1= title

    if error
      p #[b= error]

    form(method='POST')
      if !verify
        p
          label Mobile Phone
          br/
          input(type='phone' name='phone' placeholder='XXX-XXX-XXXX' required)
      
      else
        p
          label Security Code
          br/
          input(type='text' name='code' placeholder='Security Code' required)
    
      button(type='submit') Submit
```

## License

MIT license
