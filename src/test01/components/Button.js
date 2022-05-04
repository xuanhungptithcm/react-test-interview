import React from "react";

function Button({ onClick, children }) {
  console.log(`Rendering button - `, children);
  return (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default React.memo(({children, onClick}) => {
  return <Button children={children} onClick={onClick} />;
});
