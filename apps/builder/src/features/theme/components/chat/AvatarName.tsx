import { Stack, Flex, Text, Input } from '@chakra-ui/react'
import React from 'react'

export const AvatarName = () => {

  return (
    <Stack data-testid="host-bubbles-theme">
      <Flex justify="space-between" align="center">
        <Text style={{paddingRight: 24}}>Nome</Text>
        <Input
              type="text"
              autoComplete="off"
              className="select-input"
              placeholder={
               'Digite o nome do Bot'
              }
            />
      </Flex>
    </Stack>
  )
}
