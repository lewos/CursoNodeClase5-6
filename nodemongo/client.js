//----mongo atlas
// crear usuario
// Database Access/ add new user // usr usr
// Network Access // add ip adress allow acces from anyware

//conectarse a la base de atlas desde mongo3t
// create, adress , la provista por mongo atlas
//         autentification,CHECK perform autnetification
//         ssl, check, use self signed 


//antes mongod --dbpath "E:\CursoNodeClase5-6\baseMongo"
// node client.js o nodemon . o cambias el main ( "main": "client.js",) en package.jsobn

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const usuariosSchema = new Schema({
    nombre:String,
    edad:Number
})
//coleccion,schema
const usuarioModel = mongoose.model('usuarios',usuariosSchema)
//de forma local
//mongoose.connect('mongodb://localhost/mibase',{

//en mongo atlas
mongoose.connect('mongodb+srv://usr:usr@cluster0-hq2qm.mongodb.net/test?retryWrites=true&w=majority',{
        useNewUrlParser:true,
        useUnifiedTopology:true
    } ,err=>{
    if(err) return console.log(`error en conexion de base de datos ${err}`)
    console.log(`Base de datos conectada`)

    // para ingresar a un usuario nuevo con un schema
    const UsuarioNuevo = new usuarioModel({
        nombre:'otro',
        edad:Math.random(1,100)
    })
    UsuarioNuevo.save(err=>{
        if(!err){
            console.log('Escritura OK!')
            // usuarioModel.find({},(err,usuarios)=>{
            //     if(!err){
            //         usuarios.forEach(usuario=>{
            //             console.log(usuario)
            //         })
            //     }
            // })
            // usuarioModel.find({nombre:'Daniel'},(err,usuarios)=>{
            //         if(!err){
            //             usuarios.forEach(usuario=>{
            //                 console.log(usuario)
            //             })
            //         }
            //     })
                // usuarioModel.find({edad:{$gte:20}},(err,usuarios)=>{
                //     if(!err){
                //         usuarios.forEach(usuario=>{
                //             console.log(usuario)
                //         })
                //     }
                // }).sort({edad:-1}).limit(1)
                // para una proyeccion, le puedo decir los campos que quiero con 1 o los que no con 0 // {_id:0}
                usuarioModel.find({edad:{$gte:20}},{_id:0},(err,usuarios)=>{
                    if(!err){
                        usuarios.forEach(usuario=>{
                            console.log(usuario)
                        })
                    }
                }).sort({edad:-1}).limit(1)
        }
    })

})

