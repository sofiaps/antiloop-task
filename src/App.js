import AccordionForm from './components/AccordionForm';
import AccordionProvider from './context/AccordionProvider';

function App() {
  return (
    <div className="App">
      <AccordionProvider>
        <AccordionForm />
      </AccordionProvider>
    </div>
  );
}

export default App;