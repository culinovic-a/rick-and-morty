import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';
import { Character } from '../../interfaces/interfaces';
import { ApiResponse } from '../../interfaces/interfaces';
import { useCharacterNavigation } from '../../utils/useCharacterNavigation';

const Characters: React.FC = () => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const { handleCharacterClick } = useCharacterNavigation();

    const fetchCharacters = async (page: number, search: string = '') => {
        if (loading) return;
        setLoading(true);
        try {
            const apiUrl = process.env.REACT_APP_API_URL;
            if (!apiUrl) {
                throw new Error('API URL error');
            }

            const url = `${apiUrl}character?page=${page}${search ? `&name=${search}` : ''}`;
            const response = await axios.get<ApiResponse>(url);
            if (page === 1) {
                setCharacters(response.data.results);
            } else {
                setCharacters((prev) => [...prev, ...response.data.results]);
            }
            setError(null);
            setHasMore(!!response.data.info.next);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                console.error("Error Message:", err.status);
                if (err.status === 404) {
                    setError('No characters found.');
                } else {
                    setError(`Error ${err.message}`);
                }
            } else {
                console.error("Unexpected Error:", err);
                setError('An unexpected error occurred.');
            }
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
        fetchCharacters(currentPage, searchTerm);
    }, [currentPage]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    const debouncedSearch = useCallback(
        debounce((term: string) => {
            setCurrentPage(1);
            fetchCharacters(1, term);
        }, 700),
        []
    );

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value;
        setSearchTerm(term);
        debouncedSearch(term);
    };

    if (loading && currentPage === 1) {
        return <div>Loading characters...</div>;
    }

    if (error && searchTerm) {
        if (searchTerm) {
            return (
                <>
                    <div className="max-w-2xl mx-auto text-center py-8">
                        <h1 className="text-3xl font-bold mb-4">Character List</h1>
                        <input
                            type="text"
                            className="border border-gray-300 rounded-lg py-2 px-4 mb-6 w-4/5"
                            placeholder="Search characters..."
                            value={searchTerm}
                            onChange={handleSearchInputChange}
                        />
                        <div>{error}</div>
                    </div>

                </>
            );
        } else {
            return (
                <>
                    <div className="max-w-2xl mx-auto text-center py-8">
                        <div>{error}</div>
                    </div>
                </>
            )
        }
    }

    return (
        <div>
            <div className="max-w-2xl mx-auto text-center py-8">
                <h1 className="text-3xl font-bold mb-4">Character List</h1>
                <input
                    type="text"
                    className="border border-gray-300 rounded-lg py-2 px-4 mb-6 w-4/5"
                    placeholder="Search characters..."
                    value={searchTerm}
                    onChange={handleSearchInputChange}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {characters.map((character) => (
                        <div
                            onClick={() => handleCharacterClick(character.id)}
                            key={character.id}
                            className="cursor-pointer bg-white border border-gray-300 rounded-lg shadow p-4"
                        >
                            <h2 className="mb-1 text-xl font-medium text-gray-900">{character.name}</h2>
                            <span>{character.gender}, {character.status}, {character.species}</span>
                            <img src={character.image} alt={character.name} />
                        </div>
                    ))}
                </div>
            </div>

            {loading && <div>Loading more characters...</div>}
        </div>
    );
};

export default Characters;
