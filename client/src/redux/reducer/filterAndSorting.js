import React from 'react'

export const sortVideoGames = (games, relevanceSort, sort) => {
    const sortedGames = [...games];

    if (!sort || sort === "relevance" || sort.length === 0) {
        return relevanceSort;
    }

    if (sort === "releaseDateE") {
        return sortedGames.sort((g1, g2) => {
            return new Date(g2.releasedate) - new Date(g1.releasedate);
        });
    }

    if (sort === "releaseDateL") {
        return sortedGames.sort((g1, g2) => {
            return new Date(g1.releasedate) - new Date(g2.releasedate);
        });
    }

    if (sort === "alphabeticalA") {
        return sortedGames.sort((g1, g2) => {
            return g1.name.localeCompare(g2.name);
        });
    }

    if (sort === "alphabeticalZ") {
        return sortedGames.sort((g1, g2) => {
            return g2.name.localeCompare(g1.name);
        });
    }

    if (sort === "ratingL") {
        return sortedGames.sort((g1, g2) => {
            return g1.rating - g2.rating;
        });
    }

    if (sort === "ratingH") {
        return sortedGames.sort((g1, g2) => {
            return g2.rating - g1.rating;
        });
    }
}
export const filterVideoGames = (games, filter) => {
    if (filter.length === 0) return games;
    let newFilteredGames = games.filter((g) => filter.every(genre => g.genre.includes(genre)));
    return newFilteredGames;
}

export const filterVideoGamesBySource = (games, filter) => {
    if (filter === "both") {
        return games;
    } else if (filter === "client") {
        let newFilteredGames = games.filter((g) => g.id.toString().includes("-"));
        return newFilteredGames;
    } else if (filter === "api") {
        let newFilteredGames = games.filter((g) => !g.id.toString().includes("-"));
        return newFilteredGames;
    }
}

export const filterVideoGamesByPlatform = (games, filter) => {
    if (filter === "All") {
        return games;
    } else {
        let newFilteredGames = games.filter((g) => g.platforms.includes(filter));
        return newFilteredGames;
    }
}