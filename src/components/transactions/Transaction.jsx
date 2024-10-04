import { IoTrashOutline, IoPencilOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { memo } from 'react';

// kan ook met react-intl (https://formatjs.io/docs/getting-started/installation/)
const dateFormat = new Intl.DateTimeFormat('nl-BE', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});

const amountFormat = new Intl.NumberFormat('nl-BE', {
  currency: 'EUR',
  style: 'currency',
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
});

const TransactionMemoized = memo(function Transaction({ id, date, amount, user, place, onDelete }) {

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <tr>
      <td>{dateFormat.format(new Date(date))}</td>
      <td>{user.name}</td>
      <td>{place.name}</td>
      <td className='text-end'>{amountFormat.format(amount)}</td>
      <td>
        <Link to={`/transactions/edit/${id}`} className='btn btn-light'>
          <IoPencilOutline />
        </Link>
        {onDelete ? <button className='btn btn-primary' onClick={handleDelete}>
          <IoTrashOutline />
        </button> : ''}
      </td>
    </tr>
  );
});

export default TransactionMemoized;