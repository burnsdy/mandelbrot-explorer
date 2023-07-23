import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Stack, Title, Button, Space } from '@mantine/core';
import MaxIterationsSelector from './MaxIterationsSelector';
import ColorSchemeSelector from './ColorSchemeSelector';
import {
    selectMaxIterations,
    selectColorScheme,
    updateSettings
} from '../../../store/renderingSettingsSlice';

interface ToolsModalProps {
    opened: boolean;
    setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToolsModal = ({ opened, setOpened }: ToolsModalProps) => {
    const initialMaxIterations = useSelector(selectMaxIterations);
    const initialColorScheme = useSelector(selectColorScheme);
    // TODO: set errors for max iterations outside allowed range
    const [maxIterations, setMaxIterations] = useState(initialMaxIterations);
    const [colorScheme, setColorScheme] = useState(initialColorScheme);

    const dispatch = useDispatch();
    const applyChanges = () => {
        dispatch(updateSettings({ maxIterations, colorScheme }));
        setOpened(false);
    };
    const closeModal = () => {
        setMaxIterations(initialMaxIterations);
        setColorScheme(initialColorScheme);
        setOpened(false);
    };

    return (
        <Modal
            title={<Title order={1}>Settings</Title>}
            centered
            opened={opened}
            onClose={closeModal}
            overflow='inside'
            transition='fade'
            transitionDuration={800}
            transitionTimingFunction='ease'
        >
            <Stack align='left'>
                <Space h='sm' />
                <MaxIterationsSelector
                    maxIterations={maxIterations}
                    setMaxIterations={setMaxIterations}
                />
                <Space h='md' />
                <ColorSchemeSelector
                    colorScheme={colorScheme}
                    setColorScheme={setColorScheme}
                />
                <Space h='md' />
                <Button onClick={applyChanges}>Apply Changes</Button>
            </Stack>
        </Modal>
    );
};

export default ToolsModal;
