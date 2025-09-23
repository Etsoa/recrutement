const ViewCandidatsDetails = require('../../models/viewCandidatsDetailsModel');
const { fn, col, literal, Op } = require('sequelize'); // <--- ajoute Op

// Récupérer tous les détails
const getAllCandidatsDetails = async () => {
    try {
        const candidats = await ViewCandidatsDetails.findAll({ raw: true });
        return candidats;
    } catch (error) {
        console.error('Erreur getAllCandidatsDetails:', error);
        return [];
    }
};

// Récupérer le nombre de candidats par nombre de langues
const countByLangues = async () => {
    try {
        const candidats = await ViewCandidatsDetails.findAll({ raw: true });
        const counts = {};
        candidats.forEach(c => {
            counts[c.id_candidat] = counts[c.id_candidat] ? counts[c.id_candidat] + 1 : 1;
        });

        let deux = 0, trois = 0, plus4 = 0;
        Object.values(counts).forEach(n => {
            if (n === 2) deux++;
            else if (n === 3) trois++;
            else if (n > 4) plus4++;
        });

        return { '2 langues': deux, '3 langues': trois, 'plus de 4 langues': plus4 };
    } catch (error) {
        console.error('Erreur countByLangues:', error);
        return { '2_langues': 0, '3_langues': 0, 'plus_4_langues': 0 };
    }
};

// --- Nombre de candidats par niveau ---
// const countByNiveau = async () => {
//     try {
//         const result = await ViewCandidatsDetails.findAll({
//             attributes: ['niveau', [fn('COUNT', col('id_candidat')), 'nbr_candidats']],
//             where: { niveau: { [Op.ne]: null } },
//             group: ['niveau'],
//             raw: true
//         });
//         return result;
//     } catch (error) {
//         console.error('Erreur countByNiveau:', error);
//         return [];
//     }
// };
const countByNiveau = async () => {
    try {
        const result = await ViewCandidatsDetails.findAll({
            attributes: [
                'niveau',
                [fn('COUNT', fn('DISTINCT', col('id_candidat'))), 'nbr_candidats']
            ],
            where: { niveau: { [Op.ne]: null } },
            group: ['niveau'],
            raw: true
        });
        return result;
    } catch (error) {
        console.error('Erreur countByNiveau:', error);
        return [];
    }
};
// const countByExperience = async () => {
//     try {
//         const result = await ViewCandidatsDetails.findAll({
//             attributes: [
//                 [literal(`CASE
//           WHEN experience_annees BETWEEN 1 AND 3 THEN '1-3 ans'
//           WHEN experience_annees BETWEEN 4 AND 6 THEN '4-6 ans'
//           WHEN experience_annees BETWEEN 7 AND 9 THEN '7-9 ans'
//           ELSE '+10 ans'
//         END`), 'tranche_experience'],
//                 [fn('COUNT', col('id_candidat')), 'nbr_candidats']
//             ],
//             where: { experience_annees: { [Op.ne]: null } },
//             group: [literal(`CASE
//           WHEN experience_annees BETWEEN 1 AND 3 THEN '1-3 ans'
//           WHEN experience_annees BETWEEN 4 AND 6 THEN '4-6 ans'
//           WHEN experience_annees BETWEEN 7 AND 9 THEN '7-9 ans'
//           ELSE '+10 ans'
//         END`)],
//             raw: true
//         });
//         return result;
//     } catch (error) {
//         console.error('Erreur countByExperience:', error);
//         return [];
//     }
// };
const countByExperience = async () => {
    try {
        const result = await ViewCandidatsDetails.findAll({
            attributes: [
                [literal(`CASE
                    WHEN experience_annees BETWEEN 1 AND 3 THEN '1-3 ans'
                    WHEN experience_annees BETWEEN 4 AND 6 THEN '4-6 ans'
                    WHEN experience_annees BETWEEN 7 AND 9 THEN '7-9 ans'
                    ELSE '+10 ans'
                END`), 'tranche_experience'],
                [fn('COUNT', fn('DISTINCT', col('id_candidat'))), 'nbr_candidats']
            ],
            where: { experience_annees: { [Op.ne]: null } },
            group: [literal(`CASE
                WHEN experience_annees BETWEEN 1 AND 3 THEN '1-3 ans'
                WHEN experience_annees BETWEEN 4 AND 6 THEN '4-6 ans'
                WHEN experience_annees BETWEEN 7 AND 9 THEN '7-9 ans'
                ELSE '+10 ans'
            END`)],
            raw: true
        });
        return result;
    } catch (error) {
        console.error('Erreur countByExperience:', error);
        return [];
    }
};

module.exports = {
    getAllCandidatsDetails,
    countByLangues,
    countByNiveau,
    countByExperience
};
