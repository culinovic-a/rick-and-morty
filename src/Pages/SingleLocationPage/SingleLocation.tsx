import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Character, Location } from '../../interfaces/interfaces';
import axios from 'axios';
import { extractURLids } from '../../utils/extractURLids';

const SingleLocation: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [singleLocation, setSingleLocation] = useState<Location | undefined>();
    const [locationCharacters, setLocationCharacters] = useState<Character[]>([]);
    const navigate = useNavigate();

    const handleCharacterClick = (characterId: number) => {
        navigate(`/single-character/${characterId}`);
    };

    const fetchSingleLocation = async () => {
        try {
            const apiUrl = process.env.REACT_APP_API_URL;

            if (!apiUrl) {
                throw new Error('API URL err');
            }

            const response = await axios.get<Location>(`${apiUrl}location/${id}`);
            setSingleLocation(response.data);
            const ids = extractURLids(response.data.residents);
            console.log('single location', response.data)
           
            if (ids !== undefined) {
                console.log('ids', ids)
                console.log('boop')
                await fetchAllLocationCharacters(ids);
            }

        } catch (err) {
            console.log(err)
        }
    }

    const fetchAllLocationCharacters = async (ids: string) => {
        try {
            const apiUrl = process.env.REACT_APP_API_URL;

            if (!apiUrl) {
                throw new Error('API URL err');
            }

            const response = await axios.get<Character[]>(`${apiUrl}character/${ids}`);
            console.log('all characters', response.data)
            setLocationCharacters(response.data);

        } catch (err) {
            console.log(err)
        }
    }

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

                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {locationCharacters.map((character) => (
                                        <div key={character.id} onClick={() => handleCharacterClick(character.id)}> {character.name}</div>
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
