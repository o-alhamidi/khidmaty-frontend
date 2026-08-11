import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    // الاستعلام عن جميع التصنيفات من قاعدة البيانات
    const [rows] = await pool.query('SELECT * FROM categories');
    
    return NextResponse.json({
      success: true,
      categories: rows
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'فشل الاتصال بقاعدة البيانات', error: error.message },
      { status: 500 }
    );
  }
}