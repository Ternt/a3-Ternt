const { mongodb } = require('../persistence/mongoUtil.cjs');

const getAllUsers = async () => {
    const collection = await mongodb.db.collection('Users');

    try {
        const user = await collection.find({}).toArray(function (err) {
            throw new Error(err);
        });

        return user;
    } catch (err) {
        console.error(err);
        return false;
    }
}

const findUserById = async (id) => {
    const collection = await mongodb.db.collection('Users');

    try {
        const user = await collection.find({ _id: id }).toArray(function (err) {
            return err;
        });

        return user;
    } catch (err) {
        console.error(err);
        return null;
    }
}

const verifyUser = async (username, password) => {
    const collection = await mongodb.db.collection('Users');

    try {
        const user = await collection.find({ username: username }).toArray(function (err) {
            return err;
        });

        if (user.length === 0) {
            throw new Error('No user exists.');
        }

        if (user[0].password !== password) {
            throw new Error('Password does not match.');
        }

        return user;
    } catch (err) {
        console.error(err);
        return false;
    }
}

const insertUser = async (data) => {
    try {
        const collection = await mongodb.db.collection('Users');
        const result = await collection.find({ username: data.username }).toArray();
        if (result.length > 0) {
            return {success:false};
        }

        collection.insertOne(data, function( err, res ) {
            if (err) throw err;
            console.log("1 document inserted");
            return {success:true};
        });
    } catch (err) {
        console.error(err);
        return {success:false};
    }
}

module.exports = {
    getAllUsers: getAllUsers,
    findUserById: findUserById,
    verifyUser: verifyUser,
    insertUser: insertUser,
}