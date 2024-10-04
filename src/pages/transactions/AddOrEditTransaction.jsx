// src/pages/transactions/AddOrEditTransaction.jsx
import useSWR from 'swr';
import { getAll } from '../../api';
import TransactionForm from '../../components/transactions/TransactionForm.jsx';
import AsyncData from '../../components/AsyncData';

export default function AddOrEditTransaction() {
  const {
    data: places = [],
    error: placesError,
    isLoading: placesLoading,
  } = useSWR('places', getAll);

  return (
    <>
      <h1>Add transaction</h1>
      <AsyncData error={placesError} loading={placesLoading}>
        <TransactionForm places={places} />
      </AsyncData>
    </>
  );
}
