import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  width?: string;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  children?: React.ReactNode;
}

// Botão
const Button = styled.button<ButtonProps>`
  display: inline-block;
  background-color: #414D33;
  color: #F8F8F8;
  border: none;
  padding: 8px 20px;
  font-size: 15px;
  text-transform: uppercase;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: ${(props) => props.width || 'auto'}; /* Largura personalizada */
  border-radius: 5px;

  &:hover {
    background-color: #7d9662;
  }
`;

// Link
const LinkButton = styled.a<ButtonProps>`
  display: inline-block;
  background-color: #414D33;
  color: #F8F8F8;
  border: none;
  padding: 8px 20px;
  font-size: 15px;
  text-transform: uppercase;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: ${(props) => props.width || 'auto'}; /* Largura personalizada */
  border-radius: 5px;
  text-decoration: none;
  &:hover {
    background-color: #7d9662;
  }
`;

const ButtonGreen: React.FC<ButtonProps> = ({ children, ...props }) => {
  if (props.href) {
    // Se tiver href, renderize como um link
    return <LinkButton {...props}>{children}</LinkButton>;
  } else {
    // Se não tiver href, renderize como um botão
    return <Button {...props}>{children}</Button>;
  }
};

export default ButtonGreen;
