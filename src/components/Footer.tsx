import { Box, Heading, Link } from '@chakra-ui/react'

export default function Footer() {
  return (
    <Box bg='purple.400' h='60px' display={'flex'} alignItems='center' userSelect={'none'}>
        <Heading size='sm' textAlign={'center'} w='100%' color='white'>
          Just a project for my portfolio. 
          <span style={{ fontWeight: 'bold', color: 'wheat' }}> Based on <Link href='https://anilist.co/' target={'_blank'}>Anilist.co</Link> and their API.</span>
        </Heading>
    </Box>
  )
}
