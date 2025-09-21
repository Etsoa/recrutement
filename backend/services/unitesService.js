const Unite = require('../models/unitesModel');

const createUnite = async (data) => {
    return await Unite.create(data);
};

const getAllUnites = async () => {
    return await Unite.findAll();
};

const getUniteById = async (id) => {
    return await Unite.findByPk(id);
};

const getUniteByCredentials = async (username, password) => {
    return await Unite.findOne({
        where: {
            nom: username,
            mot_de_passe: password
        }
    });
};

const updateUnite = async (id, data) => {
    return await Unite.update(data, { where: { id } });
};

const deleteUnite = async (id) => {
    return await Unite.destroy({ where: { id } });
};

module.exports = {
    createUnite,
    getAllUnites,
    getUniteById,
    getUniteByCredentials,
    updateUnite,
    deleteUnite
};