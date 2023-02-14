import { useQuery, gql } from '@apollo/client'

const GET_CHARACTER = gql`
    query($id: Int) {
        Character(id: $id) {
          id
          name { userPreferred native }
          image { large }
          description
          age
          gender
        }
    }
`;

export const getCharacter = (id: number) => {
    const { data, error, loading } = useQuery(GET_CHARACTER, { variables: { id } })

    return { data, error, loading }
}