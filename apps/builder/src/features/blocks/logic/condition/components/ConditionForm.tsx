import { Flex } from '@chakra-ui/react'
import { DropdownList } from '@/components/DropdownList'
import { Comparison, Condition, LogicalOperator } from '@typebot.io/schemas'
import React from 'react'
import { ComparisonItem } from './ComparisonItem'
import { TableList } from '@/components/TableList'
import { useScopedI18n } from '@/locales'

type Props = {
  condition: Condition
  onConditionChange: (newCondition: Condition) => void
}

export const ConditionForm = ({ condition, onConditionChange }: Props) => {
  const handleComparisonsChange = (comparisons: Comparison[]) =>
    onConditionChange({ ...condition, comparisons })
  const handleLogicalOperatorChange = (logicalOperator: LogicalOperator) =>
    onConditionChange({ ...condition, logicalOperator })

    const scopedT = useScopedI18n('build')

  return (
    <TableList<Comparison>
      initialItems={condition.comparisons}
      onItemsChange={handleComparisonsChange}
      Item={ComparisonItem}
      ComponentBetweenItems={() => (
        <Flex justify="center">
          <DropdownList
            currentItem={condition.logicalOperator}
            onItemSelect={handleLogicalOperatorChange}
            items={Object.values(LogicalOperator)}
          />
        </Flex>
      )}
      addLabel={scopedT("Add a comparison")}
    />
  )
}
