import { Provider } from 'react-redux';
import store from './store';
import Header from '../src/components/layout/Header';
import TodaysSchedule from './components/schedule/TodaysSchedule';

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <TodaysSchedule />
      </div>
    </Provider>
  );
}

export default App;
