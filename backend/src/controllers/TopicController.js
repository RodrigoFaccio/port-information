const prismaClient = require('../database/prismaClient')

module.exports = {
  async index(req, res) {
    const response = await prismaClient.assuntos.findMany()

    return res.json(response)
  },

  async update(req, res) {

    const { id } = req.params;
    const { nome,cor } = req.body;
    console.log(id)
    const response = await prismaClient.assuntos.update({
      where: {
        id:parseInt(id)
      },
      data: {
        nome: nome,
        cor:cor
      }
  })
  
    return res.json(response)
    
    
  },

  async delete(req, res) {

    const { id } = req.params;
    const { nome } = req.body;
    console.log(id)
    const response = await prismaClient.assuntos.delete({
      where: {
        id:parseInt(id)
      },
      
  })
  
    return res.json(response)
    
    
  },

  async create(req, res) {

    const { id } = req.params;
    const { nome,cor,f_id_admin } = req.body;
    console.log(id)
    const response = await prismaClient.assuntos.create({
      data: {
        nome,
        cor,
        f_id_admin
        
      }
  })
  
    return res.json(response)
    
    
  }



}