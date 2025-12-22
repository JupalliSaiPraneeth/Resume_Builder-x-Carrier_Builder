import { ResumeProvider } from './context/ResumeContext';
import ResumeBuilder from './components/ResumeBuilder';
import './App.css';

function App() {
  return (
    <ResumeProvider>
      <ResumeBuilder />
    </ResumeProvider>
  );
}

export default App;
