import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Character } from '../../interfaces/intefaces';

const SingleCharacter: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [character, setCharacter] = useState<Character | undefined>();
    const navigate = useNavigate();

    const handleCharacterLocation = (locationUrl: string | undefined) => {
        const id: string = locationUrl?.split("/").pop() || "";
        navigate(`/single-location/${id}`);
    };

    const fetchSingleCharacter = async () => {
        try {
            const apiUrl = process.env.REACT_APP_API_URL;

            if (!apiUrl) {
                throw new Error('API URL err');
            }

            const response = await axios.get<Character>(`${apiUrl}/character/${id}`);
            setCharacter(response.data);
            console.log('single character', response.data)

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchSingleCharacter()
    }, [])

    return (
        <div className="m-6 p-6 bg-gray-200">
            <div className="px-4 sm:px-0">
                <img src={character?.image} alt="" />
            </div>
            <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{character?.name}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Gender</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{character?.gender}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Species</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{character?.species}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Status</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{character?.status}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Origin</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {character?.origin.name}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Location</dt>
                        <dd onClick={() => handleCharacterLocation(character?.location.url)} className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {character?.location.name}
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    );
};

export default SingleCharacter;
function setError(arg0: string) {
    throw new Error('Function not implemented.');
}

