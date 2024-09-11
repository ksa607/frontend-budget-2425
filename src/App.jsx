import Transaction from './components/transactions/Transaction';
import TRANSACTION_DATA from './api/mock_data';

function App() {
  return (
    <div className='App'>
      {TRANSACTION_DATA.map((trans) => (
        <Transaction
          key={trans.id}
          {...trans}
        />
      ))}
    </div>
  );
}

export default App;