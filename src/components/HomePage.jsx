import React from 'react';
import styled from '@emotion/styled';

const ItemContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 2rem;
  padding: 2rem;
  background: #001F3F;
  color: #FFFFFF;
`;

const ItemCard = styled.div`
  background: #1a1a1a;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;



function HomePage() {
  return (
    <ItemContainer>
      {items.map((item, index) => (
        <ItemCard key={index}>
          <p>{item}</p> {/* Ensure only one tag is used to display the caption */}
        </ItemCard>
      ))}
    </ItemContainer>
  );
}

export default HomePage;