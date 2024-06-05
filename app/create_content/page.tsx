"use client";

import React from 'react';
import FooterMenu from '../components/footerMenu';
import Header from '../components/header';
import '../globals.css';
import ButtonBack from '../components/buttonBack';
import styled from 'styled-components';
import { FaCamera, FaPen } from 'react-icons/fa';

const CreateParkContent: React.FC = () => {

    const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: left;
    padding: 20px;
    width: 100%;
    margin: auto;
    margin-bottom: 30px;
    `;

    const ImageContainer = styled.div`
    position: relative;
    width: 50%;
    height: 200px;
    background-color: #f0f0f0;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #ddd;
    margin-bottom: 20px;
    border-radius: 15px; 
    `;

    const ImageText = styled.div`
    position: absolute;
    text-align: center;
    `;

    const Title = styled.h2`
    font-size: 16px;
    color: #333;
    text-align: left;
    margin-bottom: 20px;
    `;

    const Label = styled.label`
    font-size: 14px;
    color: #666;
    margin-bottom: 5px;
    `;

    const DescriptionContainer = styled.div`
    position: relative;
    width: 100%;
    margin-bottom: 20px;
    `;

    const Description = styled.textarea`
    width: 100%;
    height: 100px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    resize: none;
    font-size: 14px;
    color: #666;
    `;

    const SwitchContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    `;

    const SwitchLabel = styled.span`
    font-size: 14px;
    color: #666;
    margin-right: 10px;
    `;

    const SwitchInput = styled.input.attrs({ type: 'checkbox' })`
    width: 40px;
    height: 20px;
    `;

    const Select = styled.select`
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-bottom: 20px;
    font-size: 14px;
    color: #666;
    `;

    const Text = styled.p`
    font-size: 14px;
    color: #666;
    margin-bottom: 20px;
    `;


    return (
        <Container>
            <Header />
            <ButtonBack />
            <ImageContainer>
                <ImageText>
                    <FaCamera size={24} color="#bbb" />
                    <div>Selecionar foto</div>
                </ImageText>
            </ImageContainer>
            <Title>Mirante Velho - Circuito Paisagem</Title>
            <Label>Descrição</Label>
            <DescriptionContainer>
                <Description defaultValue="Descreva aqui os detalhes da atividade"/>
            </DescriptionContainer>
            <SwitchContainer>
                <SwitchLabel>Necessita de monitoramento</SwitchLabel>
                <SwitchInput />
            </SwitchContainer>
            <div style={{ display:'flex', flexDirection: 'row'}}>
                <Label >Nível de dificuldade</Label>
                <Select>
                    <option>Média</option>
                    <option>Fácil</option>
                    <option>Difícil</option>
                </Select>
            </div>
            <Text>Percurso: 6km</Text>
            <Text>Duração: 3 a 4 horas</Text>
            <FooterMenu activePage="profile" />
        </Container>
    );
};

export default CreateParkContent;
