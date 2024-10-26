// components/CustomCard.js
const CustomCard = ({ title, description, children, footer }) => {
    return (
      <div className="bg-white border rounded-lg shadow-md overflow-hidden">
        <div className="p-4">
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        <div className="p-4 border-t">
          {children}
        </div>
        {footer && (
          <div className="p-4 border-t bg-gray-100">
            {footer}
          </div>
        )}
      </div>
    );
  };
  
  export default CustomCard;
  