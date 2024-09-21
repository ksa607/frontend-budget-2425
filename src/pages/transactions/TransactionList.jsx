// src/pages/transactions/TransactionList.jsx
import { useState, useMemo } from 'react';
import TransactionsTable from '../../components/transactions/TransactionsTable';
import AsyncData from '../../components/AsyncData';
import useSWR from 'swr'; 
import { getAll } from '../../api'; 

export default function TransactionList() {
  const [text, setText] = useState('');
  const [search, setSearch] = useState('');

  const {
    data: transactions = [],
    isLoading,
    error,
  } = useSWR('transactions', getAll);

  const filteredTransactions = useMemo(
    () =>
      transactions.filter((t) => {
        return t.place.name.toLowerCase().includes(search.toLowerCase());
      }),
    [search, transactions],
  );

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
      </div>

      <div className='mt-4'>
        <AsyncData loading={isLoading} error={error}>
          {!error ? (
            <TransactionsTable transactions={filteredTransactions} />
          ) : null}
        </AsyncData>
      </div>
    </>
  );
}
