import { createContext, useContext } from 'react';

const AccordionContext = createContext();

const useAccordion = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('useAccordion must be used within an AccordionProvider');
  }
  return context;
};

export { AccordionContext, useAccordion };
