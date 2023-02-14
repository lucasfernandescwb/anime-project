import { useNavigate } from 'react-router-dom';
import { Box, Text, Image, HStack, VStack } from '@chakra-ui/react'

interface IData {
    data: {
        id: number;
        name: { userPreferred: string; native: string; first: string; last: string; }
        image: { large: string }
    };
}

export default function Character({ data }: IData) {
  const navigate = useNavigate()

  return (
    <Box 
        w={'100%'} 
        maxW={{ sm: '300px', md: 'none' }}
        h='90px' 
        bg='whitesmoke' 
        borderRadius={'4px'} 
        overflow='hidden' 
        transition={'box-shadow .3s linear'}
        _hover={{ cursor: 'pointer', boxShadow: 'var(--box-shadow-img)' }}
        onClick={() => navigate(`/character/${data.id}`)}
    >
        <HStack w={'100%'} h={'100%'}>
            <Box w={'25%'}>
                <Image src={data.image.large} alt='Character image' h='100%' objectFit={'cover'} />
            </Box>

            <VStack align={'start'}>
                <Text>{data.name.userPreferred.length > 30 ? data.name.first : data.name.userPreferred}</Text>
                <Text>{data.name.native}</Text>
            </VStack>
        </HStack>
    </Box>
  )
}
