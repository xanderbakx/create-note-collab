const router = require('express').Router()
const { Document } = require('../db/models')
module.exports = router

// router.post('/', async (req, res, next) => {
//   try {
//     const document = new Document({
//       fileName: 'test1.doc',
//       userId: 1,
//       body: {
//         type: 'paragraph',
//         children: [{ text: 'This is editable rich text!' }],
//       },
//     })
//     document.save()
//     //res.json(document)
//   } catch (err) {
//     next(err)
//   }
// })
