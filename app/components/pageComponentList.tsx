import React, { useState } from 'react';
import { FiArrowLeft, FiArrowRight, FiEye, FiEdit, FiTrash } from 'react-icons/fi';
import { List, ListItem, ListItemText, ListItemAvatar, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import { HiOutlineBadgeCheck } from 'react-icons/hi';
import { FaCheck } from 'react-icons/fa';

interface Profile {
  photo: string;
  name: string;
  description?: string;
  language?: string;
  park?: string;
  link: string;
}

interface ProfileListProps {
  type: Profile[];
  layout: 'column' | 'row';
  showCheckIcon?: boolean;
  showCRUDIcons?: boolean; // Novo parâmetro
}

const ProfileList: React.FC<ProfileListProps> = ({ type, layout, showCheckIcon, showCRUDIcons }) => {
  const [scrollX, setScrollX] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

  const handleScroll = (direction: 'right' | 'left') => {
    const container = document.getElementById('guide-list-container');
    if (container) {
      const step = 300; // Step size for each scroll
      const maxScroll = container.scrollWidth - container.clientWidth;
      if (direction === 'right') {
        const newScrollX = Math.min(scrollX + step, maxScroll);
        setScrollX(newScrollX);
        setShowLeftArrow(true);
        if (newScrollX >= maxScroll) {
          setShowRightArrow(false);
        }
      } else {
        const newScrollX = Math.max(scrollX - step, 0);
        setScrollX(newScrollX);
        setShowRightArrow(true);
        if (newScrollX === 0) {
          setShowLeftArrow(false);
        }
      }
    }
  };

  const handleView = (profile: Profile) => {
    // Implemente a lógica para VISUALIZAR o perfil
    console.log("Visualizando perfil:", profile.name);
  };

  const handleEdit = (profile: Profile) => {
    // Implemente a lógica para EDITAR o perfil
    console.log("Editando perfil:", profile.name);
  };

  const handleDelete = (profile: Profile) => {
    setSelectedProfile(profile);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleConfirmDelete = () => {
    // Implemente a lógica para EXCLUIR o perfil
    if (selectedProfile) {
      console.log("Excluindo perfil:", selectedProfile.name);
      // Adicione aqui a lógica de exclusão
      setOpenDeleteDialog(false);
    }
  };

  const ArrowButton = styled.button<{ left?: boolean; visible?: boolean }>`
    position: absolute;
    top: 0;
    ${props => (props.left ? 'left: 10px' : 'right: 10px')};
    transform: translateY(-265%);
    background: rgba(0, 0, 0, 0.7);
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    cursor: pointer;
    display: ${props => (props.visible ? 'flex' : 'none')};
    align-items: center;
    justify-content: center;
    z-index: 1;
  `;

  const ListItemStyled = styled(ListItem)`
    position: relative;
    margin-bottom: 10px;
    background-color: white;
    border-radius: 5px;
    width: ${layout === 'column' ? '100%' : 'auto'};
    height: ${layout === 'row' ? '125px' : 'auto'};
    min-width: ${layout === 'row' ? '300px' : 'auto'};
    margin: 5px;
  `;

  const ImageWrapper = styled.div`
    position: relative;
    width: 80px;
    height: 80px;
    border-radius: 5px;
    overflow: hidden;
  `;

  const ImageOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: white;
  `;

  const CheckIcon = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    border-radius: 50%;
    background-color: #5cb85c;
    padding: 3px;
    z-index: 2;
  `;

  return (
    <div>
      <div id="guide-list-container" style={{ overflowX: 'hidden', width: '100%'}}>
        <List style={{ 
            display: 'flex', 
            flexDirection: layout === 'column' ? 'column' : 'row', 
            justifyContent: 'left', 
            padding: layout === 'column' ? '30px 20px 60px 20px' : '0', 
            margin: '0', 
            scrollBehavior: 'smooth', 
            transform: `translateX(-${scrollX}px)` }}>

          {type.map((profile, index) => (
            <ListItemStyled key={index}>
              {showCheckIcon && (
                <CheckIcon>
                  <FaCheck size={20} color="white" />
                </CheckIcon>
              )}
              <ListItemAvatar>
                <ImageWrapper>
                  <Image src={profile.photo} alt={profile.name} layout="fill" objectFit="cover" />
                  {showCheckIcon && (
                    <ImageOverlay>
                      <HiOutlineBadgeCheck size={20} color="white" />
                      <Typography component="span" variant="caption">
                        Visitado
                      </Typography>
                    </ImageOverlay>
                  )}
                </ImageWrapper>
              </ListItemAvatar>
              <ListItemText
                primary={profile.name}
                secondary={
                  <>
                    {profile.description && (
                      <Typography component="span" variant="body2" color="textPrimary">
                        {profile.description}
                      </Typography>
                    )}
                    <br />
                    {profile.language && (
                      <>
                        Idioma: {profile.language}
                        <br />
                      </>
                    )}
                    {profile.park && (
                      <>
                        Parque: {profile.park}
                        <br />
                      </>
                    )}
                    <div style={{ textAlign: 'right' }}>
                      <Link href={profile.link} passHref>
                        <Typography component="a" variant="caption" style={{ textDecoration: 'underline', color: '#99B83C' }}>Ver perfil</Typography>
                      </Link>
                    </div>
                  </>
                }
                style={{ paddingLeft: '20px' }}
              />
              {showCRUDIcons && (
                <>
                  <FiEye onClick={() => handleView(profile)} style={{ cursor: 'pointer', marginRight: '5px' }} />
                  <FiEdit onClick={() => handleEdit(profile)} style={{ cursor: 'pointer', marginRight: '5px' }} />
                  <FiTrash onClick={() => handleDelete(profile)} style={{ cursor: 'pointer' }} />
                </>
              )}
            </ListItemStyled>
          ))}
        </List>
      </div>

      {layout === 'row' && (
        <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', width: '100%' }}>
          <ArrowButton left visible={showLeftArrow} onClick={() => handleScroll('left')}>
            <FiArrowLeft size={30} color="white" />
          </ArrowButton>
          <ArrowButton visible={showRightArrow} onClick={() => handleScroll('right')}>
            <FiArrowRight size={30} color="white" />
          </ArrowButton>
        </div>
      )}

      {/* Diálogo de confirmação de exclusão */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirmação de Exclusão</DialogTitle>
        <DialogContent>
          Tem certeza que deseja excluir o perfil de {selectedProfile?.name}?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Não
          </Button>
          <Button onClick={handleConfirmDelete} color="primary">
            Sim
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProfileList;
