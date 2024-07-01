import React, { useEffect, useState } from 'react';
import { FiCheck, FiX } from 'react-icons/fi';
import { List, ListItem, ListItemText, ListItemAvatar, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import Image from 'next/image';
import styled from 'styled-components';
import Link from 'next/link';
import { managerService } from '../services/axios-config/connection';
import Cookies from 'js-cookie';
interface Profile {
  id: number;
  photo: string;
  name: string;
  status: 'PENDENTE' | 'APROVADO' | 'desativado' | 'REPROVADO';
  habilidades: string[];
  language: string;
  park: string[];
  link: string;
}

interface ProfileApproveProps {
  profile: Profile[];
  refetch?: any;
}

const ProfileApprove: React.FC<ProfileApproveProps> = ({ profile, refetch }) => {
  const id = Cookies.get('id');

  const [guias, setGuias] = useState<Profile[]>(profile);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedGuia, setSelectedGuia] = useState<Profile | null>(null);
  const [novoStatus, setNovoStatus] = useState<Profile['status'] | null>(null);

  useEffect(() => {
    setGuias(profile)
  }, [profile]);

  const atualizarStatus = async () => {
    if (selectedGuia && novoStatus) {
      guias.map(async (guia) => {
        if (guia.name === selectedGuia.name) {
          try {
            await managerService.approveGuide(guia.id, novoStatus, Number(id))
            setOpenDialog(false);
            refetch()
          } catch (err: any) {
            console.log('err', err)
          }

          // return { ...guia, status: novoStatus };
        }
        // return guia;
      });
      // console.log('novosGuias', novosGuias)
      // setGuias(novosGuias);

    }
  };

  const getStatusColor = (status: Profile['status']) => {
    switch (status) {
      case 'PENDENTE':
        return '#DFBA2B';
      case 'APROVADO':
        return '#7D9662';
      case 'desativado':
        return 'gray';
      case 'REPROVADO':
        return '#EF2945';
      default:
        return 'gray';
    }
  };

  const ListItemStyled = styled(ListItem)`
    position: relative;
    margin-bottom: 10px;
    background-color: white;
    border-radius: 10px;
    width: 100%;
    margin: 5px;
    display: flex;
    align-items: center;
  `;

  const ImageWrapper = styled.div`
    position: relative;
    width: 100px;
    height: 100px;
    border-radius: 10px;
    overflow: hidden;
  `;

  const StatusWrapper = styled.div`
    display: flex;
    align-items: center;
    position: absolute;
    top: 10px;
    right: 10px;
  `;

  const StatusText = styled(Typography) <{ status: Profile['status'] }>`
    font-size: 0.8rem;
    color: ${({ status }) => getStatusColor(status)};
  `;

  const StatusCircle = styled.div<{ status: Profile['status'] }>`
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: ${({ status }) => getStatusColor(status)};
    margin-left: 5px;
  `;

  const ActionButton = styled(Button)`
    margin-top: 10px;
  `;

  const handleOpenDialog = (guia: Profile, status: Profile['status']) => {
    setSelectedGuia(guia);
    setNovoStatus(status);
    setOpenDialog(true);
  };

  return (
    <div>
      <div id="guide-list-container" style={{ overflowX: 'hidden', width: '100%' }}>
        <List style={{ display: 'flex', flexDirection: 'column', padding: '30px 20px 60px 20px', margin: '0' }}>
          {guias.map((guia, index) => (
            <ListItemStyled key={index}>
              <StatusWrapper>
                <StatusText status={guia.status} variant="body2">
                  {guia.status.charAt(0).toUpperCase() + guia.status.slice(1)}
                </StatusText>
                <StatusCircle status={guia.status} />
              </StatusWrapper>
              <ListItemAvatar>
                <ImageWrapper>
                  <Image src={guia.photo} alt={guia.name} layout="fill" objectFit="cover" />
                </ImageWrapper>
              </ListItemAvatar>
              <ListItemText
                primary={guia.name}
                secondary={
                  <>
                    <Typography component="span" variant="body2" color="textPrimary">
                      Habilidades: {guia.habilidades}
                    </Typography>
                    <br />
                    Idioma: {guia.language}
                    <br />
                    Parques: {guia.park}
                    <div style={{ textAlign: 'right' }}>
                      <Link href={guia.link} passHref>
                        <Typography component="a" variant="caption" style={{ textDecoration: 'underline', color: '#99B83C' }}>Ver perfil</Typography>
                      </Link>
                      <div style={{ textAlign: 'center' }}>
                        {guia.status === 'PENDENTE' && (
                          <>
                            <ActionButton onClick={() => handleOpenDialog(guia, 'APROVADO')} style={{ color: 'green' }}>
                              Aprovar
                            </ActionButton>
                            <ActionButton onClick={() => handleOpenDialog(guia, 'REPROVADO')} style={{ color: 'red' }}>
                              Recusar
                            </ActionButton>
                          </>
                        )}
                        {guia.status === 'REPROVADO' && (
                          <ActionButton onClick={() => handleOpenDialog(guia, 'APROVADO')} style={{ color: 'green' }}>
                            Aprovar
                          </ActionButton>
                        )}
                        {guia.status === 'APROVADO' && (
                          <ActionButton onClick={() => handleOpenDialog(guia, 'REPROVADO')} style={{ color: 'red' }}>
                            Recusar
                          </ActionButton>
                        )}
                      </div>
                    </div>
                  </>
                }
                style={{ paddingLeft: '20px' }}
              />
            </ListItemStyled>
          ))}
        </List>
      </div>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirmação</DialogTitle>
        <DialogContent>
          Tem certeza que deseja {novoStatus === 'APROVADO' ? 'aprovar' : 'recusar'} o perfil de {selectedGuia?.name}?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={atualizarStatus} color="primary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProfileApprove;
