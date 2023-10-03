import React from 'react';

const LoadingAnimation = () => {
  const vibrantColors = ['#ff5733', '#ffbf00', '#33ff57', '#007aff', '#d433ff'];

  return (
    <section className='flex content-center'>
      {vibrantColors.map((color, index) => (
        <div
          key={index}
          className="dot"
          style={{ backgroundColor: color }} 
        ></div>
      ))}
    </section>
  );
};

export default LoadingAnimation;
