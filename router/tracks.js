const express = require('express')
const router = express.Router()
const { validatorCreateItem, validatorGetItem } = require('../validators/tracks')
const customHeader = require('../middleware/customHeader')
const authMiddleware = require('../middleware/session')
const cheeckRol = require('../middleware/role')
const { getItems, getItem, createItem, updateItem, deleteItem } = require('../controller/tracks')

// TODO httt://locoalhost/tracks GET, POST, DELETE, PUT
/*
* Obtener todos los registros
*/
router.get('/', authMiddleware, getItems)

/*
* Obtener un registro
*/
router.get('/:id', authMiddleware, validatorGetItem, getItem)

/*
* crear un registro
*/
router.post('/', authMiddleware, cheeckRol(['admin']), validatorCreateItem, customHeader, createItem)

/*
* actualizar un registro
*/
router.put('/:id', authMiddleware, validatorGetItem, validatorCreateItem, updateItem)

/*
* Eliminar un registro
*/
router.delete('/:id', authMiddleware, validatorGetItem, deleteItem)

module.exports = router
