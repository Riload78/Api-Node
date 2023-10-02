const fs = require('node:fs')
const { storageModel } = require('../model')
const PUBLIC_URL = process.env.PUBLIC_URL
const MEDIA_PATH = `${__dirname}/../storage`
const { handleHttpError } = require('../utils/handleError')
const { matchedData } = require('express-validator')

/*****
* Obtener lista de la  Base de datos
* @param {*} req
* @param {*} res
*****/
const getItems = async (req, res) => {
  try {
    const data = await storageModel.find({})
    res.send({ data })
  } catch (error) {
    handleHttpError(res, 'Error_Get_Items')
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
    const data = storageModel.findById(id)
    res.send({ data })
  } catch (error) {
    handleHttpError(res, 'Error_Get_Item')
  }
}

/*****
* Insertar ITEM
* @param {*} req
* @param {*} res
*****/
const createItem = async (req, res) => {
  try {
    const { file } = req
    const fileData = {
      filename: file.filename,
      url: `${PUBLIC_URL}/${file.filename}`
    }
    const data = await storageModel.create(fileData)
    res.send(data)
  } catch (error) {
    handleHttpError(res, 'Error_Create_Item')
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
    const dataFile = await storageModel.findById(id)
    await storageModel.delete({ _id: id })
    const { filename } = dataFile
    const filePath = `${MEDIA_PATH}/${filename}`
    fs.unlinkSync(filePath)

    const data = {
      filePath,
      delete: 1
    }

    res.send({ data })
  } catch (error) {
    console.log(error)
    handleHttpError(res, 'Error_Deletting_Item')
  }
}

module.exports = {
  getItems,
  getItem,
  createItem,
  deleteItem
}
