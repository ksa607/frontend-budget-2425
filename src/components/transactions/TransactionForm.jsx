// src/components/transactions/TransactionForm.jsx
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

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
  userId: {
    required: 'User is required',
    min: { value: 1, message: 'min 1' },
  },
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

  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    mode: 'onBlur',
    defaultValues: {
      date: toDateInputString(transaction?.date),
      placeId: transaction?.place.id,
      amount: transaction?.amount,
      userId: transaction?.user.id,
    },
  });

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
    <>
      <form onSubmit={handleSubmit(onSubmit)} className='w-50 mb-3'>
        <div className='mb-3'>
          <label htmlFor='userId' className='form-label'>
            User Id
          </label>
          <input
            {...register('userId', validationRules.userId)}
            id="user"
            type="number"
            className="form-control"
            placeholder="userid"
            required
          />
          {errors.userId && <p className="form-text text-danger">{errors.userId.message}</p>}
        </div>
        <div className='mb-3'>
          <label htmlFor='date' className='form-label'>
            Date
          </label>
          <input
            {...register('date', validationRules.date)}
            id='date'
            type='date'
            className='form-control'
            placeholder='date'
          />
          {errors.date && <p className="form-text text-danger">{errors.date.message}</p>}
        </div>
        <div className='mb-3'>
          <label htmlFor='places' className='form-label'>
            Place
          </label>
          <select
            {...register('placeId', validationRules.place)}
            id='places'
            className='form-select'
            required
          >
            <option value='' disabled>
              -- Select a place --
            </option>
            {places.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
          {errors.placeId && <p className="form-text text-danger">{errors.placeId.message}</p>}
        </div>
        <div className='mb-3'>
          <label htmlFor='amount' className='form-label'>
            Amount
          </label>
          <input
            {...register('amount', validationRules.amount)}
            id='amount'
            type='number'
            className='form-control'
            required
          />
          {errors.amount && <p className="form-text text-danger">{errors.amount.message}</p>}
        </div>
        <div className='clearfix'>
          <div className='btn-group float-end'>
            <button type='submit' className='btn btn-primary'>
              {transaction?.id
                ? 'Save transaction'
                : 'Add transaction'}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
