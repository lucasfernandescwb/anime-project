import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Box, HStack, Image, Text, Heading, VStack, Show, Hide } from '@chakra-ui/react'

import showdown from 'showdown'

import { getCharacter } from "../../lib/getCharacter"
import ProgressBar from '../../components/ProgressBar'

export default function Character() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const { id } = useParams()

  const { data, error, loading } = getCharacter(Number(id))

  if (loading) return <ProgressBar />

  const converter = new showdown.Converter()

  const rawDescription = data.Character.description

  const formattedDescription = rawDescription !== null ? converter.makeHtml(rawDescription).split('</p>') : ''

  return (
    <Box className='content' color={'gray.500'}> 
      <Hide breakpoint='(max-width: 428px)'>
        <HStack align={'flex-start'} spacing={8}>
          <Image 
            src={data.Character.image.large} 
            w='240px' 
            h='auto'
            borderRadius={'2px'} 
            boxShadow='var(--box-shadow-img)'  
          />

          <VStack align={'flex-start'} spacing={6}>
            <Box>
              <Heading>{data.Character.name.userPreferred}</Heading>
              <Text mt='.5rem'>{data.Character.name.native}</Text>
            </Box>

            <Box>
                {data.Character.age && (
                  <Text>
                    <span style={{ fontWeight: 'bold' }}>Age: </span> 
                    {data.Character.age}
                </Text>
                )}

                {data.Character.gender && (
                  <Text>
                    <span style={{ fontWeight: 'bold' }}>Gender: </span> 
                    {data.Character.gender}
                </Text>
                )}

                {formattedDescription && formattedDescription.map((v, index) => <Box mt={index > 0 ? '1rem' : 0} key={index} dangerouslySetInnerHTML={{ __html: index !== 0  ? formattedDescription[index] + '</p>' : formattedDescription[index].replace(/\n/gi, '<br />') + '</p>'}} p='0 .5rem 0 0' />)}
            </Box>
          </VStack>
        </HStack>
      </Hide>

      <Show breakpoint='(max-width: 428px)'>
        <VStack align={'center'}>
          <Image 
            src={data.Character.image.large} 
            w='210px' 
            h='auto'
            borderRadius={'2px'} 
            boxShadow='var(--box-shadow-img)'  
            objectFit={'cover'}
          />
        </VStack>

        <VStack align={'flex-start'} spacing={6} mt='1rem'>
            <Box textAlign={'center'} w='100%'>
              <Heading>{data.Character.name.userPreferred}</Heading>
              <Text mt='.5rem'>{data.Character.name.native}</Text>
            </Box>

            <Box>
              {data.Character.age && (
                <Text>
                  <span style={{ fontWeight: 'bold' }}>Age: </span> 
                  {data.Character.age}
                </Text>
              )}

              {data.Character.gender && (
                <Text>
                  <span style={{ fontWeight: 'bold' }}>Gender: </span> 
                  {data.Character.gender}
                </Text>
              )}

              {formattedDescription && formattedDescription.map((v, index) => <Box mt={index > 0 ? '1rem' : 0} key={index} dangerouslySetInnerHTML={{ __html: index !== 0  ? formattedDescription[index] + '</p>' : formattedDescription[index].replace(/\n/gi, '<br />') + '</p>'}} p='0 .5rem 0 0' />)}
            </Box>
          </VStack>
      </Show>
    </Box>
  )
}
