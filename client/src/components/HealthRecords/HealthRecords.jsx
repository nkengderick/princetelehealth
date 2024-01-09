import { useRecordContext } from '../../hooks/useRecordContext';
import './records.css';

import React, { useState, useEffect } from 'react';

const HealthRecords = ({ user, filteredRecords }) => {
  const { records } = useRecordContext();
  const [expandedRecord, setExpandedRecord] = useState(null);
  const [recs, setRecords] = useState(records)
  
  useEffect(() => {
    setRecords(filteredRecords.length > 0 ? filteredRecords : records);
  }, [filteredRecords, recs]);
  
  const toggleExpandedRecord = (recordId) => {
    setExpandedRecord(expandedRecord === recordId ? null : recordId);
  };

  const userRecords = recs.filter(
    (urecords) =>
      urecords.name === user.name || urecords.doctor === user.name
  );

  return (
    <div className="health-records-container">
      <h2 className="health-records-header">Health Records</h2>
      {userRecords && userRecords.length > 0 ? (
        <ul className="health-records-list">
          {userRecords.map((record) => (
            <li
              key={record._id}
              className="health-records-item"
              onClick={() => toggleExpandedRecord(record._id)}
            >
              {user && user.userType === 'patient' && (
                <div>Done by: {record.doctor}</div>
              )}
              {user && user.userType !== 'patient' && (
                <div>Done for: {record.name}</div>
              )}
              <div>On: {record.date}</div>
              {expandedRecord === record._id && (
                <div className="expanded-details">
                  <div className="details-section">
                    <strong>Signs and Symptoms:</strong>
                    <ul className="details-list">
                      {record.signsAndSymptoms.map((symptom, index) => (
                        <li key={index} className="details-list-item">
                          {symptom}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="details-section">
                    <strong>Recommendations:</strong>
                    <ul className="details-list">
                      {record.recommendations.map((recommendation, index) => (
                        <li key={index} className="details-list-item">
                          {recommendation}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="details-section">
                    <strong>Next Steps:</strong>
                    <ul className="details-list">
                      {record.nextSteps.map((step, index) => (
                        <li key={index} className="details-list-item">
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Add other details sections as needed */}
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No health records available.</p>
      )}
    </div>
  );
};

export default HealthRecords;

