import { IoTrashOutline } from 'react-icons/io5';

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

export default function Transaction({ id, date, amount, user, place, onDelete }) {

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
        {onDelete ? <button className='btn btn-primary' onClick={handleDelete}>
          <IoTrashOutline />
        </button> : ''}
      </td>
    </tr>
  );
}