import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('http://127.0.0.1:5984/kanban_test/_all_docs?include_docs=true', {
      headers: {
        Authorization: 'Basic ' + Buffer.from('admin:secret123').toString('base64'),
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch data from CouchDB' },
        { status: res.status },
      );
    }

    const data = await res.json();

    // Extract the "doc" objects from CouchDB response
    const boards = data.rows.map((row: any) => row.doc);

    // Return JSON to frontend
    return NextResponse.json({ boards });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
