const Genres = require('../models/genresModel');

const createGenre = async (data) => {
    return await Genres.create(data);
};

const getAllGenres = async () => {
    return await Genres.findAll();
};

const getGenreById = async (id) => {
    return await Genres.findByPk(id);
};

const updateGenre = async (id, data) => {
    return await Genres.update(data, { where: { id } });
};

const deleteGenre = async (id) => {
    return await Genres.destroy({ where: { id } });
};

module.exports = {
    createGenre,
    getAllGenres,
    getGenreById,
    updateGenre,
    deleteGenre
};