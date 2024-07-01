import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    FormHelperText,
} from '@mui/material';
import { PhotoUploader } from '../components/photoUploader';

interface ActivityFormData {
    id: number;
    percurso: number;
    duracao: number;
    description: string;
    isMonitored: boolean;
    activityName: string;
    activityImage: string | undefined;
    difficultyLevel: 'FACIL' | 'MEDIO' | 'DIFICIL';
}

interface EditActivityDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: ActivityFormData) => void;
    initialData: ActivityFormData;
}

const EditActivityDialog: React.FC<EditActivityDialogProps> = ({ open, onClose, onSubmit, initialData }) => {
    const [image, setImage] = useState<any>(null);
    const { control, handleSubmit, setValue } = useForm<ActivityFormData>({
        defaultValues: initialData,
    });

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Editar Atividade</DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Controller
                            name="activityImage"
                            control={control}
                            render={({ field }) => (
                                <PhotoUploader setImage={setImage} image_view={''} initial_photo={initialData?.activityImage} />
                            )}
                        />
                    </div>
                    <Controller
                        name="percurso"
                        control={control}
                        rules={{ required: 'Percurso é obrigatório' }}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                label="Percurso"
                                type="number"
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                                fullWidth
                                margin="normal"
                            />
                        )}
                    />
                    <Controller
                        name="duracao"
                        control={control}
                        rules={{ required: 'Duração é obrigatória' }}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                label="Duração"
                                type="number"
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
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Monitorado</InputLabel>
                        <Controller
                            name="isMonitored"
                            control={control}
                            render={({ field }) => (
                                <Select {...field} label="Monitorado">
                                    <MenuItem value={true}>Sim</MenuItem>
                                    <MenuItem value={false}>Não</MenuItem>
                                </Select>
                            )}
                        />
                    </FormControl>
                    <Controller
                        name="activityName"
                        control={control}
                        rules={{ required: 'Nome da Atividade é obrigatório' }}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                label="Nome da Atividade"
                                type="text"
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                                fullWidth
                                margin="normal"
                            />
                        )}
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Dificuldade</InputLabel>
                        <Controller
                            name="difficultyLevel"
                            control={control}
                            render={({ field }) => (
                                <Select {...field} label="Dificuldade">
                                    <MenuItem value="FACIL">Fácil</MenuItem>
                                    <MenuItem value="MEDIO">Médio</MenuItem>
                                    <MenuItem value="DIFICIL">Difícil</MenuItem>
                                </Select>
                            )}
                        />
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancelar</Button>
                    <Button type="submit" color="primary">Salvar</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default EditActivityDialog;
