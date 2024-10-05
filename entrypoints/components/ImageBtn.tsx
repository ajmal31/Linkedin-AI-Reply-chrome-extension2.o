import PromptBar from "./PromptBar";
import { useState } from "react";
import "../utils/configAi"

const ImageButton = () => {
  const [showModal, setShowModal] = useState(false);
  // Handling prompt bar modal
  const handleModal = () => {
    setShowModal(!showModal);
  };
  
  return (
    <>
      {showModal ? (
        <PromptBar onClose={handleModal} />
      ) : (
        // AI genrating icon
        <div
          className="absolute bottom-[10px] right-[10px] z-10"
        >
          <img
            src="https://i.imghippo.com/files/QQPz71727985623.png"
            // src="https://imgs.search.brave.com/iowLll4bKVM1hAXSnnf7Ec6SR0Qd6nR9eHQswwXfxmM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS50aGVyZXNhbmFp/Zm9ydGhhdC5jb20v/aWNvbnMvaWNvbi1n/ZW5lcmF0ZS5zdmc_/aGVpZ2h0PTIwNw"
            alt="AI-Generate-button-image"
            onClick={handleModal}
            className="w-[30px] h-[30px] rounded-[50px] cursor-pointer shadow-lg"
            contentEditable="false"
          />
        </div>
      )}
    </>
  );
};

export default ImageButton;
