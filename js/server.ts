import { Photo } from './types';

const BASE_URL = 'https://29.javascript.pages.academy';

const Methods = {
	GET: 'GET',
	POST: 'POST'
};

const api = <T>(path: string, method: string, body : string | null = null): Promise<T> =>
	fetch(`${BASE_URL}/${path}`, { method, body })
		.then((response) => {
			if (!response.ok) {
				throw new Error(response.statusText);
			}
			return response.json() as Promise<T>;
		});

const get = <T>(path: string) => api<T>(path, Methods.GET);
const post = <T>(path: string, body: string | null = null) => api<T>(path, Methods.POST, body);

const loadPhotos = () => get<Photo[]>('kekstagram/data');
const uploadPhoto = (data: FormData) => post('kekstagram', JSON.stringify(data));

export { loadPhotos, uploadPhoto };
