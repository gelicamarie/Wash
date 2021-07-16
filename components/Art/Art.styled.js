import styled from "styled-components";

export const Artwork = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

export const ArtInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  font-weight: 500;
`;

export const Container = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 0.8rem 0 0;
`;
export const Title = styled.h1`
  color: var(--color-theme-green-1);
  font-weight: 600;
  margin: 0;
`;
export const Price = styled.h3`
  color: var(--color-theme-green-0);
  margin: 0;
  font-size: 1rem;
  padding: 0.1rem 1rem;
  font-weight: 600;
  border-radius: 0.3rem;
  border: 0.15rem solid;
`;

export const Owner = styled.p`
  color: var(--color-theme-orange-1);
  margin: 0;
`;
