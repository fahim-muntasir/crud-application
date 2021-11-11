const {Userdb} = require('../model/model');

const user_create = (req, res) => {

    if(Object.keys(req.body).length === 0){
        res.status(400).send({
            message: "Content can not be empty!",
        })
        return;
    }

    const user = new Userdb(req.body);
    user.save(user)
    .then((data) => {
        res.send({message: 'User added successful.'});
    })
    .catch((err) => {
        res.status(500).send({
            message: err.message || 'Some err occurred!'
        })
    })
}

const user_find = (req, res) => {
    if(req.query.id){
        Userdb.findById(req.query.id)
        .then(data => {
            if(!data){
                res.status(404).send({message:'User not found!'})
            } else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({
                message: 'This User not found!'
            })
        })
    } else {
        Userdb.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some err occurred when find user!'
            })
        })
    }
    
}

const user_update = async (req, res) => {
    try{
        const id = req.params.id;
        const user = await Userdb.findByIdAndUpdate(id, req.body);
        res.send({message: 'User updated successfull.'});
    } catch{
        res.status(500).send('Error update users!');
    }
}

const user_delete = async (req, res) => {
    try{
        const id = req.params.id;
        const user = await Userdb.findByIdAndDelete(id);
        res.redirect('/').send({message: 'User deleted successfull.'});
    } catch {
        res.status(500).send({message: 'Error delete user!'});
    }

}

module.exports = {
    user_create,
    user_find,
    user_update,
    user_delete
}