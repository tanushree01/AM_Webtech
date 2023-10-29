import React, { useState } from "react";
import './index.css';

const Dashboard = () => {
  const [rawMaterials, setRawMaterials] = useState({ RM1: 0, RM2: 0 });
  const [finishedProducts, setFinishedProducts] = useState({ FP1: 0, FP2: 0 });

  const handleAddFP = (fpName, requirements) => {
    for (const rm in requirements) {
      if (rawMaterials[rm] < requirements[rm]) {
        alert(`Not enough ${rm} to make ${fpName}`);
        return;
      }
    }
    const updatedRawMaterials = { ...rawMaterials };
    const updatedFinishedProducts = { ...finishedProducts };

    for (const rm in requirements) {
      updatedRawMaterials[rm] -= requirements[rm];
    }

    updatedFinishedProducts[fpName] += 1;

    setRawMaterials(updatedRawMaterials);
    setFinishedProducts(updatedFinishedProducts);
  };

  const handleSubtractFP = (fpName, requirements) => {
    if (finishedProducts[fpName] > 0) {
      const updatedFinishedProducts = { ...finishedProducts };
      updatedFinishedProducts[fpName] -= 1;

      const updatedRawMaterials = { ...rawMaterials };
      for (const rm in requirements) {
        updatedRawMaterials[rm] += requirements[rm];
      }

      setRawMaterials(updatedRawMaterials);
      setFinishedProducts(updatedFinishedProducts);
    }
  };

  const cellStyle = {
    border: "1px solid #000",
    padding: "8px",
  };

  const buttonStyle = {
    border: "1px solid #000",
    padding: "4px 8px",
    cursor: "pointer",
  };

  const renderRawMaterialRow = (rmName) => (
    <tr key={rmName}>
      <td style={cellStyle}>{rmName}</td>
      <td style={cellStyle}>{rawMaterials[rmName]}</td>
      <td style={cellStyle}>
        <button
          style={buttonStyle}
          onClick={() => {
            const updatedRawMaterials = { ...rawMaterials };
            updatedRawMaterials[rmName] += 1;
            setRawMaterials(updatedRawMaterials);
          }}
        >
          +
        </button>
      </td>
      <td style={cellStyle}>
        <button
          style={buttonStyle}
          onClick={() => {
            if (rawMaterials[rmName] > 0) {
              const updatedRawMaterials = { ...rawMaterials };
              updatedRawMaterials[rmName] -= 1;
              setRawMaterials(updatedRawMaterials);
            }
          }}
        >
          -
        </button>
      </td>
    </tr>
  );

  const renderFinishedProductRow = (fpName, requirements) => (
    <tr key={fpName}>
      <td style={cellStyle}>{fpName}</td>
      <td style={cellStyle}>{finishedProducts[fpName]}</td>
      <td style={cellStyle}>
        <button
          style={buttonStyle}
          onClick={() => handleAddFP(fpName, requirements)}
        >
          +
        </button>
      </td>
      <td style={cellStyle}>
        <button
          style={buttonStyle}
          onClick={() => handleSubtractFP(fpName, requirements)}
        >
          -
        </button>
      </td>
    </tr>
  );

  return (
    <>
    <h2>Raw Material</h2>
      <table style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={cellStyle}>Raw Material</th>
            <th style={cellStyle}>Count</th>
            <th style={cellStyle}></th>
            <th style={cellStyle}></th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(rawMaterials).map((rmName) =>
            renderRawMaterialRow(rmName)
          )}
        </tbody>
      </table>
      <h2>Finish Product</h2>
      <table style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={cellStyle}>Finished Product</th>
            <th style={cellStyle}>Count</th>
            <th style={cellStyle}></th>
            <th style={cellStyle}></th>
          </tr>
        </thead>
        <tbody>
          {Object.entries({
            FP1: { RM1: 8, RM2: 5 },
            FP2: { RM1: 7, RM2: 10 },
          }).map(([fpName, requirements]) =>
            renderFinishedProductRow(fpName, requirements)
          )}
        </tbody>
      </table>
    </>
  );
};

export default Dashboard;