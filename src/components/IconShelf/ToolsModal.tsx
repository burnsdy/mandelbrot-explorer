import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Stack, Title, Button, Space } from '@mantine/core';
import IterationsSelector from './IterationsSelector';
import ColorSchemeSelector from './ColorSchemeSelector';
import {
    selectIterations,
    selectColorScheme,
    updateSettings
} from '../../store/renderingSettingsSlice';

interface ToolsModalProps {
    opened: boolean;
    setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToolsModal = ({ opened, setOpened }: ToolsModalProps) => {
    const initialIterations = useSelector(selectIterations);
    const initialColorScheme = useSelector(selectColorScheme);
    // TODO: set errors for iterations outside allowed range
    const [iterations, setIerations] = useState(initialIterations);
    const [colorScheme, setColorScheme] = useState(initialColorScheme);

    const dispatch = useDispatch();
    const handleApply = () => {
        dispatch(updateSettings({ iterations, colorScheme }));
        setOpened(false);
    };
    const handleClose = () => {
        setIerations(initialIterations);
        setColorScheme(initialColorScheme);
        setOpened(false);
    };

    return (
        <Modal
            title={<Title order={1}>Settings</Title>}
            centered
            opened={opened}
            onClose={handleClose}
            overflow='inside'
            transition='fade'
            transitionDuration={800}
            transitionTimingFunction='ease'
        >
            <Stack align='left'>
                <Space h='sm' />
                <IterationsSelector
                    iterations={iterations}
                    setIterations={setIerations}
                />
                <Space h='md' />
                <ColorSchemeSelector
                    colorScheme={colorScheme}
                    setColorScheme={setColorScheme}
                />
                <Space h='md' />
                <Button onClick={handleApply}>Apply Changes</Button>
            </Stack>
        </Modal>
    );
};

export default ToolsModal;
