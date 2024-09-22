import Place from './Place';

export default function PlacesCards({
  places, onRate, onDelete,
}) {

  if (places.length === 0) {
    return (
      <div className="alert alert-info">
        There are no places yet.
      </div>
    );
  }

  return (
    <div className="grid">
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xxl-4 g-3">
        {places
          .sort((a, b) => a.name.toUpperCase().localeCompare(b.name.toUpperCase()))
          .map((p) => (
            <div className="col" key={p.id}>
              <Place {...p} onRate={onRate} onDelete={onDelete}/>
            </div>
          ))}
      </div>
    </div>
  );
}