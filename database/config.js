const mongoose = require('mongoose');


const dbConection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN)
        console.log('db online');
    } catch (error) {
        throw new Error('Error a la hora de conectar con la base de datos')
        console.log(erorr);
    }   
}

module.exports={
    dbConection
}