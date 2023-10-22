import { useReducer } from 'react';
import { AccordionContext } from './AccordionContext';

const initialState = {
  accordionTitle: '',
  accordionType: 'Text',
  sliderMin: '',
  sliderMax: '',
  textContent: '',
  selectedItems: []
};

const accordionReducer = (state, action) => {
  switch (action.type) {
    case 'updateAccordion':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const AccordionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(accordionReducer, initialState);

  const updateAccordion = (payload) => {
    dispatch({ type: 'updateAccordion', payload });
  };

  return (
    <AccordionContext.Provider value={{ state, updateAccordion }}>
      {children}
    </AccordionContext.Provider>
  );
};

export default AccordionProvider;