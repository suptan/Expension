<template>
  <section>
    <Header>
      <PageTitle>{{ title }}</PageTitle>
    </Header>
    <StyledContainer>
      <a-form :form="form" @submit.prevent="handleSubmit">
        <a-form-item label="Type">
          <StyledRadioGroup>
            <a-radio-group v-decorator="['type', typeConfig]" button-style="solid">
                <a-radio-button v-for="type in types" :key="type" :value="type">
                {{ type }}
                </a-radio-button>
            </a-radio-group>
          </StyledRadioGroup>
        </a-form-item>
        <a-form-item label="Category">
          <a-select v-decorator="['category', categoryConfig]">
            <a-select-option v-for="item in categories" :key="item.name" :value="item">
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="Amount">
          <StyledInputNumber>
            <a-input-number v-decorator="['amount', amountConfig]"
                            :min="0"
                            :formatter="value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                            :parser="value => value.replace(/\￥\s?|(,*)/g, '')"
            />
          </StyledInputNumber>
        </a-form-item>
        <a-form-item label="Date">
          <a-date-picker v-decorator="['transactionDate', dateConfig]"
                         style="width: 100%"
                         :format="dateFormat"
          />
        </a-form-item>
        <a-form-item label="Description">
          <a-textarea v-decorator="['description', descriptionConfig]" placeholder="Noted..."/>
        </a-form-item>
        <a-form-item>
          <StyledExpandFooter>
            <a-button @click="handleCancel">Cancel</a-button>
            <a-button type="primary" html-type="submit">Add</a-button>
          </StyledExpandFooter>
        </a-form-item>
      </a-form>
    </StyledContainer>
  </section>
</template>

<script lang="ts">
import { useRouter, useStore } from '@nuxtjs/composition-api'
import { computed, defineComponent } from '@vue/composition-api'
import moment from 'moment'
import { DateFormat } from '~/helpers/data'
import { ExpenseTypeEnum } from '~/store/modules/expenses'
import { ExpenseAction } from '~/store/modules/expenses/action-types'
import { StyledContainer } from '~/styled-components/Container'
import { StyledRadioGroup } from '~/styled-components/RadioGroup'
import { StyledInputNumber } from '~/styled-components/InputNumber'
import { StyledExpandFooter } from '~/styled-components/ExpenseFooter'
import { Category, Expense, Store } from '~/types'

type FormState = {
  type: ExpenseTypeEnum
  category: Category
  amount: number
  transactionDate: moment.Moment
  description: string
}

export default defineComponent({
  name: 'ExpensePage',
  components: { StyledContainer, StyledRadioGroup, StyledInputNumber, StyledExpandFooter },
  layout: 'empty',
  setup() {
    const router = useRouter()
    const store = useStore<Store>()
    const categories = computed(() => store.state.categories.list)
    const types = ExpenseTypeEnum
    const addExpense = (payload: Expense) => {
      try {
        store.dispatch(ExpenseAction.ADD, payload)
      } catch (error) {
        console.error(error)
      }
    }

    return {
      addExpense,
      categories,
      dateFormat: DateFormat.Picker,
      types,
      title: `${'Add'} Expense`,
      typeConfig: {
        initialValue: ExpenseTypeEnum.CashIn,
        rules: [
          {
            required: true,
            message: 'Please pick a type!',
          },
        ],
      },
      categoryConfig: {
        initialValue: categories.value[0].name,
        rules: [
          {
            required: true,
            message: 'Please pick a category!',
          },
        ],
      },
      amountConfig: {
        initialValue: 0,
        rules: [
          {
            required: true,
            message: 'Should greater than 0!',
          }
        ],
      },
      dateConfig: {
        initialValue: moment(),
        rules: [
          {
            required: true,
            message: 'Please pick a date!',
          },
        ],
      },
      descriptionConfig: {},
      handleCancel() {
        router.push('/')
      },
    }
  },
  data() {
    return {
      form: this.$form.createForm(this, {
        name: 'expense',
      }),
    }
  },
  methods: {
    handleSubmit() {
      this.form.validateFields((error: Error[], values: FormState) => {
        if (error) {
          return
        }

        const { transactionDate, ...rest } = values

        const payload: Expense = {
          ...rest,
          date: transactionDate.toDate(),
        }

        this.addExpense(payload)

        this.$router.push('/')
      })
    },
  }
})
</script>