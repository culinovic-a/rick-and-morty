import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Character, Location } from '../../interfaces/interfaces';
import axios from 'axios';
import { extractURLids } from '../../utils/extractURLids';
import { useCharacterNavigation } from '../../utils/useCharacterNavigation';

const SingleLocation: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [singleLocation, setSingleLocation] = useState<Location | undefined>();
    const [locationCharacters, setLocationCharacters] = useState<Character[]>([]);
    const navigate = useNavigate();
    const { handleCharacterClick } = useCharacterNavigation();

    const fetchAllLocationCharacters = async (ids: string) => {
        try {
            const apiUrl = process.env.REACT_APP_API_URL;

            if (!apiUrl) {
                throw new Error('API URL err');
            }

            const response = await axios.get<Character[]>(`${apiUrl}character/${ids}`);
            setLocationCharacters(response.data);

        } catch (err) {
            console.error(err)
        }
    }

    const fetchSingleLocation = useCallback(async () => {
        try {
            const apiUrl = process.env.REACT_APP_API_URL;

            if (!apiUrl) {
                throw new Error('API URL err');
            }

            const response = await axios.get<Location>(`${apiUrl}location/${id}`);
            setSingleLocation(response.data);
            const ids = extractURLids(response.data.residents);

            if (ids !== undefined) {
                await fetchAllLocationCharacters(ids);
            }

        } catch (err) {
            console.error(err);
        }
    }, [id, extractURLids, fetchAllLocationCharacters]);

    useEffect(() => {
        fetchSingleLocation()
    }, [])

    return (
        <>
            <div>
                <div className="m-6 p-6 bg-gray-200">
                    <h3>Single Location</h3>
                    <div className="mt-6 border-t border-gray-100">
                        <dl className="divide-y divide-gray-100">
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Name</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{singleLocation?.name}</dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Dimension</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{singleLocation?.dimension}</dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Type</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{singleLocation?.type}</dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Residents</dt>

                                <dd className="cursor-pointer mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {locationCharacters.map((character) => (
                                        <div className='mb-10 flex items-center underline decoration-sky-500' key={character.id} onClick={() => handleCharacterClick(character.id)}>
                                            <span className='mr-5'>
                                                {character.name}
                                            </span>
                                            <img className="w-12 h-12 rounded-full object-cover border-2 border-gray-300" src={character.image} alt="" /></div>
                                    ))}
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleLocation;
