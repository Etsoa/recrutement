const Genre = require('../models/genresModel');

const createGenre = async (data) => {
    return await Genre.create(data);
};

const getAllGenres = async () => {
    return await Genre.findAll();
};

const getGenreById = async (id) => {
    return await Genre.findByPk(id);
};

const updateGenre = async (id, data) => {
    return await Genre.update(data, { where: { id } });
};

const deleteGenre = async (id) => {
    return await Genre.destroy({ where: { id } });
};

module.exports = {
    createGenre,
    getAllGenres,
    getGenreById,
    updateGenre,
    deleteGenre
};