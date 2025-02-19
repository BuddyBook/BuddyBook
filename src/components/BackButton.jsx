import { ArrowBigLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function BackButton({ text, to }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to); // Navigate to the specified path
  };

  return (
    <div className="w-full max-w-2xl mr-25 mb-2">
      <button
        onClick={handleClick}
        className="text-gray-600 hover:text-gray-900 flex items-center"
      >
        <ArrowBigLeft size={30} strokeWidth={1.5} className="mr-2" />
        {text}
      </button>
    </div>
  );
}
export default BackButton;