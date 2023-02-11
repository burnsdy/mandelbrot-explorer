import { Modal, Stack, Title, Button, Space } from '@mantine/core';
import ColorSchemeSelector from './ColorSchemeSelector';
import IterationsSelector from './IterationsSelector';

interface ToolsModalProps {
    opened: boolean;
    setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToolsModal: React.FC<ToolsModalProps> = ({ opened, setOpened }) => {
    return (
        <Modal
            title={<Title order={1}>Settings</Title>}
            centered
            opened={opened}
            onClose={() => setOpened(false)}
            overflow='inside'
            transition='fade'
            transitionDuration={800}
            transitionTimingFunction='ease'
        >
            <Stack align='left'>
                <Space h='sm' />
                <IterationsSelector />
                <Space h='md' />
                <ColorSchemeSelector />
                <Space h='md' />
                <Button>Apply Changes</Button>
            </Stack>
        </Modal>
    );
};

export default ToolsModal;
