import { useState, useEffect } from 'react';
import {
    Stack,
    Flex,
    Group,
    Title,
    Button,
    ActionIcon,
    ColorInput
} from '@mantine/core';
import { IconRefresh } from '@tabler/icons-react';
import SelectableColorInput from './SelectableColorInput';
import { NUM_SELECTABLE_COLORS } from '../../../utils/constants';

interface ColorSchemeSelectorProps {
    colorScheme: string[];
    setColorScheme: React.Dispatch<React.SetStateAction<string[]>>;
}

const ColorSchemeSelector = ({
    colorScheme,
    setColorScheme
}: ColorSchemeSelectorProps) => {
    const [selectedInput, setSelectedInput] = useState(0);
    const [selectedColor, setSelectedColor] = useState(
        colorScheme[selectedInput]
    );

    const randomColor = () =>
        `#${Math.floor(Math.random() * 16777215).toString(16)}`;

    const getNextColorInput = (i: number) =>
        i === NUM_SELECTABLE_COLORS - 1 ? 0 : i + 1;

    const updateColorScheme = () => {
        const updatedColorScheme = [...colorScheme];
        updatedColorScheme[selectedInput] = selectedColor;
        setColorScheme(updatedColorScheme);
        setSelectedInput(getNextColorInput(selectedInput));
    };

    useEffect(() => {
        setSelectedColor(colorScheme[selectedInput]);
    }, [selectedInput]);

    return (
        <>
            <Title order={3} align='left'>
                Select your Color Scheme
            </Title>
            <Stack align='center'>
                <Flex direction='row' align='flex-end' gap='10px'>
                    <ColorInput
                        placeholder='Pick color'
                        label='Click to use the color picker!'
                        value={selectedColor}
                        onChange={setSelectedColor}
                        rightSection={
                            <ActionIcon
                                onClick={() => setSelectedColor(randomColor())}
                            >
                                <IconRefresh />
                            </ActionIcon>
                        }
                    />
                    <Button variant='outline' onClick={updateColorScheme}>
                        Set Color
                    </Button>
                </Flex>
                <Group position='center' spacing='xl'>
                    {[...Array(NUM_SELECTABLE_COLORS)].map((e, i) => {
                        return (
                            <SelectableColorInput
                                key={i}
                                id={i}
                                selected={selectedInput === i}
                                setSelected={setSelectedInput}
                                color={colorScheme[i]}
                            />
                        );
                    })}
                </Group>
            </Stack>
        </>
    );
};

export default ColorSchemeSelector;
