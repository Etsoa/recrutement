const Annonce = require('../../models/annoncesModel');
const StatusAnnonces = require('../../models/statusAnnoncesModel');

const createAnnonce = async (data) => {
    try {
        // Créer l'annonce
        const newAnnonce = await Annonce.create(data);
        
        // Créer automatiquement le statut = 1 (soumise par unité)
        await StatusAnnonces.create({
            id_annonce: newAnnonce.id_annonce,
            id_type_status_annonce: 1, // Soumise par unité
            id_unite: data.id_unite || null, // Ajout de l'ID unité si fourni
            date_changement: new Date()
        });
        
        return newAnnonce;
    } catch (error) {
        console.error('Erreur lors de la création de l\'annonce:', error);
        throw error;
    }
};

const getAllAnnonces = async () => {
    return await Annonce.findAll();
};

const getAnnonceById = async (id) => {
    return await Annonce.findByPk(id);
};

const updateAnnonce = async (id, data) => {
    return await Annonce.update(data, { where: { id } });
};

const deleteAnnonce = async (id) => {
    return await Annonce.destroy({ where: { id } });
};

module.exports = {
    createAnnonce,
    getAllAnnonces,
    getAnnonceById,
    updateAnnonce,
    deleteAnnonce
};