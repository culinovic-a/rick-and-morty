import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

interface ApiResponse {
    info: Info,
    results: Array<Character>
}

interface Info {
    count: number;
    next: string | null;
    prev: string | null;
    pages: number;
}

interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: {
        name: string;
        url: string;
    },
    location: {
        name: string;
        url: string;
    },
    image: string;
    episode: string[],
    url: string;
    created: string;
}

const Characters: React.FC = () => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [info, setInfo] = useState<Info | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const navigate = useNavigate();

    const handleCharacterClick = (characterId: number) => {
        navigate(`/single-character/${characterId}`);
    };

    const fetchCharacters = async (page: number) => {
        if (loading) return;
        setLoading(true);
        try {
            const apiUrl = process.env.REACT_APP_API_URL;

            if (!apiUrl) {
                throw new Error('API URL err');
            }

            const response = await axios.get<ApiResponse>(`${apiUrl}/character?page=${page}`);
            setCharacters((prev) => [...prev, ...response.data.results]);
            setInfo(response.data.info);
            setHasMore(!!response.data.info.next);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleScroll = useCallback(() => {
        if (loading || !hasMore) return;
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

        if (scrollTop + clientHeight >= scrollHeight - 5) {
            setCurrentPage((prev) => prev + 1);
        }
    }, [loading, hasMore]);

    useEffect(() => {
        fetchCharacters(currentPage);
    }, [currentPage]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    useEffect(() => {
        setLoading(true);
    }, [currentPage]);

    if (loading && currentPage === 1) {
        return <div>Loading characters...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const extractEpisodeNumber = (episodeUrl: string): string => {
        return episodeUrl.split('/').pop() || '';
    };

    return (
        <div>
            <div className="max-w-2xl mx-auto text-center py-8">
                <h1 className="text-3xl font-bold mb-4">Character List</h1>
                <input
                    type="text"
                    className="border border-gray-300 rounded-lg py-2 px-4 mb-6 w-4/5"
                    placeholder="Search characters..."
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {characters.map((character) => (
                        <div onClick={() => handleCharacterClick(character.id)} key={character.id} className="bg-white border border-gray-300 rounded-lg shadow p-4">
                            <h2 className="mb-1 text-xl font-medium text-gray-900">{character.name}</h2> <span> {character.gender}, {character.status}, {character.species}</span>
                            <img src={character.image} alt={character.name} />
                            <div className="mt-2">
                                <h3>Episodes:</h3>
                                {character.episode.map((episodeUrl, index) => (
                                    <span
                                        key={index}
                                        className="inline-block text-gray-600 mr-1"
                                    >
                                        {extractEpisodeNumber(episodeUrl)}
                                        {index !== character.episode.length - 1 && ','}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {loading && <div>Loading more characters...</div>}
        </div>
    );
};

export default Characters;
