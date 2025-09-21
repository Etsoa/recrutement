import React, { useEffect, useState } from "react";
import "../styles/EmployeCEOList.css";

const EmployeCEOList = () => {
  const [employes, setEmployes] = useState([]);
  const [filters, setFilters] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/ceo/employes");
        const data = await res.json();
        setEmployes(Array.isArray(data.data) ? data.data : []);
      } catch (err) {
        console.error("Erreur API :", err);
      }
    };
    fetchData();
  }, []);

  const handleFilterChange = (e, key) => {
    setFilters({
      ...filters,
      [key]: e.target.value,
    });
  };

  const filteredEmployes = employes.filter((emp) =>
    Object.keys(filters).every((key) =>
      emp[key]
        ?.toString()
        .toLowerCase()
        .includes(filters[key]?.toLowerCase() || "")
    )
  );

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

  // Colonnes avec datalist
  const datalistColumns = [
    "genre",
    "situation_matrimoniale",
    "ville",
    "type_status_employe",
    "poste",
    "unite",
  ];

  // Récupère les valeurs uniques pour une colonne
  const getUniqueValues = (col) =>
    [...new Set(employes.map((emp) => emp[col]).filter(Boolean))];

  return (
    <div className="employe-table-container fade-in">
      <h2 className="table-title">Liste des Employés</h2>
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
          <tr className="filter-row">
            {visibleColumns.map((col) => (
              <th key={col}>
                {datalistColumns.includes(col) ? (
                  <>
                    <input
                      type="text"
                      placeholder={`Filtrer ${col}`}
                      value={filters[col] || ""}
                      onChange={(e) => handleFilterChange(e, col)}
                      list={`${col}-list`}
                    />
                    <datalist id={`${col}-list`}>
                      {getUniqueValues(col).map((val, idx) => (
                        <option key={idx} value={val} />
                      ))}
                    </datalist>
                  </>
                ) : (
                  <input
                    type="text"
                    placeholder={`Filtrer ${col}`}
                    value={filters[col] || ""}
                    onChange={(e) => handleFilterChange(e, col)}
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
  );
};

export default EmployeCEOList;
