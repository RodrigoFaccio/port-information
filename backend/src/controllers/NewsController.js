const prismaClient = require('../database/prismaClient')

module.exports = {
  async store(req, res) {
    // const { filename, imgname } = req.file;
    const { f_id_menu, f_id_assunto, f_id_tags, titulo, subtitulo, data_publicacao, video, conteudo_especial, tela_inicial, data_deadline, html, url, tipo } = req.body

    const news = await prismaClient.publicacao.create({
      data: {
        f_id_menu,
        f_id_assunto,
        f_id_tags,
        titulo,
        subtitulo,
        data_publicacao,
        video,
        conteudo_especial,
        tela_inicial,
        data_deadline,
        html,
        url,
        tipo,
      }
    })
    return res.json(news)
  },

  async index(req, res) {
       const response = await prismaClient.publicacao.findMany()

    return res.json(response)
  }
}