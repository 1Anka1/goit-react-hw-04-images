import axios from "axios";

const MAIN_URL = 'https://pixabay.com/api/';
const MY_KEY = '11240134-58b8f655e9e0f8ae8b6e8e7de';
const LIMIT = 12;
const TYPE = 'photo';
const ORIENTATION = 'horizontal';

const instance = axios.create({
    baseURL: MAIN_URL,
    params: {
        key: MY_KEY,
        image_type: TYPE,
        orientation: ORIENTATION,
        per_page: LIMIT,
    }
});

export const searchApiPictures = async (q, page) => {
    const { data } = await instance.get('/', {
        params: {
            q,
            page,
        }
    });
    return data;
}


