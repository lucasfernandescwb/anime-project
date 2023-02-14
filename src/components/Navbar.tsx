import { useEffect, useState } from 'react';

import { NavLink } from 'react-router-dom'
import { Flex, Spacer, Box, Heading, Button } from '@chakra-ui/react'

export default function Navbar() {
  const [show, setShow] = useState< boolean >(true);
  const [lastScrollY, setLastScrollY] = useState< number >(0);

  const controlHeader = () => {
      if (typeof window !== 'undefined') {
          if (window.scrollY > lastScrollY) {
               setShow(true);
          } else {
              setShow(false);
          }

          setLastScrollY(window.scrollY);
        }
    }

  useEffect(() => {
    if (typeof window !== 'undefined') {
        window.addEventListener('scroll', controlHeader);

        return () => {
            window.removeEventListener('scroll', controlHeader);
        }
    }
  }, [lastScrollY]);

  
  return (
    <Box className={`navbar ${show && 'hide-navbar'}`} as='nav'>
        <Flex w='100%' maxW={'1520px'} h='100%' align='center' p='0 1rem' m='0 auto'>
            <NavLink to='/'>
              <Heading size='md' color='white'>QAttempt</Heading>
            </NavLink>

            <Spacer />

            <Button>
              <a href='https://github.com/lucasfernandescwb' target={'_blank'}>Github 😎</a>
            </Button>
        </Flex>
    </Box>
  )
}
