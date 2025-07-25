import styled from 'styled-components'

export const List = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 16px;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  transition: background-color 0.3s ease, color 0.3s ease;
`;


export const ThemeIcon = styled.div`
  margin-bottom: 8px;
  color: ${({ theme }) => theme.text};
`;


