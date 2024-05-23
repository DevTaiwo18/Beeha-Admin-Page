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

  const alertClasses = `fixed inset-x-0 top-5 mx-auto w-11/12 max-w-md px-4 py-2 rounded shadow-md ${
    status === 'success' ? 'bg-green-500' : 'bg-red-500'
  } text-white text-sm flex items-center`;

  return (
    <div className={alertClasses} style={{ zIndex: 9999 }}>
      <span className="flex-1 text-center ml-2 md:ml-3 text-xs md:text-sm">{message}</span>
      <button onClick={() => setVisible(false)} className="ml-4 text-lg md:text-xl">×</button>
    </div>
  );
}

export default AlertMessage;
