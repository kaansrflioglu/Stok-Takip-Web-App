const db = require('./database');
const moment = require('moment');

// Stok ekleme
const addStock = (item, quantity, callback) => {
  const stmt = db.prepare("INSERT INTO stock (item, quantity, last_updated) VALUES (?, ?, ?)");
  const currentTime = moment().format('YYYY-MM-DD / HH:mm'); 
  stmt.run(item, quantity, currentTime, function(err) {
    if (err) {
      return callback(err);
    }
    callback(null, this.lastID); 
  });
  stmt.finalize();
};

// Stok güncelleme
const updateStock = (id, quantity, callback) => {
  const stmt = db.prepare("UPDATE stock SET quantity = ?, last_updated = ? WHERE id = ?");
  const currentTime = moment().format('YYYY-MM-DD / HH:mm'); 
  stmt.run(quantity, currentTime, id, function(err) {
    if (err) {
      return callback(err);
    }
    callback(null, this.changes); 
  });
  stmt.finalize();
};

// Stok silme
const deleteStock = (id, callback) => {
  const stmt = db.prepare("DELETE FROM stock WHERE id = ?");
  stmt.run(id, function(err) {
    if (err) {
      return callback(err);
    }
    callback(null, this.changes); 
  });
  stmt.finalize();
};

// Stokları listeleme
const getStocks = (callback) => {
  db.all("SELECT * FROM stock", [], (err, rows) => {
    if (err) {
      return callback(err);
    }
    callback(null, rows);
  });
};

// En son güncellenen stok verisini alma
const getLastUpdatedStock = (callback) => {
  db.get("SELECT * FROM stock ORDER BY last_updated DESC LIMIT 1", [], (err, row) => {
    if (err) {
      return callback(err);
    }
    callback(null, row);
  });
};

// Yedek parça ekleme
const addSparePart = (item, callback) => {
  const stmt = db.prepare("INSERT INTO spare_parts (item, last_updated) VALUES (?, ?)");
  const currentTime = moment().format('YYYY-MM-DD / HH:mm');
  stmt.run(item, currentTime, function(err) {
    if (err) {
      return callback(err);
    }
    callback(null, this.lastID);
  });
  stmt.finalize();
};

// Yedek parça güncelleme
const updateSparePart = (id, quantities, callback) => {
  const currentTime = moment().format('YYYY-MM-DD / HH:mm');
  const setClause = Object.keys(quantities).map(key => `${key} = ?`).join(', ');
  const values = [...Object.values(quantities), currentTime, id];
  const stmt = db.prepare(`UPDATE spare_parts SET ${setClause}, last_updated = ? WHERE id = ?`);
  stmt.run(...values, function(err) {
    if (err) {
      return callback(err);
    }
    callback(null, this.changes);
  });
  stmt.finalize();
};


// Yedek parça silme
const deleteSparePart = (id, callback) => {
  const stmt = db.prepare("DELETE FROM spare_parts WHERE id = ?");
  stmt.run(id, function(err) {
    if (err) {
      return callback(err);
    }
    callback(null, this.changes);
  });
  stmt.finalize();
};

// Yedek parçaları listeleme
const getSpareParts = (callback) => {
  db.all("SELECT * FROM spare_parts", [], (err, rows) => {
    if (err) {
      return callback(err);
    }
    callback(null, rows);
  });
};

// En son güncellenen yedek parça verisini alma
const getLastUpdatedSparePart = (callback) => {
  db.get("SELECT * FROM spare_parts ORDER BY last_updated DESC LIMIT 1", [], (err, row) => {
    if (err) {
      return callback(err);
    }
    callback(null, row);
  });
};

module.exports = {
  addStock,
  updateStock,
  deleteStock,
  getStocks,
  getLastUpdatedStock,
  addSparePart,
  updateSparePart,
  deleteSparePart,
  getSpareParts,
  getLastUpdatedSparePart
};
