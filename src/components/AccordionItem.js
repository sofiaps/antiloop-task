function AccordionItem({ title, content, isOpen, onClick }) {
    return (
      <div>
        <div onClick={onClick} style={{ cursor: 'pointer' }}>
          <h3>{title}</h3>
        </div>
        {isOpen && <div>{content}</div>}
      </div>
    );
  }
  
  export default AccordionItem;