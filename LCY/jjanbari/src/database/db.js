const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'KDT-IaaS-3team-ERP',
});

async function query(sql, params) {
  const [rows] = await pool.execute(sql, params);
  return rows;
}

module.exports = { query };
