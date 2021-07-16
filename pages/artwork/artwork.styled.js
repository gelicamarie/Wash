import styled from "styled-components";

export const Line = styled.hr`
  margin: 0 0 1rem;
  border-top: 0.18rem solid black;
`;
export const Container = styled.div`
  display: flex;
  height: 80vh;
  align-items: center;
  margin: 0;
`;

export const Info = styled.div`
  width: 43%;
  margin: 0 3rem;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
export const Title = styled.h1`
  margin: 0 0 0.5rem;
`;
export const User = styled.h3`
  color: var(--color-theme-orange-1);
  font-weight: 500;
  margin: 0;
  font-size: 1.1rem;
`;
export const Menu = styled.ul`
  display: flex;
  list-style-type: none;
  margin: 1rem 0 0.2rem;
  padding: 0;
  width: 100%;
`;

export const MenuItem = styled.li`
  margin: 0.5rem 0 0;
  font-weight: 500;
  font-size: 1.1rem;
`;

export const Description = styled.div`
  height: 12rem;
  font-size: 1.15rem;
`;

export const Price = styled.h3`
  margin: 4rem 0 0 0.8rem;
  letter-spacing: 0.2rem;
  font-size: 1.3rem;
`;

export const BuyBtn = styled.button`
  font-size: 1.2rem;
  background-color: #606c38;
  color: var(--color-theme-bg);
  border: none;
  border-radius: 50px;
  padding: 1rem 4rem;
`;
