// src/components/places/Place.jsx
import StarRating from './StarRating';
import { Link } from 'react-router-dom';
import { IoTrashOutline } from 'react-icons/io5';
import { memo, useCallback } from 'react';

const PlaceMemoized = memo(function Place({ id, name, rating, onDelete, onRate }) {
  const handleRate = useCallback((newRating) => {
    onRate({ id, name, rating: newRating });
  }, [id, name, onRate]);

  const handleDelete = useCallback(() => {
    onDelete(id);
  }, [id, onDelete]);

  return (
    <div className='card bg-light border-dark mb-4'>
      <div className='card-body'>
        <h5 className='card-title'>  <Link to={`/places/${id}`}>{name}</Link></h5>
        <div className='card-text'>
          <StarRating selectedStars={rating} onRate={handleRate} />
        </div>
        <button className='btn btn-primary' onClick={handleDelete}>
          <IoTrashOutline />
        </button>
      </div>
    </div>
  );
});

export default PlaceMemoized;
