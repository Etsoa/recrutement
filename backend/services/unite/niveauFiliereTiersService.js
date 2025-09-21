const NiveauFiliereTiers = require('../../models/niveauFiliereTiersModel');

const createNiveauFiliereTiers = async (data) => {
    return await NiveauFiliereTiers.create(data);
};

const getAllNiveauFiliereTiers = async () => {
    return await NiveauFiliereTiers.findAll();
};

const getNiveauFiliereTiersById = async (id) => {
    return await NiveauFiliereTiers.findByPk(id);
};

const updateNiveauFiliereTiers = async (id, data) => {
    return await NiveauFiliereTiers.update(data, { where: { id } });
};

const deleteNiveauFiliereTiers = async (id) => {
    return await NiveauFiliereTiers.destroy({ where: { id } });
};

module.exports = {
    createNiveauFiliereTiers,
    getAllNiveauFiliereTiers,
    getNiveauFiliereTiersById,
    updateNiveauFiliereTiers,
    deleteNiveauFiliereTiers
};