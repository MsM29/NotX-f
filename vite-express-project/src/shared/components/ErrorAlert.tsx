import React, { useRef, useEffect } from "react";

function ErrorAlert({ dialogText }: { dialogText: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (dialogText.length !== 0) dialogRef.current?.showModal();
  }, [dialogText]);

  function closeDialog() {
    dialogRef.current?.close();
  }

  return (
    <dialog
      ref={dialogRef}
      className="w-1/2 h-3/4 bg-contain bg-no-repeat bg-center bg-transparent absolute top-1/4 m-0"
      style={{
        backgroundImage: `url("../../../images/0222e47e750a11ef8a962203bc7136ab_1.png")`,
      }}
    >
      <div className="w-full h-full text-right ">
        <div className="text-[4vh] mr-[6%] pt-[15%]">{dialogText}</div>
        <button
          onClick={closeDialog}
          className="text-[3.5vh] mr-[25%] mt-[2%] p-[1vh] bg-blue-200 text-center text-gray-950 rounded-md hover:bg-gray-400 hover:text-white"
        >
          Понятно
        </button>
      </div>
    </dialog>
  );
}

export default ErrorAlert;
