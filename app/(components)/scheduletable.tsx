// TableComponent.js

import React from 'react';
import styles from './page.module.css'; // Import CSS module
interface TableComponentProps {
  array: Array<{
    task: string;
    startTime: string;
    stopTime: string;
    TotalTime: number;
  }>;
}
const TableComponent:React.FC<TableComponentProps> = ({array}) => {
  

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.taskColumn}>Task</th>
            <th>Start Time</th>
            <th>Stop Time</th>
            <th>Total Time (mins)</th>
            
          </tr>
          {array.map((item, index) => (
            <tr key={index}>
              <td>{item.task}</td>
              <td>{item.startTime}</td>
              <td>{item.stopTime}</td>
              <td>{item.TotalTime}</td>
            </tr>
          ))}
        </thead>
        <tbody>
      
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
