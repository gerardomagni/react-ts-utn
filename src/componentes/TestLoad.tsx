import React, { Suspense, useState, useEffect } from 'react';
import LoaderPage from './LoaderPage';

const Spinner = () => (
  <LoaderPage />
);

// Componente que muestra el mensaje después de 4 segundos
const Message = () => {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 4000); // 4 segundos de espera

    return () => clearTimeout(timer);
  }, []);

  return showMessage ? <div>Ejemplo Load Page</div> : <Spinner />;
};

const TestLoad = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Message />
    </Suspense>
  );
};

export default TestLoad;
