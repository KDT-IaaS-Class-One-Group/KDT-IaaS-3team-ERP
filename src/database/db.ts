import mysql, { Pool, OkPacket, RowDataPacket } from 'mysql2/promise';

// MySQL 데이터베이스에 연결하기 위한 풀 생성
const pool: Pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'KDT-IaaS-3team-ERP',
});

// 쿼리 함수 정의
async function query(sql: string, params: any[] = []): Promise<RowDataPacket[]> {
  // 풀을 이용하여 SQL 쿼리 실행
  const [rows]: [RowDataPacket[], OkPacket[]] = await pool.execute(sql, params);
  return rows;
}

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

// 모듈에서 외부로 노출할 함수들 정의
export { query, addUser };
