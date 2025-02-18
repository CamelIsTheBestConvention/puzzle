type ImgProps = {
  imgSrc: string | null;
  onClose: () => void;
};

const ImgModal = ({ imgSrc, onClose }: ImgProps) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70"
      onClick={onClose}
    >
      <img
        src={imgSrc || ""}
        alt="puzzle"
        className="w-full h-full max-w-[80%] max-h-[80%] object-contain"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
};
export default ImgModal;
