import { createGlobalStyle } from 'styled-components';

const styled = { createGlobalStyle };

export default styled.createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    height: calc(100vh + calc(100% - 100vh));
  }

  body {
    display: flex;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  button {
    cursor: pointer;
    border: none;
  }

  strong {
    display: block;
  }

  input {
    &[type='number'] {
      -moz-appearance: textfield;
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  ul {
    list-style: none;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  [disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
