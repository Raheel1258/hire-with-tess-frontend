'use client';
import { useState } from 'react';

const EmojiRatingSlider = () => {
  const [rating, setRating] = useState(0);
  const emojis = ['😖', '😟', '😐', '😆', '😍'];

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <div className="flex justify-between mb-2">
        {emojis.map((emoji, index) => (
          <span
            key={index}
            className={`text-3xl transition-all duration-200 ${
              rating >= index + 1 ? 'scale-125' : 'scale-100 opacity-70'
            }`}
          >
            {emoji}
          </span>
        ))}
      </div>

      <input
        type="range"
        min="0"
        max="5"
        step="1"
        value={rating}
        onChange={(e) => setRating(parseInt(e.target.value))}
        className="w-full h-2 bg-blue rounded-lg cursor-pointer"
      />
    </div>
  );
};

export default EmojiRatingSlider;
