import axios from 'axios';
import { Character } from '../interfaces/interfaces';

const apiUrl = process.env.REACT_APP_API_URL;

export const fetchAllCharactersBasedOnIds = async (ids: string): Promise<Character[]> => {
    if (!apiUrl) {
        throw new Error('API URL is undefined');
    }

    const response = await axios.get<Character[]>(`${apiUrl}character/${ids}`);
    return response.data;
};
