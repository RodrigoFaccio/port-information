const { Router } = require("express")
const multer = require("multer");
const uploadConfig = require('./config/upload');

const TagController = require('./controllers/TagController')
const TopicController = require('./controllers/TopicController')
const MenuController = require('./controllers/MenuController')
const NewsController = require('./controllers/NewsController')

const router = Router();
const upload = multer(uploadConfig);


//tags
router.get('/tags', TagController.index)
router.put('/tags/update/:id', TagController.update)
router.delete('/tags/delete/:id', TagController.delete)
router.post('/tags/add', TagController.create)


// assuntos
router.get('/topics', TopicController.index)
router.put('/topics/update/:id', TopicController.update)
router.delete('/topics/delete/:id', TopicController.delete)
router.post('/topics/add', TopicController.create)



router.get('/menus', MenuController.index)

router.post('/news/add', NewsController.store)
router.get('/news', NewsController.index)


module.exports = router

