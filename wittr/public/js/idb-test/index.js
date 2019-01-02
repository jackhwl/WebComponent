import idb from 'idb';

var dbPromise = idb.open('test-db', 4, function(upgradeDb){
  switch(upgradeDb.oldVersion) {
    case 0:
      var keyValStore = upgradeDb.createObjectStore('keyval');
      keyValStore.put('world', 'hello');
    case 1:
      upgradeDb.createObjectStore('people', {keyPath: 'name'});
    case 2:
      var peopleStore = upgradeDb.transaction.objectStore('people');
      peopleStore.createIndex('animal', 'favoriteAnimal');
      upgradeDb.createObjectStore('kvonly', {keyPath: 'name'});
    case 3:
      var peopleStore = upgradeDb.transaction.objectStore('people');
      peopleStore.createIndex('age', 'age');
    }
});

dbPromise.then(function(db){
  var tx = db.transaction('keyval');
  var keyValStore = tx.objectStore('keyval');
  return keyValStore.get('hello');
}).then(function(val){
  console.log('The value of "hello" is:', val);
});

dbPromise.then(function(db){
  var tx = db.transaction('keyval', 'readwrite');
  var keyValStore = tx.objectStore('keyval');
  keyValStore.put('bar', 'foo');
  return tx.complete;
}).then(function() {
  console.log('Added foo: bar to keyval');
});

dbPromise.then(function(db){
  // TODO: in the keyval store, set
  // "favoriteAnimal" to your favourite animal
  // eg "cat" or "dog"
  var tx = db.transaction('keyval', 'readwrite');
  var keyValStore = tx.objectStore('keyval');
  keyValStore.put('dog', 'favoriteAnimal');
  return tx.complete;
}).then(function(){
  console.log('favorite animal added');
});

dbPromise.then(function(db){
  var tx = db.transaction('people', 'readwrite');
  var peopleStore = tx.objectStore('people');

  peopleStore.put({
    name: 'Sam Munoz',
    age: 25,
    favoriteAnimal: 'dog'
  });

  peopleStore.put({
    name: 'Susan Keller',
    age: 34,
    favoriteAnimal: 'cat'
  });

  peopleStore.put({
    name: 'Lillie Wolfe',
    age: 28,
    favoriteAnimal: 'dog'
  });

  peopleStore.put({
    name: 'Marc Stone',
    age: 39,
    favoriteAnimal: 'cat'
  });

  return tx.complete;
}).then(function() {
  console.log('People added');
});

dbPromise.then(function(db){
  var tx = db.transaction('people');
  var peopleStore = tx.objectStore('people');
  var animalIndex = peopleStore.index('animal');

  return animalIndex.getAll();
}).then(function(people){
  console.log('People:', people);
});

dbPromise.then(function(db){
  var tx = db.transaction('people');
  var peopleStore = tx.objectStore('people');
  var ageIndex = peopleStore.index('age');

  return ageIndex.getAll();
}).then(function(people){
  console.log('People by age:', people);
});

dbPromise.then(function(db){
  var tx = db.transaction('people');
  var peopleStore = tx.objectStore('people');
  var ageIndex = peopleStore.index('age');

  return ageIndex.openCursor();
}).then(function(cursor){
  if (!cursor) return;
  return cursor.advance(2);
}).then(function logPerson(cursor){
  if (!cursor) return;
  console.log('Cursored at:', cursor.value.name);
  // cursor.update(newValue);
  // cursor.delete();
  return cursor.continue().then(logPerson);
}).then(function(){
  console.log('Done cursoring');
})
;




// var dbPromise = idb.open('test-db', 1, function(upgradeDb) {
//   var keyValStore = upgradeDb.createObjectStore('keyval');
//   keyValStore.put("world", "hello");
// });

// // read "hello" in "keyval"
// dbPromise.then(function(db) {
//   var tx = db.transaction('keyval');
//   var keyValStore = tx.objectStore('keyval');
//   return keyValStore.get('hello');
// }).then(function(val) {
//   console.log('The value of "hello" is:', val);
// });

// // set "foo" to be "bar" in "keyval"
// dbPromise.then(function(db) {
//   var tx = db.transaction('keyval', 'readwrite');
//   var keyValStore = tx.objectStore('keyval');
//   keyValStore.put('bar', 'foo');
//   return tx.complete;
// }).then(function() {
//   console.log('Added foo:bar to keyval');
// });

// dbPromise.then(function(db) {
//   // TODO: in the keyval store, set
//   // "favoriteAnimal" to your favourite animal
//   // eg "cat" or "dog"
// });
