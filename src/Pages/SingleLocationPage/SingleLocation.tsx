import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Location } from '../../interfaces/interfaces';
import axios from 'axios';

const SingleLocation: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [singleLocation, setSingleLocation] = useState<Location | undefined>();

    const fetchSingleLocation = async () => {
        try {
            const apiUrl = process.env.REACT_APP_API_URL;

            if (!apiUrl) {
                throw new Error('API URL err');
            }

            const response = await axios.get<Location>(`${apiUrl}/location/${id}`);
            setSingleLocation(response.data);
            console.log('single location', response.data)

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
                <div className="flex items-center justify-center min-h-screen bg-gray-100">
                    <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm">
                        <h2 className="text-xl font-bold mb-2">{singleLocation?.name}</h2>
                        <p className="text-gray-700 mb-4">
                           <span className="font-bold">Dimension:</span> {singleLocation?.dimension}
                        </p>
                        <p className="text-gray-700 mb-4">
                           <span className="font-bold">Type:</span> {singleLocation?.type}
                        </p>
                        <p className="text-gray-700 mb-4">
                           <span className="font-bold">Residents:</span> 
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleLocation;
