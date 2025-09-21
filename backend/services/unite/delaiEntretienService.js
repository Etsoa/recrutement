const DelaiEntretien = require('../../models/delaiEntretienModel');

const createDelaiEntretien = async (data) => {
    return await DelaiEntretien.create(data);
};

const getAllDelaiEntretiens = async () => {
    return await DelaiEntretien.findAll();
};

const getDelaiEntretienById = async (id) => {
    return await DelaiEntretien.findByPk(id);
};

const updateDelaiEntretien = async (id, data) => {
    return await DelaiEntretien.update(data, { where: { id } });
};

const deleteDelaiEntretien = async (id) => {
    return await DelaiEntretien.destroy({ where: { id } });
};

module.exports = {
    createDelaiEntretien,
    getAllDelaiEntretiens,
    getDelaiEntretienById,
    updateDelaiEntretien,
    deleteDelaiEntretien
};