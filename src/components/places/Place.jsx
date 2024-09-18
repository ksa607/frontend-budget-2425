// src/components/places/Place.jsx
import StarRating from './StarRating';

const Place = ({ id, name, rating, onDelete, onRate }) => {
  const handleRate = (newRating) => {
    onRate(id, newRating);
  };
  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <div className='card bg-light border-dark mb-4'>
      <div className='card-body'>
        <h5 className='card-title'>{name}</h5>
        <div className='card-text'>
          <StarRating selectedStars={rating} onRate={handleRate} />
        </div>
        <button className='btn btn-primary' onClick={handleDelete}>
          Verwijder
        </button>
      </div>
    </div>
  );
};

export default Place;
