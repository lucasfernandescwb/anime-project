import { Box, Text, Image } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

interface ICard {
    data: {
      id: number;
      title: { userPreferred: string };
      coverImage: { extraLarge: string };
    };
    hide?: boolean;
}

export default function Card({ data, hide }: ICard) {
  const navigate = useNavigate()

  return (
    <Box onClick={() => navigate(`anime/${data.id}`)} className={hide ? 'display_none' : ''} w={'195px'} h='317px' animation={'onLoadCard .3s linear '} transition={'transform .2s linear'} color='gray.400' _hover={{ transform: 'scale(1.02)', cursor: 'pointer' }}>
        <Box w='100%' h='265px' overflow={'hidden'} borderRadius='4px' boxShadow={'var(--box-shadow-img)'}>
            <Image 
              w={'100%'}
              h='100%'
              src={data.coverImage.extraLarge} 
              alt='Card`s cover image' 
              objectFit={'cover'} />
        </Box>

        <Text textAlign={'left'}>{data.title.userPreferred.length > 35 ? data.title.userPreferred.slice(0, 40) + '...' : data.title.userPreferred}</Text>
    </Box>
  )
}
