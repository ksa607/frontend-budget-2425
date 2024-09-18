import Transaction from './components/transactions/Transaction';
import { TRANSACTION_DATA } from './api/mock_data';
import PlacesList from './components/places/PlacesList';

function App() {
  return (
    <div className='App'>
      {TRANSACTION_DATA.map((trans) => (
        <Transaction
          key={trans.id}
          {...trans}
        />
      ))}
      <PlacesList />
    </div>
  );
}

export default App;