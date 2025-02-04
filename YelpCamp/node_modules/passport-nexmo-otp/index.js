const PassportStrategy = require("passport-strategy");
const { defaultsDeep, has } = require("lodash");
const debug = require("debug")("passport:nexmo-otp");

const defaultOptions = {
  phoneField: "phone",
  codeField: "code"
};

class Strategy extends PassportStrategy {
  constructor({ nexmo, ...options }) {
    super();
    this.nexmo = nexmo;
    this.options = defaultsDeep({}, options, defaultOptions);
    debug(this.options);
  }

  request(number, brand, done) {
    this.nexmo.verify.request(
      { number: "+1 " + number, brand },
      (err, response) => {
        if (err) debug("verify request error:", err);

        // ignore status 10 - "Concurrent verifications to the same number are not allowed"
        if (err && response.status !== "10") {
          done(err);
        } else {
          done(null, response);
        }
      }
    );
  }

  verify(request_id, code, done) {
    this.nexmo.verify.check({ request_id, code }, (err, response) => {
      if (err) {
        done(err);
      } else if (response.status === "0") {
        done(null, response);
      } else {
        done(new Error(response.error_text));
      }
    });
  }

  authenticate(req, options = {}) {
    debug("otp()", req.session.passport.otp_verified);

    if (req.session.passport.otp_verified) {
      return this.pass();
    }

    const { phoneField, codeField, brand } = defaultsDeep(
      {},
      options,
      this.options
    );

    const request_id = req.flash("passport_nexmo_verify")[0];

    if (!request_id) {
      debug("no request_id waiting for verification");

      if (!has(req.body, phoneField)) {
        debug("missing", phoneField);
        return this.fail(new Error(phoneField + " is required"));
      }

      const number = req.body[phoneField];
      debug("requesting verification for", number);

      return this.request(number, brand, (err, response) => {
        if (err) {
          debug(err, response);
          return this.fail(err);
        }
        req.flash("passport_nexmo_verify", response.request_id);
        this.fail();
      });
    } else {
      debug("verifying request_id", request_id);

      if (!has(req.body, codeField)) {
        return this.fail(new Error(codeField + " is required"));
      }

      const code = req.body[codeField];
      debug("verifying code", code);

      return this.verify(request_id, code, (err, response) => {
        if (err) {
          debug(err);
          return this.fail(err);
        }
        debug("verified successfully", request_id, code, response);
        req.session.passport.otp_verified = Date.now();
        this.pass();
      });
    }
  }
}

module.exports = { Strategy };
