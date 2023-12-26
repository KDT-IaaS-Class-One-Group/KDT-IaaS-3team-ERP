import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'KDT-IaaS-3team-ERP',
});

// query 함수 정의
async function query(sql: string, params: any[] = []): Promise<any[]> {
  const [rows] = await pool.execute(sql, params);
  return rows as any[];
}

// addUser 함수 정의
async function addUser(id: string, password: string, name: string): Promise<{ success: boolean; error?: string }> {
  try {
    // Check if user with the same id already exists
    const existingUsers = await query('SELECT * FROM userInfo WHERE id = ?', [id]);
    if (existingUsers.length > 0) {
      throw new Error('이미 등록된 ID입니다.');
    }

    // Insert the new user into userInfo table
    const sql = 'INSERT INTO userInfo (id, password, name) VALUES (?, ?, ?)';
    await query(sql, [id, password, name]);

    return { success: true };
  } catch (error) {
    console.error('Error adding user:', error.message);
    return { success: false, error: error.message };
  }
}

export { query, addUser };
