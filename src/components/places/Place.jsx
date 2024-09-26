// src/components/places/Place.jsx
import StarRating from './StarRating';
import { Link } from 'react-router-dom';
import { IoTrashOutline } from 'react-icons/io5';

const Place = ({ id, name, rating, onDelete, onRate }) => {
  const handleRate = (newRating) => {
    onRate({ id, name, rating: newRating });
  };
  const handleDelete = () => {
    onDelete(id);
  };

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
};

export default Place;
