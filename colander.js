var transcribe = require('json-transcriber')

function Colander(rules) {
  if (!(this instanceof Colander)) return new Colander(rules);
  this.rules = rules || {}
}

Colander.prototype = {
  accepts: function(obj) {
    // accept by default if no special acceptance criteria are set
    // but if criteria are set, they must all be met
    var accepted = this.rules.accept_when === undefined;

    // if specified, check acceptance criteria
    if (this.rules.accept_when) {
      var match = true;
      var rules = this.rules.accept_when;
      Object.keys(rules).forEach(function(key) {
        var test = rules[key];
        var value = transcribe.extract(key, obj);

        if (typeof value === 'string') {
          value = value.toLowerCase();
        }

        if (Array.isArray(test)) {
          match = test.indexOf(value) >= 0 && match;
        }
        else {
          match = test == value && match;
        }
      })
      accepted = match;
    }
    return accepted;
  },
  rejects: function(obj) {
    var reject = false;
    // if specified, check rejection criteria
    if (this.rules.reject_when) {
      var rules = this.rules.reject_when;
      Object.keys(rules).forEach(function(key) {
        var test = rules[key];
        var value = transcribe.extract(key, obj);

        if (typeof value === 'string') {
          value = value.toLowerCase();
        }

        if (Array.isArray(test)) {
          reject = (test.indexOf(value) >= 0) || reject;
        }
        else {
          reject = (test == value) || reject
        }
      })
    }
    return reject;
  },
  strain: function(obj) {
    if (Array.isArray(obj)) {
      return obj.filter(this.strain.bind(this))
    }
    else {
      return this.accepts(obj) && !this.rejects(obj);
    }
  },
}

module.exports = Colander
