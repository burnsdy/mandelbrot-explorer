import { Modal, Stack, Space, Title, Text } from '@mantine/core';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

interface AboutModalProps {
    opened: boolean;
    setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const AboutModal = ({ opened, setOpened }: AboutModalProps) => {
    return (
        <Modal
            title={<Title order={1}>{'About'}</Title>}
            size='xl'
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
                <Text>
                    The interactive graphic shown on-screen is a visual
                    depiction of the Mandelbrot set.
                </Text>
                <Text>But what is the Mandelbrot set?</Text>
                <Space h='sm' />
                <Text fw={700}>
                    The Mandelbrot set is the set of complex numbers that do not
                    diverge after being run through the iterative equation:
                    <BlockMath math='z_{n+1} = z_n^2 + C'></BlockMath>
                </Text>
                <Space h='sm' />
            </Stack>
        </Modal>
    );
};

export default AboutModal;
