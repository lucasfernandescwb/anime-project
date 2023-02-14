import { useQuery, gql } from '@apollo/client'

const GET_SEARCH = gql`
    query($search: String) {
        Page(page: 1) {
            media(sort: SEARCH_MATCH, search: $search, type: ANIME, isAdult: false) {
                id
                title { userPreferred }
                coverImage { extraLarge }
            }
        }
    }
`;

export const getSearch = (search: string) => {
    const { data, error, loading } = useQuery(GET_SEARCH, { variables: { search } })

    return { data, error, loading }
}