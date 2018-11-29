class RequestService {

    async getRequest(url, json = true) {
        const settings = this.headers('GET', json);
        let response = await fetch(url, settings);
        if (response.ok) return await response.json();
        throw new Error(response.status);
    }

    async postRequest(url, json = true, data) {
        let settings = this.headers('POST', json);
        settings.body = JSON.stringify(data);
        let response = await fetch(url, settings);
        if (response.ok) return await response.json();
        throw new Error(response.status);
    }

    async deleteRequest(url, json = true, data) {
        let settings = this.headers('DELETE', json);
        settings.body = JSON.stringify(data);
        let response = await fetch(url, settings);
        if (response.ok) return await response.json();
        throw new Error(response.status);
    }

    async putRequest(url, json = true, data) {
        let settings = this.headers('PUT', json);
        settings.body = JSON.stringify(data);
        let response = await fetch(url, settings);
        if (response.ok) return await response.json();
        throw new Error(response.status);
    }

    headers(method, json) {
        let settings = { mode: "cors" }
        if (method === 'POST') {
            settings.method = 'POST';
        } else if (method === 'GET') {
            settings.method = 'GET';
        } else if (method === 'PUT') {
            settings.method = 'PUT';
        } else if (method === 'DELETE') {
            settings.method = 'DELETE';
        } else {
            settings.method = 'GET';
        }
        if (json) {
            settings.headers = {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            };
            return settings;
        } else {
            settings.headers = {
                Accept: 'text/html',
                'Content-Type': 'text/html',

            };
            return settings;
        }
    }
}


export default new RequestService()