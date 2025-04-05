// react imports
import { useEffect, useRef } from 'react'

// rrd imports
import { useFetcher } from 'react-router-dom'

// library imports
import { PlusCircleIcon } from '@heroicons/react/24/solid'

const AddExpenseForm = ({ budgets }) => {
  const fetcher = useFetcher()
  const isSubmitting = fetcher.state === 'submitting'

  const formRef = useRef()
  const focusRef = useRef()

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current.reset() // clear form
      focusRef.current.focus() // reset focus
    }
  }, [isSubmitting])

  return (
    <div className='form-wrapper'>
      <h2 className='h3'>
        Add New{' '}
        <span className='accent'>
          {budgets.length === 1 && `${budgets.map(b => b.name)}`}
        </span>{' '}
        Expense
      </h2>

      <fetcher.Form
        method='post'
        className='grid-sm'
        ref={formRef}>
        {/* ---------- expense name + amount ---------- */}
        <div className='expense-inputs'>
          <div className='grid-xs'>
            <label htmlFor='newExpense'>Expense Name</label>
            <input
              type='text'
              name='newExpense'
              id='newExpense'
              placeholder='e.g., Coffee'
              ref={focusRef}
              required
            />
          </div>

          <div className='grid-xs'>
            <label htmlFor='newExpenseAmount'>Amount</label>
            <input
              type='number'
              step='0.01'
              inputMode='decimal'
              name='newExpenseAmount'
              id='newExpenseAmount'
              placeholder='e.g., 3.50'
              required
            />
          </div>
        </div>

        {/* ---------- budget category dropdown ---------- */}
        <div
          className='grid-xs'
          hidden={budgets.length === 1}>
          <label htmlFor='newExpenseBudget'>Budget Category</label>

          {/* 👇 Tailwind utilities added: p‑3 = 0.75 rem padding,
                min‑h = 48 px for a full‑height control on mobile */}
          <select
            name='newExpenseBudget'
            id='newExpenseBudget'
            required
            className='p-3 min-h-[48px] w-full rounded-md'>
            {budgets
              .sort((a, b) => a.createdAt - b.createdAt)
              .map(budget => (
                <option
                  key={budget.id}
                  value={budget.id}>
                  {budget.name}
                </option>
              ))}
          </select>
        </div>

        <input
          type='hidden'
          name='_action'
          value='createExpense'
        />

        <button
          type='submit'
          className='btn btn--dark'
          disabled={isSubmitting}>
          {isSubmitting ? (
            <span>Submitting…</span>
          ) : (
            <>
              <span>Add Expense</span>
              <PlusCircleIcon width={20} />
            </>
          )}
        </button>
      </fetcher.Form>
    </div>
  )
}

export default AddExpenseForm
