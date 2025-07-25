import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    background: string;
    text: string;
    border: string;
    todoBg: string;
    inputBg: string;
    inputText: string;
    placeholder: string;
  }
}
