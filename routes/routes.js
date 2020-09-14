const express = require('express');

const {
    insertCategory,
    getActiveCategory,
    getAllCustomer,
    removeCategory,
    activeUpdate,
    inactiveUpdate,
    getInactiveCategory
    } = require("../controller/products");

const isAdmin = require('../middleware/isAdmin');

const router = express.Router();

router.post('/category',insertCategory);
router.get('/category',getActiveCategory);
router.get('/incategory',getInactiveCategory);
router.delete('/category/:id', removeCategory);
router.get('/customer', getAllCustomer);

router.put('/status/active', activeUpdate);
router.put('/status/inactive', inactiveUpdate);

module.exports = router;