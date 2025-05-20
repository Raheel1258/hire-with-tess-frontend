import React, { ReactNode } from 'react';

interface EnhancedSpeechButtonProps {
  icon: ReactNode;
  defaultTitle: string;
  onpressTitle: string;
  action?: boolean;
  onClick: () => void;
}

const EnhancedButton: React.FC<EnhancedSpeechButtonProps> = ({
  icon,
  defaultTitle,
  onpressTitle,
  action,
  onClick,
}) => {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-3 text-sm text-gray-500">
        {action ? onpressTitle : defaultTitle}
      </div>

      <button
        onClick={onClick}
        className="relative flex items-center justify-center w-16 h-16 rounded-full focus:outline-none transition-all duration-300"
        aria-label={action ? onpressTitle : defaultTitle}
      >
        <div
          className={`absolute inset-0 rounded-full transition-all duration-300 ${
            action
              ? 'bg-gradient-to-br from-[#1e4b8e] to-[#f7941D] shadow-2xl '
              : 'bg-gradient-to-br from-[#1e4b8e] to-[#f7941D] '
          }`}
        />

        <div className="z-10 relative text-white">{icon}</div>

        {action && (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-[#1e4b8e] to-[#f7941D] rounded-full animate-pulse opacity-70" />
            <div className="absolute w-20 h-20 bg-gradient-to-br from-[#1e4b8e] to-[#f7941D] rounded-full opacity-20 animate-ping shadow-lg" />
          </>
        )}
      </button>
    </div>
  );
};

export default EnhancedButton;
