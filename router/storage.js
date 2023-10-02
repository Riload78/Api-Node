const express = require('express')
const router = express.Router()
const { createItem, getItem, getItems, deleteItem } = require('../controller/storage')
const { validatorGetItem } = require('../validators/storage')

const uploadMiddleware = require('../utils/handleStorage')

/****
* Get all Items
* @param {*} req
* @param {*} res
****/
router.get('/', getItems)

/****
* Get Item
* @param {*} req
* @param {*} res
****/
router.get('/:id', validatorGetItem, getItem)

/****
* Create Item
* @param {*} req
* @param {*} res
****/
router.post('/', uploadMiddleware.single('myfile'), createItem)

/****
* Delete Item
* @param {*} req
* @param {*} res
****/
router.delete('/:id', validatorGetItem, deleteItem)

module.exports = router
