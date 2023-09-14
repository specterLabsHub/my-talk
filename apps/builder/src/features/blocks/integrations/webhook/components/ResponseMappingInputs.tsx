import { AutocompleteInput } from '@/components/inputs/AutocompleteInput'
import { TableListItemProps } from '@/components/TableList'
import { VariableSearchInput } from '@/components/inputs/VariableSearchInput'
import { Stack, FormControl, FormLabel } from '@chakra-ui/react'
import { Variable, ResponseVariableMapping } from '@typebot.io/schemas'
import { useScopedI18n } from '@/locales'

export const DataVariableInputs = ({
  item,
  onItemChange,
  dataItems,
}: TableListItemProps<ResponseVariableMapping> & { dataItems: string[] }) => {
  const handleBodyPathChange = (bodyPath: string) =>
    onItemChange({ ...item, bodyPath })
  const handleVariableChange = (variable?: Variable) =>
    onItemChange({ ...item, variableId: variable?.id })

    const scopedT = useScopedI18n('build')

  return (
    <Stack p="4" rounded="md" flex="1" borderWidth="1px">
      <FormControl>
        <FormLabel htmlFor="name">Data:</FormLabel>
        <AutocompleteInput
          items={dataItems}
          defaultValue={item.bodyPath}
          onChange={handleBodyPathChange}
          placeholder={scopedT("Select the data")}
          withVariableButton
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="value">{scopedT("Set variable:")}</FormLabel>
        <VariableSearchInput
          onSelectVariable={handleVariableChange}
          placeholder={scopedT("Search for a variable")}
          initialVariableId={item.variableId}
        />
      </FormControl>
    </Stack>
  )
}
