// import { createFullPhoto } from "./full-photo";
// import { createPicture } from './thumbnails';
// import { Photo} from './types';

const URL = 'https://29.javascript.pages.academy/kekstagram/data';

function api<T>(url: string): Promise<T> {
	return fetch(url)
		.then(response => {
			if (!response.ok) {
				throw new Error(response.statusText)
			}
			return response.json() as Promise<T>
		})
}

api(URL);


export { };
