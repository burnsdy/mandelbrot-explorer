import { Modal, Stack, Space, Title, Text, List, Table } from '@mantine/core';
import Image from 'next/image';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import complexPlane from '../../../public/ComplexPlaneExample.svg';
import InfoAlert from './InfoAlert';
import CalcTable from './CalcTable';

interface AboutModalProps {
    opened: boolean;
    setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const AboutModal = ({ opened, setOpened }: AboutModalProps) => {
    return (
        <Modal
            title={<Title order={1}>{'Explaining the Mandelbrot Set'}</Title>}
            size='xl'
            centered
            opened={opened}
            onClose={() => setOpened(false)}
            overflow='inside'
            transition='fade'
            transitionDuration={800}
            transitionTimingFunction='ease'
            styles={{
                inner: {
                    overflow: 'hidden'
                }
            }}
        >
            <Stack
                align='left'
                sx={{
                    paddingRight: '20px'
                }}
            >
                <Space h='xl' />
                <Title order={2}>What is the Mandelbrot Set?</Title>
                <Text>
                    The interactive graphic shown on-screen is a depiction of
                    the Mandelbrot set.
                </Text>
                <Text>But what is the Mandelbrot set?</Text>
                <Text fw={800}>
                    The Mandelbrot set is the set of complex numbers that do not
                    diverge after being run through the iterative equation:
                    <BlockMath math='z_{n+1} = z_n^2 + C' />
                </Text>
                <Text>
                    But this definition is a bit convoluted. To understand what
                    it means, you must be able to answer two questions:
                </Text>
                <List type='ordered'>
                    <List.Item>
                        What are complex numbers and how can they be visually
                        depicted?
                    </List.Item>
                    <List.Item>
                        What does the equation itself signify and how does it
                        produce the graphic?
                    </List.Item>
                </List>
                <Space h='xl' />
                <Title order={2}>The Complex Plane</Title>
                <Text>
                    To answer the first question, a complex number is a number
                    that has both a real component (a real number, like{' '}
                    <InlineMath math='3' />) and an imaginary component (an
                    imaginary number, like <InlineMath math='3i' />
                    ).
                </Text>
                <InfoAlert>
                    An imaginary number is a real number that is multiplied by
                    the imaginary unit <InlineMath math='i' />, which represents
                    the square root of <InlineMath math='-1' />.
                </InfoAlert>
                <Text>
                    For example, <InlineMath math='3 + 4i' /> is a complex
                    number. Now, to visually represent this number, we can graph
                    it on the complex plane:
                </Text>
                <Image
                    src={complexPlane}
                    alt='Complex number 3 + 4i plotted on the complex plane.'
                    style={{
                        alignSelf: 'center'
                    }}
                />
                <Text>
                    Notice that instead of <InlineMath math='x' /> and{' '}
                    <InlineMath math='y' /> axes, the complex plane uses real
                    and imaginary axes to plot the real and imaginary components
                    respectively.
                </Text>
                <Text fw={800}>
                    Because the Mandelbrot set is a collection of complex
                    numbers, it is visually depicted on the complex plane.
                </Text>
                <Space h='xl' />
                <Title order={2}>Understanding the Equation</Title>
                <Text>
                    Answering the second question is less straightforward, and
                    requires both an understanding of the equation itself and
                    its unique properties.
                </Text>
                <Text>
                    The Mandelbrot set equation is an iterative equation,
                    meaning that it’s run over and over again with the current
                    iteration’s output being used as an input for the next
                    iteration.
                </Text>
                <Text>
                    <InlineMath math='n' /> in the equation represents the
                    current iteration, so{' '}
                    <InlineMath math='z_{n+1} = z_n^2 + C' /> indicates that for
                    the iteration <InlineMath math='n' />, one input is{' '}
                    <InlineMath math='z_n' />. Then, the output{' '}
                    <InlineMath math='z_{n+1}' /> replaces this input for the
                    next iteration, iteration <InlineMath math='n+1' />.
                </Text>
                <InfoAlert>
                    For the first iteration, the input <InlineMath math='z' />{' '}
                    starts at <InlineMath math='0' />. In other words,{' '}
                    <InlineMath math='z_0 = 0' />.
                </InfoAlert>
                <Text>
                    But what about the other input <InlineMath math='C' />?
                </Text>
                <Text>
                    <InlineMath math='C' /> represents a complex number, which
                    can be any complex number that you choose. Because there is
                    no subscript <InlineMath math='n' /> on{' '}
                    <InlineMath math='C' />, it should be clear that this input
                    stays the same for every iteration.
                </Text>
                <Text>
                    <InlineMath math='C' /> is also the only input of the
                    Mandelbrot equation that you can pick, since the input{' '}
                    <InlineMath math='z_n' /> is just the output of the previous
                    iteration.
                </Text>
                <Text fw={800}>
                    Therefore, the output of the Mandelbrot equation only
                    depends on its input complex number.
                </Text>
                <Space h='xl' />
                <Title order={2}>
                    Identifying Complex Numbers within the Set
                </Title>
                <Text>
                    Now we know enough to use the equation. Let’s calculate the
                    first <InlineMath math='5' /> iterations of the Mandelbrot
                    set equation for <InlineMath math='C = 1 + 0i' />, which is
                    the real number <InlineMath math='1' />:
                </Text>
                <CalcTable cValue='1' />
                <Text>
                    As you can see, the output grows at an increasing rate,
                    towards positive infinity. Other outputs for different{' '}
                    <InlineMath math='C' /> values may not grow directly towards
                    positive infinity. For instance, here are the first{' '}
                    <InlineMath math='5' /> iterations of{' '}
                    <InlineMath math='C = 1 - 1i' />:
                </Text>
                <CalcTable cValue='1 - 1i' />
                <Text>
                    Still, it’s clear that the outputs for these{' '}
                    <InlineMath math='C' /> values are continuously expanding,
                    or diverging.{' '}
                    <Text fw={800}>
                        Complex numbers that diverge are not a part of the
                        Mandelbrot set.
                    </Text>
                </Text>
                <Text>
                    But not all <InlineMath math='C' /> values diverge. Here are
                    the first <InlineMath math='5' /> iterations for{' '}
                    <InlineMath math='C = -1.9 + 0i' />, rounded to the nearest
                    hundredth:
                </Text>
                <CalcTable cValue='-1.9' />
                <Text>
                    These outputs do not diverge. If you refer to the definition
                    of the Mandelbrot set provided above, you’ll see that the
                    complex number <InlineMath math='C = -1.9 + 0i' /> is in the
                    set!
                </Text>
                <Space h='xl' />
                <Title order={2}>
                    Comparing Complex Numbers outside the Set
                </Title>
                <Space h='xl' />
            </Stack>
        </Modal>
    );
};

export default AboutModal;
