import { NextResponse } from 'next/server';

export async function readBoundedJson(request: Request, limit: number) {
  const reject = (status: number, error: string) => ({
    response: NextResponse.json({ error }, { status }),
  });
  if (request.headers.get('content-type')?.split(';')[0].trim().toLowerCase() !== 'application/json') {
    return reject(415, 'Send an application/json request.');
  }
  if (Number(request.headers.get('content-length')) > limit) {
    return reject(413, 'Request body is too large.');
  }
  const reader = request.body?.getReader();
  if (!reader) return reject(400, 'Invalid JSON body.');
  try {
    const bytes = new Uint8Array(limit);
    let length = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (length + value.length > limit) {
        void reader.cancel().catch(() => {});
        return reject(413, 'Request body is too large.');
      }
      bytes.set(value, length);
      length += value.length;
    }
    const body: unknown = JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes.subarray(0, length)));
    if (!body || typeof body !== 'object' || Array.isArray(body)) return reject(400, 'Expected a JSON object.');
    return { body: body as Record<string, unknown> };
  } catch {
    return reject(400, 'Invalid JSON body.');
  } finally {
    reader.releaseLock();
  }
}
