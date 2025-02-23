const mongo      = require('mongodb');
const {mongodb} = require("../persistence/mongoUtil.cjs");

const addCardToUser = async (user, card) => {
    try {
        const collection = await mongodb.db.collection('Cards');
        const cardData = {
            cardname: card.cardname,
            username: user.username
        };
        await collection.insertOne(cardData);
        return {success:true};
    } catch (err) {
        console.error(err);
        return {success:false};
    }
}

const getAllUserCards = async (user) => {
    try {
        const dbname = 'Cards';
        const collection = await mongodb.db.collection(dbname);
        const query = { username: user.username };
        const data  = await collection.find(query).toArray();

        return {
            success: true,
            data: data
        };
    } catch (err) {
        console.error(err);
        return {success:false};
    }
}

const getAllCards = async () => {
    try {
        const dbname = 'Cards';
        const collection = await mongodb.db.collection(dbname);
        const data  = await collection.find().toArray();

        return {
            name: dbname,
            data: data
        };
    } catch (err) {
        console.error(err);
        return false;
    }
}

const deleteCard = async (data) => {
    try {
        const dbname = 'Cards';
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

const changeCardData = async (field, value) => {
    try {
        const dbname = 'Cards';
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
    getAllUserCards: getAllUserCards,
    addCardToUser: addCardToUser,
    getAllCards: getAllCards,
    deleteCard: deleteCard,
    changeCardData: changeCardData,
}