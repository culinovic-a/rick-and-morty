/**
 * Function to extract the IDs from an array of URLs.
 * @param urls - The array of URLs to extract IDs from.
 * @returns A string of IDs joined by a comma.
 */
export const extractURLids = (urls: string[]): string => {
    return urls.map((url) => url.split('/').pop() || '').join(',');
};