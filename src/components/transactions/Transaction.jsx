export default function Transaction({ user, amount, place }) {
  return (
    <div className='text-bg-dark' style={{ textAlign: 'center' }}>
      {user.name} gaf €{amount} uit bij {place.name}
    </div>
  );
}