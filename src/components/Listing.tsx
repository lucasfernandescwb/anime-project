import { Box, SimpleGrid, Heading } from '@chakra-ui/react'

import { IListing } from '../@types';
import { getQuery } from '../lib/getQuery';

import Card from './Card';
import Loader from './Loader';

export default function Listing({ title, sort, seasonYear }: IListing) {
  const { data, loading } = getQuery(sort, seasonYear)

  if (loading) return <Loader />

  return (
    <Box mt='3rem' alignContent={'center'}>
        <Box>
          <Heading color='gray.400' as='h3' size={'lg'} className='center'>{title}</Heading>

          <SimpleGrid minChildWidth={'195px'} spacing='5' mt='1rem' justifyItems={{ base: 'center', md: 'start' }}>
              {data.Page.media.map((item: any, index: number) => <Card data={item} key={item.id} hide={index === data.Page.media.length - 1} />)}
          </SimpleGrid>
        </Box>
    </Box>
  )
}
