const { mongodb } = require('../persistence/mongoUtil.cjs');
const mongo = require("mongodb");

const getAllUsers = async () => {
    const dbname = 'Users';
    const collection = await mongodb.db.collection(dbname);

    try {
        const user = await collection.find({}).toArray(function (err) {
            throw new Error(err);
        });

        return {
            name: dbname,
            data: user,
        };
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

        await collection.insertOne(data);
        return {success:true};
    } catch (err) {
        console.error(err);
        return {success:false};
    }
}

const deleteUser = async (data) => {
    try {
        const dbname = 'Users';
        const collection = await mongodb.db.collection(dbname);
        const query = {
            _id: new mongo.ObjectId(data._id),
        }
        await collection.deleteOne(query);
        return {success:true};
    } catch (err) {
        console.error(err);
        return {success:false};
    }
}

const changeUserData = async (field, value) => {
    try {
        const dbname = 'Users';
        const collection = await mongodb.db.collection(dbname);
        const query = { _id: new mongo.ObjectId(field._id) }
        const newValue = {
            $set: {
                [field.key]: value,
            }
        }
        await collection.updateOne(query, newValue);
        return {success:true};
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
    deleteUser: deleteUser,
    changeUserData: changeUserData,
}