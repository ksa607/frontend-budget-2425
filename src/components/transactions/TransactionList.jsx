// src/components/transactions/TransactionList.jsx
import { useState, useMemo } from 'react';
import Transaction from './Transaction';
import { TRANSACTION_DATA } from '../../api/mock_data';

export default function TransactionList() {
  const [text, setText] = useState(''); // 👈 1
  const [search, setSearch] = useState(''); // 👈 1

  const filteredTransactions = useMemo(
    () =>
      TRANSACTION_DATA.filter((t) => {
        console.log('filtering...');
        return t.place.toLowerCase().includes(search.toLowerCase());
      }),
    [search],
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
        {/* 👆 2 en 3 */}
        <button
          type='button'
          className='btn btn-outline-primary'
          onClick={() => setSearch(text)}
        >
          Search
        </button>
        {/* 👆 4 */}
      </div>
      {/* 👇 6*/}
      {filteredTransactions.map((trans, index) => (
        <Transaction {...trans} key={index} />
      ))}
    </>
  );
}
