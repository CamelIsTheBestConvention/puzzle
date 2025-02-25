type ImgProps = {
  imgSrc: string | null;
  onClose: () => void;
};

const ImgModal = ({ imgSrc, onClose }: ImgProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
      <div
        className="absolute top-4 right-4 text-white text-3xl cursor-pointer"
        onClick={onClose}
      >
        ✖
      </div>
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
