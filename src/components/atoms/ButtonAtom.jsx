import React from 'react';

function ButtonAtom({ key, text, className }) {
  return <button key={key} className={className}>{text}</button>;
}

export default ButtonAtom;