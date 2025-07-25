import styled from "styled-components";

export const TodoItemWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
`

export const TodoText = styled.span.withConfig({
    shouldForwardProp: (prop) => prop !== 'completed',
  })<{ completed: boolean }>`
    text-decoration: ${({ completed }) => (completed ? 'line-through' : 'none')};
    flex: 1;
  `;
