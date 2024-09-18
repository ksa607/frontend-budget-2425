// src/components/places/Place.jsx
const Place = ({ id, name, rating, onDelete = (f) => f }) => {
  const handleDelete = () => {
    onDelete(id);
  };
  return (
    <div className='card bg-light border-dark mb-4'>
      <div className='card-body'>
        <h5 className='card-title'>{name}</h5>
        <button className='btn btn-primary' onClick={handleDelete}>Verwijder</button>
      </div>
    </div>
  );
};

export default Place;
