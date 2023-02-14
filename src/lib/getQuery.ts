import { useQuery, gql } from '@apollo/client'

const GET_QUERY = gql`
    query($sort: [MediaSort], $seasonYear: Int) {
        Page(page: 1, perPage: 6) {
            media(sort: $sort, seasonYear: $seasonYear, type: ANIME, isAdult: false) {
              id
              title {
                userPreferred
              }
              coverImage {
                extraLarge
              }
            }
        }
    }
`;

export const getQuery = (sort: string | string[], seasonYear?: number) => {
    const { data, error, loading } = useQuery(GET_QUERY, { variables: { sort, seasonYear } })

    return { data, error, loading }
}