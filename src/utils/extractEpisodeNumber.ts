// src/utils/episodeUtils.ts

/**
 * Function to extract the episode number from an episode URL.
 * @param episodeUrl - The full URL of the episode.
 * @returns The extracted episode number as a string.
 */
export const extractEpisodeNumber = (episodeUrl: string): string => {
    return episodeUrl.split('/').pop() || '';
};
