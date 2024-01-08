const {format} = require('date-fns')

const path = require('path')

const date = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`

const logger = (req, res, next) => {
    console.log(req.method+'\t'+req.path+'\t'+ 'from '+req.connection.remoteAddress+'\t'+req.headers.origin+'\t at '+date)
    next()
}
module.exports = {logger}