import styled, { css } from "styled-components";

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success';

interface ButtonContainerProps {

    variant: ButtonVariant;
}

const buttonVariants = {
    primary: "red",
    secondary: "purple",
    danger: "blue",
    success: "green"
};

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100px;
  height: 40px;
  background-color: ${props => props.theme.primary};
  color: ${props => props.theme.white};

 /* ${props => { 
  return css
    `background-color: ${buttonVariants[props.variant]}
    `
}}*/
`