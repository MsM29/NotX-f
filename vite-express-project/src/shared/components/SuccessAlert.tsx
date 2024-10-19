import React, { useRef, useEffect, useState } from "react";

function SuccessAlert({ dialogText }: { dialogText: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [successImage, setSuccessImage] = useState("success");

  useEffect(() => {
    if (dialogText.length !== 0) {
      setSuccessImage(dialogText);
      dialogRef.current?.showModal();
    }
  }, [dialogText]);

  function closeDialog() {
    dialogRef.current?.close();
  }

  return (
    <dialog
      ref={dialogRef}
      className="w-1/2 h-3/4 bg-contain bg-no-repeat bg-center bg-transparent absolute top-1/4 m-0"
      style={{
        backgroundImage: `url("../../../successImages/${successImage}.png")`,
      }}
    >
      <button
        onClick={closeDialog}
        className="text-[3.5vh] h-[8vh] w-[8vh] ml-[90%] bg-green-600 text-center text-gray-950 rounded-md hover:bg-gray-400 hover:text-white"
      >
        X
      </button>
    </dialog>
  );
}

export default SuccessAlert;
