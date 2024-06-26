import React from "react";
import { IMaskInput } from "react-imask";

interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}

export const CNPJMask = React.forwardRef<HTMLInputElement, CustomProps>(
    function CNPJMaskCustom(props, ref) {
        const { onChange, ...other } = props;
        return (
            <IMaskInput
                {...other}
                mask="00.000.000/0000-00"
                definitions={{
                    '0': /[0-9]/,
                }}
                inputRef={ref}
                onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
                overwrite
            />
        );
    },
);
