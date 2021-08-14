<template>
  <section>
    <Header>
      <PageTitle>Expense Tracking</PageTitle>
      <StyledActionFloat>
        <a-button type="primary" @click="handleClickAddExpense">
          Add
        </a-button>
      </StyledActionFloat>
    </Header>
    <StyledContent>
      <ul>
        <li v-for="mth in monthly" :key="mth.key">
          <StyledReportCard>
            <StyledReportCardHeader>
              <span>{{ mth.month }}/{{ mth.year }}</span>
              <span>{{ mth.total }}</span>
            </StyledReportCardHeader>
            <StyledReportCardContent>
              <List :width="'100%'">
                <ListItem v-for="item in mth.transactions"
                          :key="item.id"
                          :color="item.color"
                          :clickable="true"
                          @click="handleClickEditTransaction(item.id)"
                >
                  <span>{{ item.category.name }}</span>
                  <span>{{ item.formatCurrency }}</span>
                </ListItem>
              </List>
            </StyledReportCardContent>
          </StyledReportCard>
        </li>
      </ul>
    </StyledContent>
  </section>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  useRouter,
  useStore,
} from '@nuxtjs/composition-api'
import { DisplayExpense, MonthlyExpense, Store } from '~/types'
import { StyledContent } from '~/styled-components/Content'
import { StyledReportCard } from '~/styled-components/ReportCard'
import { StyledReportCardHeader } from '~/styled-components/ReportCardHeader'
import { StyledReportCardContent } from '~/styled-components/ReportCardContent'
import { StyledActionFloat } from '~/styled-components/ActionFloat'
import { ExpenseTypeEnum } from '~/utils/const'
import { numberWithCommas } from '~/helpers/currency'

export default defineComponent({
  name: 'ExpensePage',
  components: { StyledContent, StyledReportCard, StyledReportCardHeader, StyledReportCardContent, StyledActionFloat },
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
        const key = new Date(date.getFullYear(), date.getMonth()).getTime()

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
          color: pickColor(curr.type),
          formatCurrency: `${pickSign(curr.type)}￥${numberWithCommas(curr.amount)}`
        })
        target.sign = target.total > -1 ? '+' : '-'
        target.color = pickColor(target.sign === '+' ? ExpenseTypeEnum.CashIn : ExpenseTypeEnum.CashOut)

        return acc
      }, new Map())
      
      const keys = [...normalize.keys()]

      keys.sort((a, b) => a - b)

      return keys.map((key: number) => {
        const data: MonthlyExpense = normalize.get(key)
        const total = `${data.sign}￥${numberWithCommas(Math.abs(data.total))}`

        return {
          ...data,
          key,
          total,
        }
      })
    })

    function handleClickAddExpense() {
      router.push('/expense')
    }

    function handleClickEditTransaction(expenseId: string) {
      router.push(`/expense/${expenseId}`)
    }

    return {
      monthly,
      handleClickAddExpense,
      handleClickEditTransaction,
    }
  },
})
</script>