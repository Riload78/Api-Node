const express = require('express')
const router = express.Router()
const { validatorCreateItem, validatorGetItem } = require('../validators/tracks')
const customHeader = require('../middleware/customHeader')
const authMiddleware = require('../middleware/session')
const { getItems, getItem, createItem, updateItem, deleteItem } = require('../controller/tracks')

// TODO httt://locoalhost/tracks GET, POST, DELETE, PUT
/*
* Obtener todos los registros
*/
router.get('/', authMiddleware, getItems)

/*
* Obtener un registro
*/
router.get('/:id', validatorGetItem, getItem)

/*
* crear un registro
*/
router.post('/', validatorCreateItem, customHeader, createItem)

/*
* actualizar un registro
*/
router.put('/:id', validatorGetItem, validatorCreateItem, updateItem)

/*
* Eliminar un registro
*/
router.delete('/:id', validatorGetItem, deleteItem)

module.exports = router
