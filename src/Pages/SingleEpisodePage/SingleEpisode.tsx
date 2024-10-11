import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Character, Episode } from '../../interfaces/interfaces';
import { extractURLids } from '../../utils/extractURLids';
import { useCharacterNavigation } from '../../utils/useCharacterNavigation';
import { fetchAllCharactersBasedOnIds } from '../../utils/fetchAllCharactersBasedOnIds';

const SingleEpisode: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [episode, setEpisode] = useState<Episode>();
    const [episodeCharacters, setEpisodeCharacters] = useState<Character[]>([]);
    const { handleCharacterClick } = useCharacterNavigation();

    const fetchSingleEpisode = async () => {
        try {
            const apiUrl = process.env.REACT_APP_API_URL;

            if (!apiUrl) {
                throw new Error('API URL err');
            }

            const response = await axios.get<Episode>(`${apiUrl}episode/${id}`);
            setEpisode(response.data);
            const ids = extractURLids(response.data.characters);
            const characters = await fetchAllCharactersBasedOnIds(ids);
            setEpisodeCharacters(characters);

        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchSingleEpisode()
    }, [])

    return (
        <>
            <div>
                <div className="m-6 p-6 bg-gray-200">
                    <h3>Single Episode</h3>
                    <div className="mt-6 border-t border-gray-100">
                        <dl className="divide-y divide-gray-100">
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Name</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{episode?.name}</dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Air date</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{episode?.air_date}</dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Season and episode</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{episode?.episode}</dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Characters in this episode</dt>

                                <dd className="cursor-pointer mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {episodeCharacters.map((character) => (
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

export default SingleEpisode;
