import {NextRequest, NextResponse} from "next/server";

export function GET() {
  return NextResponse.json({"ASDSAd": "ASDASD"});
}

export async function POST(request: NextRequest) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const res: any = await request.json();
  console.log(res)
  return NextResponse.json(res);
}
export const runtime = "experimental-edge";
