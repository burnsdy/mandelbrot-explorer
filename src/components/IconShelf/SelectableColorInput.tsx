import { ColorSwatch } from '@mantine/core';
import { IconColorPicker } from '@tabler/icons-react';

interface SelectableColorInputProps {
    id: number;
    selected: boolean;
    setSelected: React.Dispatch<React.SetStateAction<number>>;
    color: string;
}

const SelectableColorInput: React.FC<SelectableColorInputProps> = ({
    id,
    selected,
    setSelected,
    color
}) => {
    return (
        <ColorSwatch
            color={color}
            onClick={() => setSelected(id)}
            sx={{
                color: '#000000',
                cursor: 'pointer'
            }}
        >
            {selected && <IconColorPicker width={16} />}
        </ColorSwatch>
    );
};

export default SelectableColorInput;
