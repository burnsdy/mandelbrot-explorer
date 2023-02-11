import { useState } from 'react';
import { Modal, Stack, Space, Title, Text } from '@mantine/core';
import LatexMarkdown from '../LatexMarkdown/LatexMarkdown';

interface ToolsModalProps {
    opened: boolean;
    setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const AboutModal: React.FC<ToolsModalProps> = ({ opened, setOpened }) => {
    const content = `
The interactive graphic shown on-screen is a visual depiction of the Mandelbrot set.

**The Mandelbrot set is the set of complex numbers that do not diverge after being run through the iterative equation:**
$$
z_{n+1} = z_n^2 + C
$$

- But this definition probably doesn't help much. To understand what's really going on, you need to be able to answer:
    - What are complex numbers and how can they be visually depicted?
    - What does the equation itself mean and how is it used to produce the graphic?
- To answer the first question, a complex number is a number that has both a real component (real number) and an imaginary component (imaginary number).
    - An imaginary number is a real number that is multiplied by the imaginary unit i, which represents the square root of -1
    - For example, 2 + 3i is a complex number. Now, to visually represent this number, we can just graph it:
    - Show graph
    - Notice that instead of an x and y axis, a real axis and imaginary axis are used to plot the real and imaginary components respectively
    - Depictions of the Mandelbrot set use this exact same plotting scheme
- In regards to the second question,
    `;

    return (
        <Modal
            title={<Title order={1}>{'About'}</Title>}
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
                <Title order={3}>{'Concise Explanation'}</Title>
                <LatexMarkdown>{content}</LatexMarkdown>
            </Stack>
        </Modal>
    );
};

export default AboutModal;
