var colander = require("./colander.js")

module.exports = {
  "test basic accept filters": function(test) {
    var steves = {
      accept_when: { "name": "steve" }
    }
    var steveFilter = colander(steves);
    test.ok(steveFilter.accepts({name: "steve"}), "accept steve")
    test.ok(steveFilter.accepts({name: "Steve"}), "accept Steve")
    test.ok(!steveFilter.accepts({name: "Joe"}), "don't accept Joe")

    var dontcare = colander()
    test.ok(dontcare.accepts({anything: 'foobar'}), "accept anything if nothing specific provided")
    test.done()
  },
  "test array accept filter": function(test) {
    var even = colander({
      accept_when: {'number': [2, 4, 6, 8]}
    })
    test.ok(even.accepts({number: 2}))
    test.ok(even.accepts({number: 4}))
    test.ok(even.accepts({number: 6}))
    test.ok(even.accepts({number: 8}))
    test.ok(!even.accepts({number: 1}))
    test.ok(!even.accepts({number: 3}))
    test.ok(!even.accepts({number: 5}))
    test.ok(!even.accepts({number: 9}))
    test.done()
  },
  "test basic reject filters": function(test) {
    var steves = {
      reject_when: { "name": "steve" }
    }
    var steveFilter = colander(steves);
    test.ok(steveFilter.rejects({name: "steve"}), "reject steve")
    test.ok(steveFilter.rejects({name: "Steve"}), "reject Steve")
    test.ok(!steveFilter.rejects({name: "Joe"}), "don't reject Joe")

    var dontcare = colander()
    test.ok(!dontcare.rejects({anything: 'foobar'}), "don't reject anything if nothing specific provided")
    test.done()
  },
  "test array reject filter": function(test) {
    var even = colander({
      reject_when: {'number': [2, 4, 6, 8]}
    })
    test.ok(even.rejects({number: 2}))
    test.ok(even.rejects({number: 4}))
    test.ok(even.rejects({number: 6}))
    test.ok(even.rejects({number: 8}))
    test.ok(!even.rejects({number: 1}))
    test.ok(!even.rejects({number: 3}))
    test.ok(!even.rejects({number: 5}))
    test.ok(!even.rejects({number: 9}))
    test.done()
  },
  "test filter": function(test) {
    var values = [
      {a: 1, b: 1},
      {a: 1, b: 1},
      {a: 1, b: 0},
      {a: 2, b: 1},
      {a: 2, b: 0},
      {a: 2, b: 0},
    ]
    var f = colander({
      accept_when: {a: [1, 2]},
      reject_when: {b: 0}
    })
    var matches = f.strain(values)
    test.equal(matches.length, 3)
    test.equal(matches[0].a, 1)
    test.equal(matches[0].b, 1)
    test.equal(matches[1].a, 1)
    test.equal(matches[1].b, 1)
    test.equal(matches[2].a, 2)
    test.equal(matches[2].b, 1)
    test.done()
  }
}
