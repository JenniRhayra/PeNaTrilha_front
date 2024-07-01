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

interface GoodPracticeFormData {
    id: number;
    title: string;
    practiceImage: string | undefined;
}

interface EditGoodPracticeDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: GoodPracticeFormData) => void;
    initialData: GoodPracticeFormData;
}

const EditGoodPracticeDialog: React.FC<EditGoodPracticeDialogProps> = ({ open, onClose, onSubmit, initialData }) => {
    const [image, setImage] = useState<any>(null);
    const { control, handleSubmit, setValue } = useForm<GoodPracticeFormData>({
        defaultValues: initialData,
    });

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Editar Boa Prática</DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Controller
                            name="practiceImage"
                            control={control}
                            render={({ field }) => (
                                <PhotoUploader setImage={setImage} image_view={''} initial_photo={initialData?.practiceImage} />
                            )}
                        />
                    </div>
                    <Controller
                        name="title"
                        control={control}
                        rules={{ required: 'Título é obrigatório' }}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                label="Título"
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

export default EditGoodPracticeDialog;
