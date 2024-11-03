// src/components/transactions/TransactionForm.jsx
import { useNavigate, Link } from 'react-router-dom';
import LabelInput from '../LabelInput';
import { FormProvider, useForm } from 'react-hook-form';
import SelectList from '../SelectList';

const EMPTY_TRANSACTION = {
  id: undefined,
  amount: undefined,
  date: new Date(),
  user: {
    id: '',
    name: '',
  },
  place: {
    id: '',
    name: '',
  },
};

const toDateInputString = (date) => {
  // ISO String without the trailing 'Z' is fine 🙄
  // (toISOString returns something like 2020-12-05T14:15:74Z,
  // datetime-local HTML5 input elements expect 2020-12-05T14:15:74, without the (timezone) Z)
  //
  // the best thing about standards is that we have so many to chose from!
  if (!date) return null;
  if (typeof date !== Object) {
    date = new Date(date);
  }
  let asString = date.toISOString();
  return asString.substring(0, asString.indexOf('T'));
};

const validationRules = {
  date: {
    required: 'Date is required',
    valueAsDate: true,
  },
  placeId: {
    required: 'Place is required',
  },
  amount: {
    required: 'Amount is required',
    valueAsNumber: true,
    validate: (value) => {
      if (value === 0) return '0 is not a valid amount';
      return null;
    },
  },
};

export default function TransactionForm({ places = [], transaction = EMPTY_TRANSACTION, saveTransaction }) {
  const navigate = useNavigate();

  const methods = useForm({
    mode: 'onBlur',
    defaultValues: {
      date: toDateInputString(transaction?.date),
      placeId: transaction?.place.id,
      amount: transaction?.amount,
    },
  });

  const {
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = methods;

  const onSubmit = async (values) => {
    if (!isValid) return;
    await saveTransaction({
      id: transaction?.id,
      ...values,
    }, {
      throwOnError: false,
      onSuccess: () => navigate('/transactions'),
    });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className='mb-5'>
        <LabelInput
          label='Date'
          name='date'
          type='date'
          validationRules={validationRules.date}
          data-cy='date_input'
        />
        <SelectList
          label='Place'
          name='placeId'
          placeholder='-- Select a place --'
          items={places}
          validationRules={validationRules.placeId}
          data-cy='place_input'
        />
        <LabelInput
          label='Amount'
          name='amount'
          type='number'
          validationRules={validationRules.amount}
          data-cy='amount_input'
        />
        <div className='clearfix'>
          <div className='btn-group float-end'>
            <button
              type='submit'
              className='btn btn-primary'
              data-cy='submit_transaction'
              disabled={isSubmitting}
            >
              {transaction?.id ? 'Save transaction' : 'Add transaction'}
            </button>
            <Link
              disabled={isSubmitting}
              className='btn btn-light'
              to='/transactions'
            >
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
