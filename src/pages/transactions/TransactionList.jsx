// src/pages/transactions/TransactionList.jsx
import { useState, useMemo, useEffect } from 'react';
import TransactionsTable from '../../components/transactions/TransactionsTable';
import * as transactionsApi from '../../api/transactions';

export default function TransactionList() {
  const [text, setText] = useState('');
  const [search, setSearch] = useState('');
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const data = await transactionsApi.getAll();
      setTransactions(data);
    };

    fetchTransactions();
  }, []);

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
        <TransactionsTable transactions={filteredTransactions} />
      </div>
    </>
  );
}
