import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

// Definindo os estilos do botão
const Button = styled.a<{ width?: string }>`
  display: inline-block;
  background-color: #1C2312; /* Cor de fundo padrão */
  color: #F8F8F8; /* Cor do texto em caixa alta */
  border: none;
  padding: 8px 20px;
  font-size: 15px;
  text-transform: uppercase;
  cursor: pointer;
  transition: background-color 0.3s ease; /* Transição suave de cor */
  width: ${(props) => props.width || 'auto'}; /* Largura personalizada */
  border-radius: 5px; /* Bordas arredondadas */

  &:hover {
    background-color: #414D33; /* Cor de fundo ao passar o mouse */
  }
`;

// Componente de botão reutilizável
const ButtonBlack: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; width?: string }> = ({ children, href, width, ...props }) => {
    return (
      <Link href={href} passHref>
        <Button width={width} {...props}>{children}</Button>
      </Link>
    );
  };

export default ButtonBlack;
