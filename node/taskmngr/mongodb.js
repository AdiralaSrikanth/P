//CRUD
const {MongoClient, ObjectID} = require('mongodb')

const connectionUrl = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const id = new ObjectID()
console.log(id.getTimestamp())


MongoClient.connect(connectionUrl,{useNewUrlParser: true}, (err,client)=>{
        if(err) {
            return console.log('Unable to connect to database')
        }
        const db = client.db(databaseName)
        db.collection('users').insertOne({
            _id: id,
            name: 'vikky',
            age: 26
        }, (err,result)=>{
            if(err) {
                return console.log('Unable to insert doc.')
            }
            console.log(result.ops)
        })

    //     db.collection('tasks').insertMany([{
    //         description: 'Learn nodejs',
    //         completed: false
    //       },{
    //         description: 'Learn reactjs',
    //         completed: false
    //       }, {
    //         description: 'learn html and css',
    //         completed: false
    //       }
    // ], (err, result)=> {
    //         if(err){
    //             return console.log('Unable to insert docs')
    //         }

    //         console.log(result.ops)
    // })
})