import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(req: NextRequest) {
  try {
    const { path } = await req.json();

    if (!path) {
      return NextResponse.json({ message: 'Path is required' }, { status: 400 });
    }

    await revalidatePath(path);

    return NextResponse.json({ message: `Revalidated path: ${path}` }, { status: 200 });
  } catch (error) {
    console.error('Error in revalidating path:', error);
    return NextResponse.json({ message: (error as Error).message }, { status: 500 });
  }
}

// export async function GET(request: NextRequest) {
//   const path = request.nextUrl.searchParams.get('path')
 
//   if (path) {
//     revalidatePath(path)
//     return Response.json({ revalidated: true, now: Date.now() })
//   }
 
//   return Response.json({
//     revalidated: false,
//     now: Date.now(),
//     message: 'Missing path to revalidate',
//   })
// }
