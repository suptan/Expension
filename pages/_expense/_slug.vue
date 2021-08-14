<template>
  <StyledExpandContainer>
    <Header>
      <PageTitle>{{ labels.title }}</PageTitle>
      <StyledActionFloat>
        <a-button v-if="isEdit" type="primary" @click="handleClickRemoveExpense">
          Remove
        </a-button>
      </StyledActionFloat>
    </Header>
    <StyledContent>
      <StyledExpenseContent>
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
              <a-select-option v-for="item in categories" :key="item.name" :value="item.name">
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
              <nuxt-link to="/">
                <a-button block>Cancel</a-button>
              </nuxt-link>
              <a-button type="primary" html-type="submit">{{ labels.submit }}</a-button>
            </StyledExpandFooter>
          </a-form-item>
        </a-form>
      </StyledExpenseContent>
    </StyledContent>
    <a-modal v-model="displayConfirmRemove"
             ok-text="Confirm"
             :closable="false"
             @ok="handleRemoveConfirm"
    >
      <p>Do you really want to remove?</p>
    </a-modal>
  </StyledExpandContainer>
</template>

<script lang="ts">
import { useContext, useRouter, useStatic, useStore } from '@nuxtjs/composition-api'
import { computed, defineComponent, ref } from '@vue/composition-api'
import moment from 'moment'
import { uuid } from 'vue-uuid'
import { DateFormat } from '~/helpers/date'
import { ExpenseAction } from '~/store/modules/expenses/action-types'
import { StyledContent } from '~/styled-components/Content'
import { StyledRadioGroup } from '~/styled-components/RadioGroup'
import { StyledInputNumber } from '~/styled-components/InputNumber'
import { StyledExpandFooter } from '~/styled-components/ExpenseFooter'
import { StyledExpenseContent } from '~/styled-components/ExpenseContent'
import { StyledActionFloat } from '~/styled-components/ActionFloat'
import { StyledExpandContainer } from '~/styled-components/ExpenseContainer'
import { Expense, Store } from '~/types'
import { ExpenseTypeEnum } from '~/utils/const'

type FormState = {
  type: ExpenseTypeEnum
  category: string
  amount: number
  transactionDate: moment.Moment
  description: string
}

export default defineComponent({
  name: 'ExpensePage',
  components: { StyledContent, StyledRadioGroup, StyledInputNumber, StyledExpandFooter, StyledExpenseContent, StyledActionFloat, StyledExpandContainer },
  layout: 'empty',
  setup() {
    const { params } = useContext()
    const router = useRouter()
    const store = useStore<Store>()
    const types = ExpenseTypeEnum
    const categories = computed(() => store.state.categories.list)
    const slug = computed(() => params.value.slug)
    const expense = useStatic((slug) => Promise.resolve(computed(() => store.state.expenses.data.find(({ id }) => id === slug)).value), slug, 'expense')
    const isEdit = computed(() => expense.value?.id != null)
    const labels = computed(() => {
      const { id } = expense.value || {}
      return {
        title: `${id ? 'Edit' : 'Add'} Expense`,
        submit: id ? 'Update' : 'Add',
      }
    })
    const addExpense = (payload: Expense) => {
      try {
        store.dispatch(ExpenseAction.ADD, payload)
      } catch (error) {
        console.error(error)
      }
    }
    const removeExpense = (id: string) => {
      try {
        store.dispatch(ExpenseAction.REMOVE, id)
      } catch (error) {
        console.error(error)
      }
    }
    const editExpense = (payload: Expense) => {
      try {
        store.dispatch(ExpenseAction.UPDATE, payload)
      } catch (error) {
        console.error(error)
      }
    }
    
    const typeConfig = computed(() => ({
      initialValue: expense.value?.type || ExpenseTypeEnum.CashIn,
      rules: [
        {
          required: true,
          message: 'Please pick a type!',
        },
      ],
    }))
    const categoryConfig = computed(() => ({
      initialValue: expense.value?.category.name || categories.value[0].name,
      rules: [
        {
          required: true,
          message: 'Please pick a category!',
        },
      ],
    }))
    const amountConfig = computed(() => ({
      initialValue: expense.value?.amount,
      rules: [
        {
          required: true,
          message: 'Should greater than or equal 0!',
        }
      ],
    }))
    const dateConfig = computed(() => ({
      initialValue: moment(expense.value?.date) || moment(),
      rules: [
        {
          required: true,
          message: 'Please pick a date!',
        },
      ],
    }))
    const descriptionConfig = computed(() => ({
      initialValue: expense.value?.description,
    }))
    const displayConfirmRemove = ref(false)

    return {
      categories,
      expense,
      dateFormat: DateFormat.Picker,
      types,
      labels,
      isEdit,
      displayConfirmRemove,
      typeConfig,
      categoryConfig,
      amountConfig,
      dateConfig,
      descriptionConfig,
      addExpense,
      removeExpense,
      editExpense,
      handleCancel() {
        router.push('/')
      },
      handleClickRemoveExpense() {
        displayConfirmRemove.value = true
      },
      handleRemoveConfirm() {
        removeExpense(slug.value)
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

        const { category, transactionDate, ...rest } = values
        const payload: Expense = {
          ...rest,
          id: uuid.v4(),
          category: this.categories.find(({ name }) => name === category) || this.categories[0],
          date: transactionDate.toDate(),
        }

        if (this.expense?.id) {
          this.editExpense({ ...payload, id: this.expense.id })
        } else {
          this.addExpense(payload)
        }

        this.$router.push('/')
      })
    },
  }
})
</script>