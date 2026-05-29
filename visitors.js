const CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
};

function json(data, status = 200) {
    return new Response(JSON.stringify(data), {
        status,
        headers: { ...CORS, 'Content-Type': 'application/json' },
    });
}

function isValidVisitorId(id) {
    return typeof id === 'string' && id.length >= 8 && id.length <= 64 && /^[a-zA-Z0-9-]+$/.test(id);
}

export async function onRequest(context) {
    const { request, env } = context;

    if (request.method === 'OPTIONS') {
        return new Response(null, { headers: CORS });
    }

    const kv = env.VISITOR_STORE;
    if (!kv) {
        return json({ total: 0, configured: false });
    }

    if (request.method === 'GET') {
        const total = parseInt((await kv.get('total')) || '0', 10);
        return json({ total, configured: true });
    }

    if (request.method === 'POST') {
        let body;
        try {
            body = await request.json();
        } catch {
            return json({ error: 'Invalid JSON' }, 400);
        }

        const visitorId = body?.visitorId;
        if (!isValidVisitorId(visitorId)) {
            return json({ error: 'Invalid visitorId' }, 400);
        }

        const key = `v:${visitorId}`;
        const existing = await kv.get(key);

        if (!existing) {
            await kv.put(key, String(Date.now()));
            const current = parseInt((await kv.get('total')) || '0', 10);
            await kv.put('total', String(current + 1));
        }

        const total = parseInt((await kv.get('total')) || '0', 10);
        return json({ total, isNew: !existing, configured: true });
    }

    return json({ error: 'Method not allowed' }, 405);
}
