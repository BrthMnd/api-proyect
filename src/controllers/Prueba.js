 const Onwer = require('../model/owner.model')

 class Prueba {

    constructor()

    async createPruea(req, res) {
        let data = req.body
        try {
            let owner = new Onwer(data)
            let resp = await owner.save()
            if(!resp) {

            }

        } catch (error) {
            
        }
    }
    
}

module.exports = Prueba