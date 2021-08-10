<template>
  <a-layout>
    <Header>
      <PageTitle>Expense Tracking</PageTitle>
      <StyledExpenseActionFloat>
        <a-button type="primary" @click="handleAddExpenseClick">
          Add
        </a-button>
      </StyledExpenseActionFloat>
    </Header>
    <StyledContent>
      <ul>
        <li v-for="mth in monthly" :key="mth.month + mth.year">
          <StyledReportCard>
            <StyledReportCardHeader :color="mth.color">
              <span>{{ mth.month }}/{{ mth.year }}</span>
              <span>{{ mth.sign }} &#165;{{ mth.total }}</span>
            </StyledReportCardHeader>
            <StyledReportCardContent>
              <List :width="'100%'">
                <ListItem v-for="item in mth.transactions"
                          :key="item.key"
                          :color="item.color"
                          :clickable="true"
                          @click="handleTransactionClick(item.id)"
                >
                  <span>{{ item.category.name }}</span>
                  <span>{{ item.sign }} &#165;{{ item.amount }}</span>
                </ListItem>
              </List>
            </StyledReportCardContent>
          </StyledReportCard>
        </li>
      </ul>
    </StyledContent>
  </a-layout>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  useRouter,
  useStore,
} from '@nuxtjs/composition-api'
import { uuid } from 'vue-uuid'
import { DisplayExpense, MonthlyExpense, Store } from '~/types'
import { StyledContent } from '~/styled-components/Content'
import { StyledReportCard } from '~/styled-components/ReportCard'
import { StyledReportCardHeader } from '~/styled-components/ReportCardHeader'
import { StyledReportCardContent } from '~/styled-components/ReportCardContent'
import { StyledExpenseActionFloat } from '~/styled-components/ExpenseActionFloat'
import { ExpenseTypeEnum } from '~/utils/const'

export default defineComponent({
  name: 'ExpensePage',
  components: { StyledContent, StyledReportCard, StyledReportCardHeader, StyledReportCardContent, StyledExpenseActionFloat },
  setup() {
    const router = useRouter()
    const store = useStore<Store>()

    function pickSign (type: ExpenseTypeEnum) {
      return type === ExpenseTypeEnum.CashOut ? '-' : '+'
    }

    function pickColor (type: ExpenseTypeEnum) {
      return type === ExpenseTypeEnum.CashOut ? '4B97F2' : '71AC40'
    }

    const monthly = computed(() => {
      const normalize = store.state.expenses.data.reduce((acc, curr) => {
        const date = new Date(curr.date)
        const key = date.getMonth() + date.getFullYear()

        if (!acc.has(key)) {
          const newMonth: MonthlyExpense = {
            month: date.getMonth() + 1,
            year: date.getFullYear(),
            total: 0,
            transactions: [] as DisplayExpense[],
            sign: '+',
            color: pickColor(ExpenseTypeEnum.CashIn),
          }
          acc.set(key, newMonth)
        }

        const target: MonthlyExpense = acc.get(key)

        target.total += curr.amount * (curr.type === ExpenseTypeEnum.CashOut ? -1 : 1)
        target.transactions.push({
          ...curr,
          key: uuid.v4(),
          sign: pickSign(curr.type),
          color: pickColor(curr.type),
        })
        target.sign = target.total > -1 ? '+' : '-'
        target.color = pickColor(target.sign === '+' ? ExpenseTypeEnum.CashIn : ExpenseTypeEnum.CashOut)

        return acc
      }, new Map())
      
      const keys = [...normalize.keys()]

      keys.sort()

      return keys.map(key => {
        const data: MonthlyExpense = normalize.get(key)
        return {
          ...data,
          total: Math.abs(data.total)
        }
      })
    })

    function handleAddExpenseClick() {
      router.push('/expense')
    }

    function handleTransactionClick(expenseId: string) {
      router.push(`/expense/${expenseId}`)
    }

    return {
      monthly,
      handleAddExpenseClick,
      handleTransactionClick,
    }
  },
})
</script>