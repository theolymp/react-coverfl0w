import { Coverflow } from 'react-coverfl0w';
import './App.css';
const ELEMENTS = document.getElementById('test-nodes').childNodes;

function App() {
  return (
    <div className="App">
      <div className="content">
        <Coverflow elements={ELEMENTS} slidesPerSide={3} rotation={40} />
      </div>
    </div>
  );
}

export default App;
