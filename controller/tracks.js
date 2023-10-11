const { tracksModel } = require('../model')
const { handleHttpError } = require('../utils/handleError')
const { matchedData } = require('express-validator')

/*****
* Obtener lista de la  Base de datos
* @param {*} req
* @param {*} res
*****/
const getItems = async (req, res) => {
  try {
    const user = req.user
    const data = await tracksModel.find({})
    res.send({ data, user })
  } catch (error) {
    handleHttpError(res, error)
  }
}

/*****
* Obtener detalle  Base de datos
* @param {*} req
* @param {*} res
*****/
const getItem = async (req, res) => {
  try {
    req = matchedData(req)
    const { id } = req
    console.log(id)
    const data = await tracksModel.findById(id)
    res.send({ data })
  } catch (error) {
    handleHttpError(res, error)
  }
}

/*****
* Insertar ITEM
* @param {*} req
* @param {*} res
*****/
const createItem = async (req, res) => {
  try {
    const body = matchedData(req) // funciona que eliminna datos que no se corresponde con las validaciones de express validator
    // sirve para limpiar y evitar mandar datos quie no se acoplan al modelo
    const data = await tracksModel.create(body)
    res.send(data)
  } catch (error) {
    handleHttpError(res, error)
  }
}

/*****
* Actuelizar ITEM
* @param {*} req
* @param {*} res
*****/
const updateItem = async (req, res) => {
  try {
    const { id, ...body } = matchedData(req) // funciona que eliminna datos que no se corresponde con las validaciones de express validator
    // sirve para limpiar y evitar mandar datos quie no se acoplan al modelo

    const data = await tracksModel.findByIdAndUpdate(id, body)
    console.log(data)
    res.send({ data })
  } catch (error) {
    handleHttpError(res, 'Error_Uppdate_Item')
  }
}

/*****
* Eliminar ITEM
* @param {*} req
* @param {*} res
*****/
const deleteItem = async (req, res) => {
  try {
    req = matchedData(req)
    const { id } = req
    console.log(id)
    const data = await tracksModel.delete({ _id: id })
    res.send({ data })
  } catch (error) {
    console.log(error)
    handleHttpError(res, 'Error_Delete_Item')
  }
}

module.exports = {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem
}
