// src/components/transactions/TransactionsTable.jsx
import Transaction from './Transaction';

function TransactionsTable({ transactions }) {
  if (transactions.length === 0) {
    return (
      <div className='alert alert-info'>There are no transactions yet.</div>
    );
  }

  return (
    <div>
      <table className='table table-hover table-responsive'>
        <thead>
          <tr>
            <th>Date</th>
            <th>User</th>
            <th>Place</th>
            <th className='text-end'>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <Transaction key={transaction.id} {...transaction} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionsTable;
