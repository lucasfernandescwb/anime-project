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
  SimpleGrid,
  Text
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
          <HStack spacing={5} align='start'>
            <Box w='240px' h={'305px'} overflow={'hidden'} borderRadius='2px' boxShadow={'var(--box-shadow-img)'}>
              <Image 
                src={data.Media.coverImage.extraLarge}
                w='100%'
                h={'100%'}
                objectFit='cover'
                alt='Anime image'
              />
            </Box>

            
            <VStack w='100%' align='start'>
              <Heading>{data.Media.title.userPreferred}</Heading>

              <Box dangerouslySetInnerHTML={{ __html: formattedDescription }} p='0 .5rem 0 0' />
            </VStack>
          </HStack>
        </Hide>

        <Show breakpoint='(max-width: 428px)'>
          <VStack spacing={6} align='center' w='100%'>
            <Image 
              src={data.Media.coverImage.extraLarge} 
              w='auto' 
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
            <Tab _selected={{ bg: 'purple.400', color: 'white' }}>Overview</Tab>
          </TabList>

          <TabPanels mt='1.5rem'>
            <TabPanel padding={{ sm: 0, md: '1rem' }}>
              
              <Box>
                <Heading as='h3' size={'md'}>Some infos</Heading>

                <VStack align='start' mt='1rem'>
                  <Text>Source: <Text as='span' color='purple.500'>{data.Media.source.replace("_", " ")}</Text></Text>
                  <Text>Type: <Text as='span' color='purple.500'>{data.Media.type}</Text></Text>
                  <Text>Format: <Text as='span' color='purple.500'>{data.Media.format}</Text></Text>
                  <Text>Season Year: <Text as='span' color='purple.500'>{data.Media.seasonYear}</Text></Text>
                  <Text>Season: <Text as='span' color='purple.500'>{data.Media.season}</Text></Text>
                  <Text>Status: <Text as='span' color='purple.500'>{data.Media.status}</Text></Text>
                  <Text>Genres: <Text as='span' color='purple.500'>{data.Media.genres.join(', ')}</Text></Text>
                </VStack>
              </Box>

              <Box mt='2rem'>
                <Heading as='h3' size={'md'}>Most popular characters</Heading>

                <SimpleGrid minChildWidth={'300px'} spacing={5} justifyItems='center' mt='1.5rem'>
                  {data.Media.characters.nodes.map((c: any) => <Character data={c} key={c.id} />)}
                </SimpleGrid>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  )
}
