// src/pages/transactions/AddOrEditTransaction.jsx
import useSWR from 'swr';
import { getAll, save } from '../../api';
import useSWRMutation from 'swr/mutation'; 
import TransactionForm from '../../components/transactions/TransactionForm.jsx';
import AsyncData from '../../components/AsyncData';

export default function AddOrEditTransaction() {
  const { trigger: saveTransaction, error: saveError } = useSWRMutation(
    'transactions',
    save,
  );

  const {
    data: places = [],
    error: placesError,
    isLoading: placesLoading,
  } = useSWR('places', getAll);

  return (
    <>
      <h1>Add transaction</h1>
      <AsyncData error={saveError || placesError} loading={placesLoading}>
        <TransactionForm places={places} saveTransaction={saveTransaction} />
      </AsyncData>
    </>
  );
}
