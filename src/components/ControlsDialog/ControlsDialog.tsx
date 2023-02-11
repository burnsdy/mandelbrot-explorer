import { useState, useEffect } from 'react';
import { Dialog, Space, Title, Text, Checkbox } from '@mantine/core';
import Cookies from 'js-cookie';

const ControlsDialog = () => {
    const showControlsDialog = Cookies.get('showControlsDialog');
    const [opened, setOpened] = useState(
        !showControlsDialog || showControlsDialog === 'true'
    );
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        if (opened && !checked) {
            Cookies.set('showControlsDialog', 'true', { expires: 30 });
        } else {
            Cookies.set('showControlsDialog', 'false', { expires: 30 });
        }
    }, [checked]);

    return (
        <Dialog
            opened={opened}
            withCloseButton
            onClose={() => setOpened(false)}
            size='lg'
            radius='md'
            sx={theme => ({
                [`@media (max-width: ${theme.breakpoints.md}px)`]: {
                    display: 'none'
                }
            })}
        >
            <Title order={4} sx={{ marginBottom: '8px' }}>
                Explore the Mandelbrot set!
            </Title>
            <Text size='sm' sx={{ marginBottom: '10px' }}>
                Drag to pan, scroll to zoom — or use arrow keys and +/-
            </Text>
            <Space h='sm' />
            <Checkbox
                checked={checked}
                label='Do not show this again'
                onChange={event => setChecked(event.currentTarget.checked)}
            />
        </Dialog>
    );
};

export default ControlsDialog;
