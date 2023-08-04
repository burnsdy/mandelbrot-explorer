import { ColorSwatch } from '@mantine/core';
import { IconColorPicker } from '@tabler/icons-react';

interface SelectableColorInputProps {
  id: number;
  selected: boolean;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
  color: string;
}

const SelectableColorInput = ({
  id,
  selected,
  setSelected,
  color
}: SelectableColorInputProps) => {
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
