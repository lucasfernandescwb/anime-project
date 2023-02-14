declare interface IListing {
    title: string;

    sort: 'POPULARITY' | 'POPULARITY_DESC' | 'TRENDING' | 'TRENDING_DESC';

    seasonYear?: number;
}

export { IListing }