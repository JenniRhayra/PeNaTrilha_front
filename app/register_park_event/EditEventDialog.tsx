import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
} from '@mui/material';
import { PhotoUploader } from '../components/photoUploader';

interface EventFormData {
    id: number;
    event_name: string;
    description: string;
    start_date: string;
    end_date: string;
    locationRef: string;
    eventImage: string | undefined;
}

interface EditEventDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: EventFormData) => void;
    initialData: EventFormData;
}

const EditEventDialog: React.FC<EditEventDialogProps> = ({ open, onClose, onSubmit, initialData }) => {
    const [image, setImage] = useState<any>(null);
    const { control, handleSubmit, setValue } = useForm<EventFormData>({
        defaultValues: initialData,
    });

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Editar Evento</DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Controller
                            name="eventImage"
                            control={control}
                            render={({ field }) => (
                                <PhotoUploader setImage={setImage} image_view={''} initial_photo={initialData?.eventImage} />
                            )}
                        />
                    </div>
                    <Controller
                        name="event_name"
                        control={control}
                        rules={{ required: 'Nome do evento é obrigatório' }}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                label="Nome do Evento"
                                type="text"
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                                fullWidth
                                margin="normal"
                            />
                        )}
                    />
                    <Controller
                        name="description"
                        control={control}
                        rules={{ required: 'Descrição é obrigatória' }}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                label="Descrição"
                                type="text"
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                                fullWidth
                                margin="normal"
                            />
                        )}
                    />
                    <Controller
                        name="start_date"
                        control={control}
                        rules={{ required: 'Data de início é obrigatória' }}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                label="Data de Início"
                                type="date"
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        )}
                    />
                    <Controller
                        name="end_date"
                        control={control}
                        rules={{ required: 'Data de término é obrigatória' }}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                label="Data de Término"
                                type="date"
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        )}
                    />
                    <Controller
                        name="locationRef"
                        control={control}
                        rules={{ required: 'Localização é obrigatória' }}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                label="Localização"
                                type="text"
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                                fullWidth
                                margin="normal"
                            />
                        )}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancelar</Button>
                    <Button type="submit" color="primary">Salvar</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default EditEventDialog;
