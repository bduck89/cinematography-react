const { ADMIN_PASSWORD } = require("../config/keys")

module.exports.adminPasswordCheck = (req, res, next) => {
    if(req.body.adminPassword === ADMIN_PASSWORD){
        next()
    } else {
        res.send('Failed')
    }
}