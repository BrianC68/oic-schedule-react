import Header from "../src/components/layout/Header";
import DailySchedule from "./components/schedule/DailySchedule";
import Footer from "./components/layout/Footer";

const App = () => {
  return (
    <div className="App">
      <Header />
      <DailySchedule />
      <Footer />
    </div>
  );
};

export default App;
