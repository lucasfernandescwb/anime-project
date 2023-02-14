import { HStack, SimpleGrid, Skeleton, Hide } from '@chakra-ui/react'

export default function Loader() {
  return (
    <HStack mt='3rem' w={'100%'}>
        <SimpleGrid minChildWidth={'195px'} spacing='5' w={'100%'} justifyItems={{ base: 'center', md: 'none' }}>
          <Skeleton h={'317px'} w='195px' borderRadius={'4px'} />

          <Skeleton h={'317px'} w='195px' borderRadius={'4px'} />

          <Skeleton h={'317px'} w='195px' borderRadius={'4px'} />

          <Skeleton h={'317px'} w='195px' borderRadius={'4px'} />

          <Skeleton h={'317px'} w='195px' borderRadius={'4px'} />

          <Hide breakpoint='(max-width: 1318px)'>
            <Skeleton h={'317px'} w='195px' borderRadius={'4px'} />
          </Hide>
        </SimpleGrid>
    </HStack>
  )
}
