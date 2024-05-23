import React, { useEffect, useState } from 'react';

function AlertMessage({ status, message, onTrigger }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onTrigger]); 

  if (!visible) return null;  

  const alertClasses = `fixed top-5 left-40 md:left-1/2 transform -translate-x-1/2 px-6 py-3 rounded shadow-md ${
    status === 'success' ? 'bg-green-500' : 'bg-red-500'
  } text-white text-sm flex items-center`;

  return (
    <div className={alertClasses} style={{ zIndex: 9999 }}>
      <span className="flex-1 text-center ml-3 text-sm">{message}</span>
      <button onClick={() => setVisible(false)} className="ml-4 text-xl">×</button>
    </div>
  );
}

export default AlertMessage;
