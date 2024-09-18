// src/pages/places/PlaceDetail.jsx
import { useParams } from 'react-router-dom';
import { PLACE_DATA } from '../../api/mock_data';

const PlaceDetail = () => {
  const { id } = useParams();
  const idAsNumber = Number(id);

  const place = PLACE_DATA.find((p) => p.id === idAsNumber);

  if (!place) {
    return (
      <div>
        <h1>Plaats niet gevonden</h1>
        <p>Er is geen plaats met id {id}.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>{place.name}</h1>
      <p>Hier komen de transacties van {place.name}</p>
    </div>
  );
};

export default PlaceDetail;
