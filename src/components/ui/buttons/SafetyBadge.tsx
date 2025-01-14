import { FaRegClock } from "react-icons/fa6";
import { BsExclamationTriangle } from "react-icons/bs";

interface BadgeProps {
  status: 'apto' | 'no-apto' | 'apto-c' | 'apto-w' | 'n-a'; // Accepted statuses
}

export const SafetyBadge = ({ status }: BadgeProps) => {
  // Define the text, color, and icon based on the status
  let text = '';
  let color = '';
  let icon: JSX.Element | undefined = undefined;
  let iconColor = ''; // Define a separate class for icon color

  switch (status) {
    case 'apto':
      text = 'Apto';
      color = 'bg-green-50 text-green-600';
      break;
    case 'apto-c':
      text = 'Apto';
      color = 'bg-green-50 text-green-600';
      icon = <BsExclamationTriangle />;
      iconColor = 'text-red-500'; // Red icon for "apto-c"
      break;
    case 'apto-w':
      text = 'Apto';
      color = 'bg-green-50 text-green-600';
      icon = <FaRegClock />;
      iconColor = 'text-amber-500'; // Amber icon for "apto-w"
      break;
    case 'no-apto':
      text = 'No apto';
      color = 'bg-red-50 text-red-600';
      break;
    case 'n-a':
      text = 'N/A';
      color = 'bg-gray-50 text-gray-600';
      break;
    default:
      text = '-';
      color = 'bg-gray-50 text-gray-600';
      break;
  }

  return (
    <span className={`relative text-sm px-3 py-0.5 rounded ${color}`}>
      {icon && (
        <span className={`absolute top-0 -right-1 text-xs ${iconColor}`}>
          {icon}
        </span>
      )}
      {text}
    </span>
  );
};
