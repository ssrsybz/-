'use client';

import React from 'react';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[#050505]" />
      
      <div 
        className="absolute w-[800px] h-[800px] rounded-full opacity-30 animate-blob-1"
        style={{
          background: 'radial-gradient(circle, rgba(0,85,255,0.4) 0%, rgba(136,0,255,0.2) 40%, transparent 70%)',
          filter: 'blur(60px)',
          left: '10%',
          top: '20%',
        }}
      />
      
      <div 
        className="absolute w-[600px] h-[600px] rounded-full opacity-25 animate-blob-2"
        style={{
          background: 'radial-gradient(circle, rgba(136,0,255,0.5) 0%, rgba(0,85,255,0.3) 40%, transparent 70%)',
          filter: 'blur(50px)',
          right: '5%',
          top: '30%',
        }}
      />
      
      <div 
        className="absolute w-[500px] h-[500px] rounded-full opacity-20 animate-blob-3"
        style={{
          background: 'radial-gradient(circle, rgba(249,217,118,0.3) 0%, rgba(179,135,40,0.15) 40%, transparent 70%)',
          filter: 'blur(40px)',
          left: '30%',
          bottom: '10%',
        }}
      />
      
      <div 
        className="absolute w-[400px] h-[400px] rounded-full opacity-15 animate-blob-4"
        style={{
          background: 'radial-gradient(circle, rgba(0,85,255,0.4) 0%, rgba(136,0,255,0.2) 40%, transparent 70%)',
          filter: 'blur(30px)',
          right: '20%',
          bottom: '20%',
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/20 to-[#050505]/60" />
      
      <div className="absolute inset-0 opacity-[0.015]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>
      
      <div 
        className="absolute w-[300px] h-[300px] rounded-full opacity-10 animate-pulse-slow"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
          filter: 'blur(20px)',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
      
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-[2px] h-[2px] bg-white rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimatedBackground;
