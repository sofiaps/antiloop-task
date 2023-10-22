import React, { useState } from 'react';
import { useAccordion } from '../context/AccordionContext';
import AccordionItem from './AccordionItem';
import Selection from './Selection';
import Slider from './Slider';

function AccordionForm() {
  const { state, updateAccordion } = useAccordion();
  const [items, setItems] = useState([]);
  const [openItemId, setOpenItemId] = useState(null);
  const [validationError, setValidationError] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    updateAccordion({ [name]: value });
  };

  const toggleItem = (itemId) => {
    if (itemId === openItemId) {
      setOpenItemId(null);
    } else {
      setOpenItemId(itemId);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (state.accordionType === 'Text') {
      const newItem = {
        id: Date.now(),
        title: state.accordionTitle,
        content: state.textContent,
      };

      setItems([...items, newItem]);
    } else if (state.accordionType === 'Selection') {
      const newItem = {
        id: Date.now(),
        title: state.accordionTitle,
        content: (
          <Selection
            items={[
              'Camera',
              'Smartphones',
              'TV',
              'Audio',
              'Instruments',
              'Navigation',
              'Accessories',
              'Consoles',
              'Kitchen',
              'Laptop',
              'PC',
              'Printer',
            ]}
            onSelectionChange={(selectedItems) => {
              // Handle selected items
              updateAccordion({ selectedItems });
            }}
          />
        ),
      };

      setItems([...items, newItem]);
    } else if (state.accordionType === 'Slider') {
      if (state.sliderMin <= state.sliderMax) {
        const newItem = {
          id: Date.now(),
          title: state.accordionTitle,
          content: (
            <Slider
            min={state.sliderMin}
            max={state.sliderMax}
            value={{ min: state.sliderMin, max: state.sliderMax }}
            />
          ),
        };

        setItems([...items, newItem]);
        setValidationError(null);
      } else {
        setValidationError("Slider min value must be less than or equal to max value.");
      }
    }

    updateAccordion({
      accordionTitle: '',
      accordionType: 'Text',
      textContent: '',
      selectedItems: [],
      sliderMin: 0,
      sliderMax: 100,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Accordion Title:</label>
          <input
            type="text"
            name="accordionTitle"
            value={state.accordionTitle}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Accordion Content Type:</label>
          <select
            name="accordionType"
            value={state.accordionType}
            onChange={handleInputChange}
          >
            <option value="Text">Text</option>
            <option value="Slider">Slider</option>
            <option value="Selection">Selection</option>
          </select>
        </div>
        {state.accordionType === 'Text' && (
          <div>
            <label>Text Content:</label>
            <input
              type="text"
              name="textContent"
              value={state.textContent}
              onChange={handleInputChange}
              required
            />
          </div>
        )}
        {state.accordionType === 'Slider' && (
          <div>
            <label>Min:</label>
            <input
              type="number"
              name="sliderMin"
              value={state.sliderMin}
              onChange={handleInputChange}
              required
            />
            <label>Max:</label>
            <input
              type="number"
              name="sliderMax"
              value={state.sliderMax}
              onChange={handleInputChange}
              required
            />
          </div>
        )}
        <button type="submit">Add Item</button>
      </form>

      {validationError && <p className="error-message">{validationError}</p>}

      {items.map((item) => (
        <AccordionItem
          key={item.id}
          title={item.title}
          content={item.content}
          isOpen={item.id === openItemId}
          onClick={() => toggleItem(item.id)}
        />
      ))}
    </div>
  );
}

export default AccordionForm;
