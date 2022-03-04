const prismaClient = require('../database/prismaClient')

module.exports = {
  async index(req, res) {
    const response = await prismaClient.tags.findMany()

    return res.json(response)
  },

  async update(req, res) {

    const { id } = req.params;
    const { nome } = req.body;
    console.log(id)
    const response = await prismaClient.tags.update({
      where: {
        id:parseInt(id)
      },
      data: {
        nome:nome
      }
  })
  
    return res.json(response)
    
    
  },

  async delete(req, res) {

    const { id } = req.params;
    const { nome } = req.body;
    console.log(id)
    const response = await prismaClient.tags.delete({
      where: {
        id:parseInt(id)
      },
      
  })
  
    return res.json(response)
    
    
  },

  async create(req, res) {

    const { id } = req.params;
    const { nome } = req.body;
    console.log(id)
    const response = await prismaClient.tags.create({
      data: {
     nome      
        
      }
  })
  
    return res.json(response)
    
    
  }



}