'use strict';

var indexedDB = window.indexedDB || window.webkitIndexedDB ||
      window.mozIndexedDB || window.msIndexedDB;
if (!window.indexedDB) {
  window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
}

var History = {
  DBNAME: 'history',
  DB_VERSION: 4,
  STORENAME: 'history',

  // Database methods
  getList: function ad_getList(callback) {
    this.query(this.DBNAME, this.STORENAME, this.load, callback);
  },

  putRecord: function ad_putRecord(record, callback) {
    this.query(this.DBNAME, this.STORENAME, this.put, callback, record);
  },

  getRecord: function ad_getRecord(key, callback) {
    this.query(this.DBNAME, this.STORENAME, this.get, callback, key);
  },

  deleteRecord: function ad_deleteRecord(key, callback) {
    this.query(this.DBNAME, this.STORENAME, this.delete, callback, key);
  },

  // general db constructor
  query: function ad_query(dbName, storeName, func, callback, data) {

    var request = indexedDB.open(dbName, this.DB_VERSION);

    request.onsuccess = function(event) {
      func(request.result, storeName, callback, data);
    };

    request.onerror = function(event) {
      console.error('Can\'t open database', dbName, event);
      // event.target.errorCode
    };

    // DB init
    request.onupgradeneeded = function(event) {
      console.log('database upgrade needed, upgrading.');
      var db = event.target.result;
      // init data
      History._initDB(db, storeName);
      //
      console.log('Upgrading db done');
    };
  },

  // if db exist, delete then create new one
  _initDB: function ad_initDB(db, storeName) {
      const initData = [
        { bmi: "20.1", timestamp: new Date("2013/7/5").getTime() },
        { bmi: "25.6", timestamp: new Date("2013/7/21").getTime() }
      ];

      if (db.objectStoreNames.contains(storeName))
        db.deleteObjectStore(storeName);
      var objectStore = db.createObjectStore(storeName, {keyPath: 'id', autoIncrement: true});
      // Create an index to search customers by name. We may have duplicates
      // so we can't use a unique index.
      // objectStore.createIndex("bmiIndex", "bmi", { unique: false });
      // objectStore.createIndex("timestampIndex", "timestamp", { unique: false });
      // Store values in the newly created objectStore.
      for (var i in initData) {
        objectStore.add(initData[i]);
      }
  },

  // add data
  put: function ad_put(database, storeName, callback, item) {
    var transaction = database.transaction(storeName, 'readwrite');
    var store = transaction.objectStore(storeName);

    var request = store.put(item);

    request.onsuccess = function(event) {
      item.id = event.target.result;
      if (callback)
        callback(item);
    };

    request.onerror = function(e) {
      console.error('Add operation failure: ', database.name,
        storeName, e.message, request.errorCode);
    };
  },

  load: function ad_load(database, storeName, callback) {
    var items = [];

    var transaction = database.transaction(storeName);
    var store = transaction.objectStore(storeName);

    var cursor = store.openCursor(null, 'prev');
    cursor.onsuccess = function(event) {
      var item = event.target.result;
      if (item) {
        items.push(item.value);
        item.continue();
      } else {
        callback(items);
      }
    };

    cursor.onerror = function(event) {
      callback([]);
    };
  },

  get: function ad_get(database, storeName, callback, key) {
    var transaction = database.transaction(storeName);
    var store = transaction.objectStore(storeName);
    var request = store.get(key);

    request.onsuccess = function(event) {
      callback(request.result);
    };

    request.onerror = function(event) {
      console.error('Get operation failure: ', database.name,
        storeName, e.message, request.errorCode);
    };
  },

  delete: function ad_delete(database, storeName, callback, key) {
    var transaction = database.transaction(storeName, 'readwrite');
    var store = transaction.objectStore(storeName);
    var request = store.delete(key);

    request.onsuccess = callback;

    request.onerror = function(e) {
      console.error('Delete operation failure: ', database.name,
        storeName, e.message, putreq.errorCode);
    };
  }
};

/*
var History.DB = {
  var request = indexedDB.open(dbName, 1);

  request.onsuccess = function(event) {
    func(request.result, storeName, callback, data);
  };

  request.onerror = function(event) {
    console.error('Can\'t open database', dbName, event);
  };

  // DB init
  request.onupgradeneeded = function(event) {
    console.log('database upgrade needed, upgrading.');
    var db = event.target.result;
    if (db.objectStoreNames.contains(storeName))
      db.deleteObjectStore(storeName);
    db.createObjectStore(storeName, {keyPath: 'id', autoIncrement: true});
    console.log('Upgrading db done');
  };

  _initDB
};*/