import { useRef, useState } from 'react'

import { Box, FormControl, FormLabel, Input, InputLeftElement, InputGroup, SimpleGrid, Heading, Tag, TagLabel, TagCloseButton, Flex } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'

import { getSearch } from '../../lib/getSearch'

import Listing from '../../components/Listing'
import ProgressBar from '../../components/ProgressBar'
import Card from '../../components/Card'

export default function Home() {
  const [search, setSearch] = useState('')

  const { data, error, loading } = getSearch(search)

  if (loading) return <ProgressBar />

  function handleSearch(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      setSearch(e.currentTarget.value)
    }
  }

  return (
    <Box className='content'>

      <Flex justify={{ base: 'center', md: 'flex-start' }}>
        <FormControl color={'gray.400'} maxW='220px'>
          <FormLabel>Search</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents={'none'} children={<SearchIcon color='gray.300' />} />
            <Input placeholder='' boxShadow={'md'} w='100%' onKeyDown={handleSearch} />
          </InputGroup>
        </FormControl>
      </Flex>

      {search === '' ? (
        <>
          <Listing title='Trending now' sort='TRENDING_DESC' />

          <Listing title='Popular this season' sort='POPULARITY_DESC' seasonYear={2023} />

          <Listing title='All time popular' sort='POPULARITY_DESC' />
        </>
      ) : (
        <Flex mt='2rem' flexDir={'column'}>
          <Tag size={'md'} borderRadius='md' animation={'onLoadCard .3s linear'} colorScheme='purple' w='fit-content' alignSelf={{ base: 'center', sm: 'flex-start' }}>
            <TagLabel color={'gray.500'} textTransform='capitalize'>{search}</TagLabel>
            <TagCloseButton onClick={() => setSearch('')} />
          </Tag>

          {data.Page.media.length === 0 ? <Heading color='gray.500' textAlign={'center'} mt='3rem'>No results</Heading> : (
            <Flex gap={{ base: '1rem', sm: '2rem' }} justify={{ base: 'center', md: data.Page.media.length < 6 ? 'flex-start' : 'space-between' }} wrap={'wrap'} mt='2rem'>
              {data.Page.media.map((item: any) => <Card key={item.id} data={item} />)}
            </Flex>
          )}
        </Flex>
      )}

    </Box>
  )
}