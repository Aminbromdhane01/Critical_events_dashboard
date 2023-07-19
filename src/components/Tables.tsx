import React, { useEffect, useState } from 'react';
import './Tables.css';


const Tables: React.FC = () => {
  const [fileData, setFileData] = useState<any[][] | any[]>([]);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/data'); // Replace '/api/events' with the actual endpoint on your Node.js server
        const data = await response.json();
        setFileData(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEventData();
  }, []);

  return (
    <div>
      {fileData.length > 0 ? (
        fileData.map((content, index) => (
          <div key={index}>
            <h2>File {index + 1}</h2>
            <div className="table-wrapper">
              <table className="fl-table">
                <thead>
                  <tr>
                    <th colSpan={2}>Date</th>
                    <th>Id</th>
                    <th>State</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {content.map((line : any, lineIndex : any) => (
                    <tr key={lineIndex}>
                      {line.map((element: any, elementIndex: any) => ( // Add type annotations for element and elementIndex
                        <td key={elementIndex}>{element}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))
      ) : (
        <p>Loading events...</p>
      )}
    </div>
  );
};

export default Tables;