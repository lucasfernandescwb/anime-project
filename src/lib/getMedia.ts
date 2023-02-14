import { useQuery, gql } from '@apollo/client'

const GET_QUERY = gql`
    query($id: Int) {
        Media(id: $id, type: ANIME) {
          id
          title { userPreferred }
          bannerImage
          coverImage { extraLarge }
          description
          characters(sort: FAVOURITES_DESC, perPage: 12) {
            nodes {
              id
              name { userPreferred native first last }
              image { large }
            }
          }
        }
    }
`;

export const getMedia = (id: number) => {
    const { data, error, loading } = useQuery(GET_QUERY, { variables: { id } })

    return { data, error, loading }
}