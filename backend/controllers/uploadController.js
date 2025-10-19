const path = require('path');
const fs = require('fs');

// Upload d'une photo de profil
const uploadProfilePhoto = async (req, res) => {
  try {
    // Vérifier si un fichier a été fourni
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Aucun fichier fourni'
      });
    }
    
    // Vérifier le type MIME du fichier
    if (!req.file.mimetype.startsWith('image/')) {
      return res.status(400).json({
        success: false,
        message: 'Le fichier doit être une image'
      });
    }

    // Informations sur le fichier uploadé
    const fileInfo = {
      originalName: req.file.originalname,
      fileName: req.file.filename,
      filePath: req.file.path,
      fileSize: req.file.size,
      mimeType: req.file.mimetype,
      relativePath: `/uploads/photos/${req.file.filename}`,
      url: `${req.protocol}://${req.get('host')}/uploads/photos/${req.file.filename}`
    };

    res.json({
      success: true,
      message: 'Photo uploadée avec succès',
      data: fileInfo
    });

  } catch (error) {
    console.error('Erreur upload photo:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'upload de la photo',
      error: error.message
    });
  }
};

// Supprimer une photo
const deletePhoto = async (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(__dirname, '../uploads/photos', filename);

    // Vérifier si le fichier existe
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: 'Fichier introuvable'
      });
    }

    // Supprimer le fichier
    fs.unlinkSync(filePath);

    res.json({
      success: true,
      message: 'Photo supprimée avec succès'
    });

  } catch (error) {
    console.error('Erreur suppression photo:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression de la photo',
      error: error.message
    });
  }
};

module.exports = {
  uploadProfilePhoto,
  deletePhoto
};