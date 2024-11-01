// src/components/transactions/TransactionsTable.jsx
import Transaction from './Transaction';
import { useThemeColors } from '../../contexts/theme';

function TransactionsTable({ transactions, onDelete }) {
  const { theme } = useThemeColors();
  if (transactions.length === 0) {
    return (
      <div className='alert alert-info' data-cy='no_transactions_message'>There are no transactions yet.</div>
    );
  }

  return (
    <div>
      <table className={`table table-hover table-responsive table-${theme}`}>
        <thead>
          <tr>
            <th>Date</th>
            <th>User</th>
            <th>Place</th>
            <th className='text-end'>Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <Transaction key={transaction.id} {...transaction} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionsTable;
