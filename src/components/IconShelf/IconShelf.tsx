import { useState } from 'react';
import { ActionIcon, Tooltip } from '@mantine/core';
// import { IconBulb, IconTools } from '@tabler/icons-react';
import { IconQuestionCircle, IconSettings } from '@tabler/icons-react';
import AboutModal from './AboutModal';
import ToolsModal from './ToolsModal';
import styles from '../../../styles/IconShelf.module.css';

const IconShelf = () => {
    const [aboutOpened, setAboutOpened] = useState(false);
    const [toolsOpened, setToolsOpened] = useState(false);
    return (
        <div className={styles.iconShelf}>
            <Tooltip label='About'>
                <ActionIcon
                    size='lg'
                    radius='md'
                    variant='light'
                    onClick={() => setAboutOpened(true)}
                >
                    <IconQuestionCircle size={28} />
                </ActionIcon>
            </Tooltip>
            <Tooltip label='Settings'>
                <ActionIcon
                    size='lg'
                    radius='md'
                    variant='light'
                    onClick={() => setToolsOpened(true)}
                >
                    <IconSettings size={28} />
                </ActionIcon>
            </Tooltip>
            <AboutModal opened={aboutOpened} setOpened={setAboutOpened} />
            <ToolsModal opened={toolsOpened} setOpened={setToolsOpened} />
        </div>
    );
};

export default IconShelf;
