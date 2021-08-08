<template>
  <section>
    <Header>
      <PageTitle>Expense Tracking</PageTitle>
    </Header>
    <StyledContainer>
      <ul>
        <li>
          <section>
            <div>
              <span>7/2021</span>
              <span>2000</span>
            </div>
            <div v-for="item in transactions" :key="item.key">
              <span>{{ item.category.name }}</span>
              <span>{{ item.amount }}</span>
            </div>
          </section>
        </li>
      </ul>
    </StyledContainer>
  </section>
</template>

<script lang="ts">
import {
  // computed,
  defineComponent,
  useStore,
} from '@nuxtjs/composition-api'
import { uuid } from 'vue-uuid'
import { ExpenseTypeEnum } from '~/store/modules/expenses'
import { Expense, Store } from '~/types'

export default defineComponent({
  name: 'ExpensePage',
  setup() {
    const store = useStore<Store>()
    
    async function adddd() {
      try {
        await store.dispatch('categories/initialiseStore', 'tests')
      } catch (error) {
        console.log(error)
      }
    }

    const transactions: Expense[] = [{
      type: ExpenseTypeEnum.CashOut,
      category: {
        name: 'Ent',
        isMain: false,
        order: 1,
      },
      date: new Date(),
      amount: 50,
      description: '',
    },{
      type: ExpenseTypeEnum.CashOut,
      category: {
        name: 'Trans',
        isMain: false,
        order: 1,
      },
      date: new Date(),
      amount: 505,
      description: '',
    },{
      type: ExpenseTypeEnum.CashIn,
      category: {
        name: 'Work',
        isMain: false,
        order: 1,
      },
      date: new Date(),
      amount: 504,
      description: '',
    }].map(t => ({ ...t, key: uuid.v4() }))

    return {
      adddd,
      transactions,
    }
  }
})
</script>