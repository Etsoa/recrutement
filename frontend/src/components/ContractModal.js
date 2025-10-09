import React, { useRef } from 'react';
import html2pdf from 'html2pdf.js';

const ContractModal = ({ contract, onClose }) => {
  const contractRef = useRef(null);

  // Styles pour le modal
  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(4px)',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    modal: {
      backgroundColor: '#ffffff',
      borderRadius: '0.5rem',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      width: '100%',
      maxWidth: '800px',
      maxHeight: '80vh',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    },
    header: {
      borderBottom: '1px solid #e2e8f0',
      padding: '1.25rem 1.5rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    title: {
      color: '#176c2fff',
      fontSize: '1.25rem',
      fontWeight: '600',
      margin: 0
    },
    closeButton: {
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      fontSize: '1.5rem',
      color: '#64748b'
    },
    content: {
      padding: '1.5rem',
      overflowY: 'auto',
      flexGrow: 1
    },
    contractPaper: {
      backgroundColor: '#ffffff',
      border: '1px solid #e2e8f0',
      borderRadius: '0.25rem',
      padding: '2rem',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      fontFamily: 'Times New Roman, serif',
      fontSize: '0.875rem',
      lineHeight: '1.5'
    },
    contractHeader: {
      textAlign: 'center',
      marginBottom: '2rem'
    },
    contractTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginBottom: '0.5rem'
    },
    contractSubtitle: {
      fontSize: '1.25rem',
      marginBottom: '1rem'
    },
    contractSection: {
      marginBottom: '1.5rem'
    },
    contractSectionTitle: {
      fontSize: '1.125rem',
      fontWeight: 'bold',
      marginBottom: '0.75rem',
      borderBottom: '1px solid #e2e8f0',
      paddingBottom: '0.25rem'
    },
    contractTable: {
      width: '100%',
      borderCollapse: 'collapse',
      marginBottom: '1rem'
    },
    contractTableHeader: {
      backgroundColor: '#f8fafc',
      border: '1px solid #e2e8f0',
      padding: '0.5rem',
      textAlign: 'left',
      fontWeight: 'bold'
    },
    contractTableCell: {
      border: '1px solid #e2e8f0',
      padding: '0.5rem',
      textAlign: 'left'
    },
    contractSignature: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '3rem'
    },
    contractSignatureBlock: {
      width: '45%'
    },
    footer: {
      borderTop: '1px solid #e2e8f0',
      padding: '1rem 1.5rem',
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '0.75rem'
    },
    downloadButton: {
      backgroundColor: '#176c2fff',
      color: '#ffffff',
      border: 'none',
      borderRadius: '0.375rem',
      padding: '0.625rem 1.25rem',
      fontSize: '0.875rem',
      fontWeight: '500',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      transition: 'background-color 0.2s ease'
    }
  };

  // Formatage de la date pour l'affichage
  const formatDate = (dateString) => {
    if (!dateString) return 'Non spécifiée';
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Date invalide';
    
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Fonction pour télécharger le contrat en PDF
  const handleDownloadPDF = () => {
    if (contractRef.current) {
      const element = contractRef.current;
      const opt = {
        margin: 10,
        filename: `Contrat_${contract.nom}_${contract.prenom}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };
      
      html2pdf().set(opt).from(element).save();
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h3 style={styles.title}>
            {contract.is_renewal ? 'Renouvellement de contrat' : 'Contrat d\'essai'}
          </h3>
          <button style={styles.closeButton} onClick={onClose}>×</button>
        </div>
        
        <div style={styles.content}>
          <div style={styles.contractPaper} ref={contractRef}>
            {/* Le contenu du contrat utilise uniquement les données passées en props */}
            <div style={styles.contractHeader}>
              <h1 style={styles.contractTitle}>CONTRAT DE TRAVAIL À DURÉE DÉTERMINÉE</h1>
              <h2 style={styles.contractSubtitle}>(Période d'essai)</h2>
            </div>
            
            <div style={styles.contractSection}>
              <p><strong>ENTRE LES SOUSSIGNÉS :</strong></p>
              <p>
                <strong>La société {contract.societe || 'Exemple SA'}</strong>, au capital de {contract.capital || '1 000 000'} euros, 
                dont le siège social est situé {contract.siege || '123 rue Principale, 75000 Paris'},
                immatriculée au registre du commerce et des sociétés de {contract.rcs_ville || 'Paris'} sous le numéro {contract.rcs_numero || '123 456 789'},
                représentée par {contract.representant || 'M. Jean Directeur'}, agissant en qualité de {contract.qualite_representant || 'Directeur Général'},
              </p>
              <p>Ci-après dénommée "l'employeur",</p>
              <p>D'une part,</p>
              <p>ET</p>
              <p>
                <strong>{contract.prenom} {contract.nom}</strong>, demeurant {contract.adresse || '[Adresse de l\'employé]'},
                {contract.date_naissance ? `Né(e) le ${formatDate(contract.date_naissance)}` : 'Né(e) le [Date de naissance]'} à {contract.lieu_naissance || '[Lieu de naissance]'},
                De nationalité {contract.nationalite || '[Nationalité]'},
                {contract.secu ? `Numéro de sécurité sociale : ${contract.secu}` : 'Numéro de sécurité sociale : [Numéro de sécurité sociale]'},
              </p>
              <p>Ci-après dénommé(e) "le salarié",</p>
              <p>D'autre part,</p>
            </div>
            
            <div style={styles.contractSection}>
              <h3 style={styles.contractSectionTitle}>IL A ÉTÉ CONVENU CE QUI SUIT :</h3>
              
              <p><strong>Article 1 - Engagement</strong></p>
              <p>
                L'employeur engage le salarié en qualité de {contract.poste} au sein de l'unité {contract.unite} 
                à compter du {formatDate(contract.date_debut)}, sous réserve des résultats de la visite médicale d'embauche.
              </p>
              
              <p><strong>Article 2 - Durée du contrat</strong></p>
              <p>
                Le présent contrat est conclu pour une durée déterminée de {contract.duree_mois} mois, 
                soit jusqu'au {formatDate(contract.date_fin)}.
              </p>
              
              <p><strong>Article 3 - Période d'essai</strong></p>
              <p>
                Le présent contrat est soumis à une période d'essai de {Math.min(contract.duree_mois, 3)} mois, 
                durant laquelle chacune des parties pourra rompre le contrat sans préavis ni indemnité.
              </p>
              
              <p><strong>Article 4 - Rémunération</strong></p>
              <p>
                En contrepartie de son travail, le salarié percevra une rémunération mensuelle brute 
                de {(contract.salaire / 12).toFixed(2)} euros, pour la durée de travail prévue à l'article 5.
              </p>
              
              <p><strong>Article 5 - Durée du travail</strong></p>
              <p>
                La durée du travail est fixée à {contract.heures_hebdo || '35'} heures par semaine. 
                Le salarié pourra être amené à effectuer des heures supplémentaires à la demande de l'employeur.
              </p>
              
              <p><strong>Article 6 - Lieu de travail</strong></p>
              <p>
                Le lieu de travail est fixé à {contract.lieu_travail || '[Adresse du lieu de travail]'}.
                Le salarié pourra être amené à se déplacer dans le cadre de ses fonctions.
              </p>
            </div>
            
            <div style={styles.contractSignature}>
              <div style={styles.contractSignatureBlock}>
                <p>Fait à {contract.lieu_signature || 'Paris'}, le {formatDate(new Date())}</p>
                <p>L'employeur (signature précédée de la mention "Lu et approuvé")</p>
                <div style={{ height: '80px' }}></div>
                <p>{contract.representant || 'Jean Directeur'}, {contract.qualite_representant || 'Directeur Général'}</p>
              </div>
              
              <div style={styles.contractSignatureBlock}>
                <p>Fait à {contract.lieu_signature || 'Paris'}, le {formatDate(new Date())}</p>
                <p>Le salarié (signature précédée de la mention "Lu et approuvé")</p>
                <div style={{ height: '80px' }}></div>
                <p>{contract.prenom} {contract.nom}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div style={styles.footer}>
          <button 
            onClick={onClose}
            style={{
              ...styles.downloadButton,
              backgroundColor: '#64748b'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#475569'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#64748b'}
          >
            Fermer
          </button>
          <button 
            onClick={handleDownloadPDF}
            style={styles.downloadButton}
            onMouseOver={(e) => e.target.style.backgroundColor = '#176c2fff'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#176c2fff'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Télécharger PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContractModal;