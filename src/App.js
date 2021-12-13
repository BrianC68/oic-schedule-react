import { Provider } from 'react-redux';
import store from './store';
import Header from '../src/components/layout/Header';
import DailySchedule from './components/schedule/DailySchedule';
import Footer from './components/layout/Footer';

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <DailySchedule />
        <Footer />
      </div>
    </Provider>
  );
}

export default App;
