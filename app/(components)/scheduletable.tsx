// TableComponent.js

import React from 'react';
import styles from './page.module.css'; // Import CSS module

const TableComponent:React.FC = ({obj}) => {
  

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
        </thead>
        <tbody>

          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
