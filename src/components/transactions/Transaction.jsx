export default function Transaction(props) {
  const { user, amount, place } = props;
  return (
    <div>
      {user.name} gaf €{amount} uit bij {place.name}
    </div>
  );
}