const url = "localhost"
const routesApiURL: string = `${url}:8080`;
const megajogosApiSecret: string = process.env.MEGAJOGOS_API_SECRET || 'Ap1S3crEt';

const base = `http://${routesApiURL}`;

async function send(method: string, path: string, token: string =megajogosApiSecret, data? : any) {
    let opts: any = { method, headers: {} };

    
    if (data) {
        opts.headers['Content-Type'] = 'application/json';
        opts.body = JSON.stringify(data);
    }

    if (token) {
        opts.headers['Authorization'] = `Token ${token}`;
    }

    const r = await fetch(`${ base }/${ path }`, opts);
    const json = await r.json();

    try {
        return json;
    } catch (err) {
        return json;
    }
}

export function get(path: string, token?: string) {
    return send('GET', path, token);
}

export function del(path: string, token?: string) {
    return send('DELETE', path, token);
}

export function post(path: string, token?: string, data?: any) {
    return send('POST', path, token, data);
}

export function put(path: string,  token?: string, data?: any) {
    return send('PUT', path, token, data);
}