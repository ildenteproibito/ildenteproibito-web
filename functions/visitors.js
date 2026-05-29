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

async function getTotal(kv) {
    return parseInt((await kv.get('total')) || '0', 10);
}

async function registerVisitor(kv, visitorId) {
    const key = `v:${visitorId}`;
    const existing = await kv.get(key);

    if (!existing) {
        await kv.put(key, String(Date.now()));
        const current = await getTotal(kv);
        await kv.put('total', String(current + 1));
    }

    return { total: await getTotal(kv), isNew: !existing };
}

// Funzione unica MASTER che accetta qualsiasi richiesta su Cloudflare Pages
export async function onRequest(context) {
    const { request, env } = context;
    const method = request.method;
    const kv = env.VISITOR_STORE;

    // 1. Gestione CORS Preflight (OPTIONS)
    if (method === 'OPTIONS') {
        return new Response(null, { headers: CORS });
    }

    // Controlla se il database KV è collegato correttamente
    if (!kv) {
        return json({ total: 0, configured: false });
    }

    // 2. Gestione richiesta GET (Legge il totale)
    if (method === 'GET') {
        return json({ total: await getTotal(kv), configured: true });
    }

    // 3. Gestione richiesta POST (Registra il visitatore)
    if (method === 'POST') {
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

        const result = await registerVisitor(kv, visitorId);
        return json({ ...result, configured: true });
    }

    // Se arriva un metodo strano (PUT, DELETE...)
    return json({ error: 'Method not allowed' }, 405);
}
