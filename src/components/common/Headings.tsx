"use client";

import React from 'react';

interface TitleProps {
    title: string;
  }
  
  const Title: React.FC<TitleProps> = ({ title }) => (
    <h1 className="text1">{title}</h1>
  );

  const Title2: React.FC<TitleProps> = ({ title }) => (
    <div style={{ margin: '0 auto', marginBottom: '2rem', marginTop: '2rem' }}>
      <h1 className="text1">{title}</h1>
    </div>
  );

  const Title3: React.FC<TitleProps> = ({ title }) => (
    <div className="title3 title3-1">
      <h1 className="text2">{title}</h1>
    </div>
  );

  const Title4: React.FC<TitleProps> = ({ title }) => (
    <div className="title4">
      <h1 className="text2">{title}</h1>
    </div>
  );

  export{Title, Title2, Title3, Title4};
  