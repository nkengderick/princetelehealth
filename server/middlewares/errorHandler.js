

const {format} = require('date-fns')

const path = require('path')

const date = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`

const errorHandler = (err, req, res, next) => {
    console.log(err.stack+'\t'+req.method+'\t'+req.path+'\t at '+date)
    next()
    console.log(err.name+'\t'+err.message)
    res.status(500)
    res.json({message: err.message})
}
module.exports = {errorHandler}
