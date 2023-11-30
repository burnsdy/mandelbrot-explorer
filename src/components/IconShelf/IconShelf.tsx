import { useState } from 'react';
import dynamic from 'next/dynamic';
import { ActionIcon, Tooltip } from '@mantine/core';
import { IconInfoCircle, IconSettings } from '@tabler/icons-react';
import ToolsModal from './ToolsModal/ToolsModal';
import styles from '../../../styles/IconShelf.module.css';

const IconShelf = () => {
  const [aboutOpened, setAboutOpened] = useState(false);
  const [toolsOpened, setToolsOpened] = useState(false);
  const DynamicAboutModal = dynamic(() => import('./AboutModal/AboutModal'));
  return (
    <div className={styles.iconShelf}>
      <Tooltip label='About'>
        <ActionIcon size='lg' radius='md' variant='light' onClick={() => setAboutOpened(true)}>
          <IconInfoCircle size={28} />
        </ActionIcon>
      </Tooltip>
      <Tooltip label='Settings'>
        <ActionIcon size='lg' radius='md' variant='light' onClick={() => setToolsOpened(true)}>
          <IconSettings size={28} />
        </ActionIcon>
      </Tooltip>
      <DynamicAboutModal opened={aboutOpened} setOpened={setAboutOpened} />
      <ToolsModal opened={toolsOpened} setOpened={setToolsOpened} />
    </div>
  );
};

export default IconShelf;
