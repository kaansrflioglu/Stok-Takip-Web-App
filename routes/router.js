const express = require('express');
const router = express.Router();
const { addStock, updateStock, deleteStock, getStocks, getLastUpdatedStock, addSparePart, updateSparePart, deleteSparePart, getSpareParts, getLastUpdatedSparePart } = require('../database/queries');

// Ana Sayfa
router.get('/', (req, res) => {
  res.render('main');
});

// Makine Sayfası
router.get('/machinery', (req, res) => {
  getStocks((err, stocks) => {
    if (err) {
      return res.status(500).send('Veritabanı hatası');
    }
    getLastUpdatedStock((err, lastUpdatedStock) => {
      if (err) {
        return res.status(500).send('Veritabanı hatası');
      }
      res.render('machinery', {
        stocks,
        lastUpdated: lastUpdatedStock ? lastUpdatedStock.last_updated : 'Henüz güncelleme yapılmadı'
      });
    });
  });
});

// Yedek Parça Sayfası
router.get('/spare-parts', (req, res) => {
  getSpareParts((err, spareParts) => {
    if (err) {
      return res.status(500).send('Veritabanı hatası');
    }
    getLastUpdatedSparePart((err, lastUpdatedSparePart) => {
      if (err) {
        return res.status(500).send('Veritabanı hatası');
      }
      const sizes = ['F12', 'F14', 'F16', 'F20', 'F24', 'F30', 'F36', 'F40', 'F46', 'F54', 'F60', 'F70', 'F80', 'F90', 'F100', 'F120', 'F150', 'F180', 'F220', 'F230', 'F240', 'F280', 'F320', 'F360', 'F400', 'F500', 'F600', 'F800', 'F1000'];
      res.render('spare-parts', {
        spareParts: spareParts.map(part => ({
          ...part,
          quantities: sizes.map((size, index) => part[`f${size.slice(1)}_quantity`] || 0)
        })),
        sizes,
        lastUpdated: lastUpdatedSparePart ? lastUpdatedSparePart.last_updated : 'Henüz güncelleme yapılmadı'
      });
    });
  });
});

// Yeni Makine Stok Ekleme
router.post('/machinery/add', (req, res) => {
  const { item, quantity } = req.body;
  addStock(item, quantity, (err) => {
    if (err) {
      if (err.message.includes('UNIQUE constraint failed')) {
        return res.status(400).send('Bu ürün zaten mevcut.');
      }
      return res.status(500).send('Veritabanı hatası');
    }
    res.redirect('/machinery');
  });
});

// Makine Stok Güncelleme
router.post('/machinery/update/:id', express.json(), (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body; 
  updateStock(id, quantity, (err) => {
    if (err) {
      return res.status(500).send('Veritabanı hatası');
    }
    res.redirect('/machinery');
  });
});

// Makine Stok Silme
router.post('/machinery/delete/:id', (req, res) => {
  const { id } = req.params;
  deleteStock(id, (err) => {
    if (err) {
      return res.status(500).send('Veritabanı hatası');
    }
    res.redirect('/machinery');
  });
});

// Yeni Yedek Parça Ekleme
router.post('/spare-parts/add', (req, res) => {
  const { item } = req.body;
  addSparePart(item, (err) => {
    if (err) {
      if (err.message.includes('UNIQUE constraint failed')) {
        return res.status(400).send('Bu ürün zaten mevcut.');
      }
      return res.status(500).send('Veritabanı hatası');
    }
    res.redirect('/spare-parts');
  });
});

// Yedek Parça Güncelleme Penceresi
router.post('/spare-parts/update/:id', express.json(), (req, res) => {
  const { id } = req.params;
  const quantities = req.body;
  updateSparePart(id, quantities, (err) => {
    if (err) {
      return res.status(500).send('Veritabanı hatası');
    }
    res.redirect('/spare-parts');
  });
});

// Yedek Parça Silme
router.post('/spare-parts/delete/:id', (req, res) => {
  const { id } = req.params;
  deleteSparePart(id, (err) => {
    if (err) {
      return res.status(500).send('Veritabanı hatası');
    }
    res.redirect('/spare-parts');
  });
});

module.exports = router;
