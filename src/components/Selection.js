import React, { useState } from 'react';

function Selection({ items }) {
  const [selectedItems, setSelectedItems] = useState([]);
  const [removedItems, setRemovedItems] = useState([]);

  const handleItemToggle = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((selectedItem) => selectedItem !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleRemoveSelected = (item) => {
    setSelectedItems(selectedItems.filter((selectedItem) => selectedItem !== item));
    setRemovedItems([...removedItems, item]);
  };

  const handleUndoRemove = (item) => {
    setRemovedItems(removedItems.filter((removedItem) => removedItem !== item));
    setSelectedItems([...selectedItems, item]);
  };

  return (
    <div>
      <div className="selected-items">
        {selectedItems.map((item) => (
          <span key={item} className="selected-item">
            {item}
            <span onClick={() => handleRemoveSelected(item)} className="remove-item">
              &times;
            </span>
          </span>
        ))}
      </div>

      <div className="selection-checkboxes">
        {items.map((item) => (
          <div key={item} className="selection-item">
            <label>
              <input
                type="checkbox"
                checked={selectedItems.includes(item)}
                onChange={() => handleItemToggle(item)}
              />
              {item}
            </label>
          </div>
        ))}
      </div>
      
      <div className="removed-items">
        {removedItems.map((item) => (
          <span key={item} className="removed-item">
            {item}
            <span onClick={() => handleUndoRemove(item)} className="undo-remove-item">
              Undo
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default Selection;
