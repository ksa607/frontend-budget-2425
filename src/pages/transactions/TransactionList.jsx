// src/pages/transactions/TransactionList.jsx
import { useState, useMemo, useCallback } from 'react';
import TransactionsTable from '../../components/transactions/TransactionsTable';
import AsyncData from '../../components/AsyncData';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { getAll, deleteById } from '../../api';
import { Link } from 'react-router-dom';

export default function TransactionList() {
  const [text, setText] = useState('');
  const [search, setSearch] = useState('');

  const {
    data: transactions = [],
    isLoading,
    error,
  } = useSWR('transactions', getAll);

  const { trigger: deleteTransaction, error: deleteError } = useSWRMutation(
    'transactions',
    deleteById,
  );

  const filteredTransactions = useMemo(
    () =>
      transactions.filter((t) => {
        return t.place.name.toLowerCase().includes(search.toLowerCase());
      }),
    [search, transactions],
  );

  const handleDeleteTransaction = useCallback(async (id) => {
    await deleteTransaction(id);
    alert('Transaction is removed');
  }, [deleteTransaction]);

  return (
    <>
      <h1>Transactions</h1>
      <div className='input-group mb-3 w-50'>
        <input
          type='search'
          id='search'
          className='form-control rounded'
          placeholder='Search'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          type='button'
          className='btn btn-outline-primary'
          onClick={() => setSearch(text)}
        >
          Search
        </button>
        <div className='clearfix'>
          <Link to='/transactions/add' className='btn btn-primary float-end'>
            Add transaction
          </Link>
        </div>
      </div>

      <div className='mt-4'>
        <AsyncData loading={isLoading} error={error || deleteError}>
          <TransactionsTable transactions={filteredTransactions} onDelete={handleDeleteTransaction} />
        </AsyncData>
      </div>
    </>
  );
}
