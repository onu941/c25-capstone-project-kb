interface BookingModalProps {
  toggleModal: () => void;
}

export function BookingModal(props: BookingModalProps) {
  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center z-40">
      <div
        className="absolute top-0 right-0 bottom-0 left-0 bg-black opacity-60"
        onClick={props.toggleModal}
      ></div>
      <div className="p-3 bg-gray-800 text-white rounded-lg z-50">
        <p className="text-2xl">I am a modal</p>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-4"
          onClick={props.toggleModal}
        >
          Close
        </button>
      </div>
    </div>
  );
}
