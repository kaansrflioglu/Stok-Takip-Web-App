const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'database.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Veritabanına bağlanırken bir hata oluştu:', err.message);
  } else {
    console.log('Veritabanına başarıyla bağlanıldı.');
  }
});


db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS stock (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    item TEXT UNIQUE, 
    quantity INTEGER, 
    last_updated TEXT
  )`);
  
  db.run(`CREATE TABLE IF NOT EXISTS spare_parts (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    item TEXT UNIQUE,
    f12_quantity INTEGER DEFAULT 0,
    f14_quantity INTEGER DEFAULT 0,
    f16_quantity INTEGER DEFAULT 0,
    f20_quantity INTEGER DEFAULT 0,
    f24_quantity INTEGER DEFAULT 0,
    f30_quantity INTEGER DEFAULT 0,
    f36_quantity INTEGER DEFAULT 0,
    f40_quantity INTEGER DEFAULT 0,
    f46_quantity INTEGER DEFAULT 0,
    f54_quantity INTEGER DEFAULT 0,
    f60_quantity INTEGER DEFAULT 0,
    f70_quantity INTEGER DEFAULT 0,
    f80_quantity INTEGER DEFAULT 0,
    f90_quantity INTEGER DEFAULT 0,
    f100_quantity INTEGER DEFAULT 0,
    f120_quantity INTEGER DEFAULT 0,
    f150_quantity INTEGER DEFAULT 0,
    f180_quantity INTEGER DEFAULT 0,
    f220_quantity INTEGER DEFAULT 0,
    f230_quantity INTEGER DEFAULT 0,
    f240_quantity INTEGER DEFAULT 0,
    f280_quantity INTEGER DEFAULT 0,
    f320_quantity INTEGER DEFAULT 0,
    f360_quantity INTEGER DEFAULT 0,
    f400_quantity INTEGER DEFAULT 0,
    f500_quantity INTEGER DEFAULT 0,
    f600_quantity INTEGER DEFAULT 0,
    f800_quantity INTEGER DEFAULT 0,
    f1000_quantity INTEGER DEFAULT 0,
    last_updated TEXT
  )`);
});

module.exports = db;
