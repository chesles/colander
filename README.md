# Colander

Colander is a simple rule-based filtering tool. Keep the stuff you want,
discard the stuff you don't.

# installation

    npm install colander

# usage

Code speaks louder than words, so here we go. Say we have some spaghetti that's
just finished cooking, so it's still in the water...

    var pot = [
      {type: "spaghetti"},
      {type: "water"},
      {type: "spaghetti"},
      {type: "water"},
      {type: "water"},
      {type: "spaghetti"},
      {type: "spaghetti"},
      {type: "water"},
    ]

    var colander = require('colander')
    var strainer = colander({
      accept_when: {"type": "spaghetti"},
      reject_when: {"type": "water"}
    })

    // test some individual objects
    strainer.strain({type: "spaghetti"}) // => true
    strainer.strain({type: "water"}) // => false

    // strain the whole pot at once
    strainer.strain(pot)
