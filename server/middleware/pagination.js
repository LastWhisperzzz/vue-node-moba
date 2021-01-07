module.exports = options => {
  return async (req, res, next) => {
    if (!(req.query.pagenum || req.query.pagesize)) return next()
    const pagenum = Number(req.query.pagenum)
    const pagesize = Number(req.query.pagesize)
    const skipNum = (pagenum - 1) * pagesize
    const total = await req.Model.countDocuments()
    let data
    if (req.query.query) {
      data = await req.Model.find({ name: req.query.query })
        .skip(skipNum)
        .limit(pagesize)
        .populate('categories')
    } else {
      data = await req.Model.find()
        .skip(skipNum)
        .limit(pagesize)
        .populate('categories')
    }
    res.send({
      total,
      data
    })
  }
}
