import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../router/routes";
import { ceoService } from "../services/ceoService";
import "../styles/EmployeCEOList.css";

const EmployeCEOList = () => {
    const navigate = useNavigate();
    const [employes, setEmployes] = useState([]);
    const [filters, setFilters] = useState({});
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Vérifier l'authentification
        if (!ceoService.isLoggedIn()) {
            navigate(ROUTES.LOGIN_CEO);
            return;
        }

        // Charger les données des employés
        const fetchEmployes = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/ceo/employes", {
                    headers: {
                        Authorization: `Bearer ${ceoService.getToken()}`,
                    },
                });
                const data = await response.json();
                setEmployes(Array.isArray(data.data) ? data.data : []);
            } catch (err) {
                console.error("Erreur API :", err);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployes();
    }, [navigate]);

    /** Gestion des filtres avec checkboxes **/
    const handleCheckboxChange = (col, value) => {
        const currentValues = filters[col] || [];
        if (currentValues.includes(value)) {
            setFilters({
                ...filters,
                [col]: currentValues.filter((v) => v !== value),
            });
        } else {
            setFilters({
                ...filters,
                [col]: [...currentValues, value],
            });
        }
    };

    const filteredEmployes = employes.filter((emp) =>
        Object.keys(filters).every((key) => {
            if (!filters[key] || filters[key].length === 0) return true;
            return filters[key].includes(emp[key]);
        })
    );

    /** Tri **/
    const handleSort = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

    const sortedEmployes = [...filteredEmployes].sort((a, b) => {
        if (!sortConfig.key) return 0;
        const valueA = a[sortConfig.key] ?? "";
        const valueB = b[sortConfig.key] ?? "";

        if (typeof valueA === "number" && typeof valueB === "number") {
            return sortConfig.direction === "asc" ? valueA - valueB : valueB - valueA;
        }

        return sortConfig.direction === "asc"
            ? valueA.toString().localeCompare(valueB.toString())
            : valueB.toString().localeCompare(valueA.toString());
    });

    /** Colonnes affichées **/
    const visibleColumns = [
        "nom",
        "prenom",
        "nombre_enfants",
        "contact",
        "email",
        "cin",
        "genre",
        "situation_matrimoniale",
        "ville",
        "type_status_employe",
        "poste",
        "unite",
    ];

    /** Colonnes avec filtres checkbox **/
    const checkboxColumns = [
        "genre",
        "situation_matrimoniale",
        "ville",
        "type_status_employe",
        "poste",
        "unite",
    ];

    /** Valeurs uniques par colonne **/
    const getUniqueValues = (col) =>
        [...new Set(employes.map((emp) => emp[col]).filter(Boolean))];

    const handleLogout = () => {
        ceoService.logout();
        navigate(ROUTES.LOGIN_CEO);
    };

    if (loading) {
        return <div>Chargement des employés...</div>;
    }

    return (
        <div className="employe-table-container fade-in">
            {/* Conteneur scrollable */}
            <div className="table-scroll-container">
                <table className="employe-table">
                    <thead>
                        <tr>
                            {visibleColumns.map((col) => (
                                <th key={col} onClick={() => handleSort(col)}>
                                    {col.replace(/_/g, " ").toUpperCase()}
                                    {sortConfig.key === col && (
                                        <span className="sort-indicator">
                                            {sortConfig.direction === "asc" ? " ▲" : " ▼"}
                                        </span>
                                    )}
                                </th>
                            ))}
                        </tr>

                        {/* Ligne des filtres */}
                        <tr className="filter-row">
                            {visibleColumns.map((col) => (
                                <th
                                    key={col}
                                    className={checkboxColumns.includes(col) ? "checkbox-filter-col" : ""}
                                >
                                    {checkboxColumns.includes(col) ? (
                                        <details>
                                            <summary>Filtrer</summary>
                                            <div className="checkbox-filter">
                                                {getUniqueValues(col).map((val, idx) => (
                                                    <label key={idx} className="checkbox-option">
                                                        <input
                                                            type="checkbox"
                                                            checked={filters[col]?.includes(val) || false}
                                                            onChange={() => handleCheckboxChange(col, val)}
                                                        />
                                                        {val}
                                                    </label>
                                                ))}
                                            </div>
                                        </details>
                                    ) : (
                                        <input
                                            type="text"
                                            placeholder={`Filtrer ${col}`}
                                            value={filters[col] || ""}
                                            onChange={(e) =>
                                                setFilters({ ...filters, [col]: e.target.value })
                                            }
                                        />
                                    )}
                                </th>

                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {sortedEmployes.length > 0 ? (
                            sortedEmployes.map((emp, index) => (
                                <tr key={index}>
                                    {visibleColumns.map((col) => (
                                        <td key={col}>{emp[col] ?? "-"}</td>
                                    ))}
                                    <td>
                                        <button className="btn btn-small">Détails</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={visibleColumns.length} className="no-data">
                                    Aucun employé trouvé
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeCEOList;
