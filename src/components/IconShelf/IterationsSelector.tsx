import { Title, Text, NumberInput, Flex } from '@mantine/core';
import { IconCpu } from '@tabler/icons-react';
import { DEFAULT_ITERATIONS } from '../../utils/constants';

interface IterationsSelectorProps {
    iterations: number;
    setIterations: React.Dispatch<React.SetStateAction<number>>;
}

const IterationsSelector = ({
    iterations,
    setIterations
}: IterationsSelectorProps) => {
    const updateIterations = (value: number | undefined) => {
        if (value) {
            setIterations(value);
        } else {
            setIterations(DEFAULT_ITERATIONS);
        }
    };

    return (
        <>
            <Title order={3} align='left'>
                Set Iterations
            </Title>
            <Text fz='sm'>
                Increasing the number of iterations effectively increases the
                rendering depth — shows more detail but places a higher
                computational load on your device.
            </Text>
            <Flex justify='center'>
                <NumberInput
                    icon={<IconCpu />}
                    placeholder='Set number of iterations'
                    value={iterations}
                    onChange={updateIterations}
                    sx={{
                        justifyContent: 'center',
                        width: '120px'
                    }}
                />
            </Flex>
        </>
    );
};

export default IterationsSelector;
