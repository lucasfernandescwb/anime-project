import { 
  Box, 
  HStack, 
  Image, 
  Hide, 
  Show, 
  Tabs, 
  TabList, 
  TabPanels, 
  Tab, 
  TabPanel, 
  Heading, 
  VStack, 
  SimpleGrid 
} from '@chakra-ui/react'
import { useParams } from 'react-router-dom'

import showdown from 'showdown'

import { getMedia } from '../../lib/getMedia'

import Character from '../../components/Character'
import ProgressBar from '../../components/ProgressBar'

export default function Details() {
  const { id } = useParams()

  const { data, error, loading } = getMedia(Number(id))

  if (loading) return <ProgressBar />

  const converter = new showdown.Converter()

  const rawDescription = data.Media.description

  const formattedDescription = converter.makeHtml(rawDescription)

  return (
    <Box color={'gray.500'}>
      {data.Media.bannerImage ? 
        <Box 
          w={'100%'} 
          h='400px' 
          bg={`url(${data.Media.bannerImage}) no-repeat center center`} 
          bgSize='cover' 
          mt='-75px'
        /> 
      : null}

      <Box className='content'>
        <Hide breakpoint='(max-width: 428px)'>
          <HStack spacing={8} align='flex-start'>
            <Image 
              src={data.Media.coverImage.extraLarge} 
              w='300px' 
              h='auto'
              borderRadius={'2px'} 
              boxShadow='var(--box-shadow-img)'  
              objectFit={'cover'}
            />

            <VStack align={'flex-start'} spacing={6}>
              <Heading>{data.Media.title.userPreferred}</Heading>

              <Box dangerouslySetInnerHTML={{ __html: formattedDescription }} p='0 .5rem 0 0' />
            </VStack>
          </HStack>
        </Hide>

        <Show breakpoint='(max-width: 428px)'>
          <VStack spacing={6} align='center' w='100%'>
            <Image 
              src={data.Media.coverImage.extraLarge} 
              w='300px' 
              h='auto'
              borderRadius={'2px'} 
              boxShadow='var(--box-shadow-img)'  
              objectFit={'cover'}
            />

            <VStack spacing={6} align='center'>
              <Heading textAlign={'center'}>{data.Media.title.userPreferred}</Heading>

              <Box textAlign={'center'} dangerouslySetInnerHTML={{ __html: formattedDescription }} p='0 .5rem 0 0' />
            </VStack>
          </VStack>
        </Show>
      </Box>

      <Box className='content'>
        <Tabs defaultIndex={0} variant='enclosed' colorScheme={'purple'}>
          <TabList>
            <Tab _selected={{ bg: 'purple.400', color: 'white' }}>Characters</Tab>
          </TabList>

          <TabPanels mt='2rem'>
            <TabPanel padding={{ sm: 0, md: '1rem' }}>
              <Heading as='h3' size={'md'}>Most popular</Heading>

              <SimpleGrid minChildWidth={'300px'} spacing={5} justifyItems='center' mt='1.5rem'>
                {data.Media.characters.nodes.map((c: any) => <Character data={c} key={c.id} />)}
              </SimpleGrid>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  )
}
