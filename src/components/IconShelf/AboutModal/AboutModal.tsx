import { Modal, Stack, Space, Title, Text, List } from '@mantine/core';
import Image from 'next/image';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { IconSettings } from '@tabler/icons-react';
import HighlightText from './HighlightText';
import InfoAlert from './InfoAlert';
import CalcTable from './CalcTable';
import ComplexPlaneSvg from 'public/complex-plane-example.svg';

interface AboutModalProps {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const AboutModal = ({ opened, setOpened }: AboutModalProps) => {
  return (
    <Modal
      title={
        <Title order={3} color='dimmed'>
          {'Explaining the Mandelbrot Set'}
        </Title>
      }
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
          overflow: 'hidden',
        },
      }}
    >
      <Stack
        align='left'
        sx={{
          paddingRight: '20px',
        }}
      >
        <Space h='md' />
        <Title order={2}>What is the Mandelbrot Set?</Title>
        <Text>The interactive graphic shown on-screen depicts the Mandelbrot set.</Text>
        <Text>But what is the Mandelbrot set?</Text>
        <Text>
          <HighlightText>
            The Mandelbrot set is the set of complex numbers that do not diverge after being run
            through the iterative equation:
          </HighlightText>
          <BlockMath math='z_{n+1} = z_n^2 + C' />
        </Text>
        <Text>
          But this definition is a bit convoluted. To understand what it means, you must be able to
          answer two questions:
        </Text>
        <List type='ordered'>
          <List.Item>What are complex numbers and how can they be visually depicted?</List.Item>
          <List.Item>
            What does the equation itself mean and how does it produce the graphic?
          </List.Item>
        </List>
        <Space h='md' />
        <Space h='md' />
        <Title order={2}>The Complex Plane</Title>
        <Text>
          To answer the first question, a complex number is a number that has both a real component
          (a real number, like <InlineMath math='3' />) and an imaginary component (an imaginary
          number, like <InlineMath math='3i' />
          ).
        </Text>
        <InfoAlert>
          An imaginary number is a real number that is multiplied by the imaginary unit{' '}
          <InlineMath math='i' />, which represents the square root of <InlineMath math='-1' />.
        </InfoAlert>
        <Text>
          For example, <InlineMath math='3 + 4i' /> is a complex number. Now, to visually represent
          this number, we can graph it on the complex plane:
        </Text>
        <Image
          src={ComplexPlaneSvg}
          alt='Complex number 3 + 4i plotted on the complex plane.'
          style={{
            alignSelf: 'center',
          }}
        />
        <Text>
          Notice that instead of <InlineMath math='x' /> and <InlineMath math='y' /> axes, the
          complex plane uses real and imaginary axes to plot the real and imaginary components
          respectively.
        </Text>
        <Text>
          Because the Mandelbrot set is a collection of complex numbers, it is visually depicted on
          the complex plane.
        </Text>
        <Space h='md' />
        <Space h='md' />
        <Title order={2}>Understanding the Equation</Title>
        <Text>
          Answering the second question is less straightforward, and requires both an understanding
          of the equation itself and its unique properties.
        </Text>
        <Text>
          The Mandelbrot set equation is an iterative equation, meaning that it’s run over and over
          again with the current iteration’s output being used as an input for the next iteration.
        </Text>
        <Text>
          <InlineMath math='n' /> in the equation represents the current iteration, so{' '}
          <InlineMath math='z_{n+1} = z_n^2 + C' /> indicates that for the iteration{' '}
          <InlineMath math='n' />, one input is <InlineMath math='z_n' />. Then, the output{' '}
          <InlineMath math='z_{n+1}' /> replaces this input for the next iteration, iteration{' '}
          <InlineMath math='n+1' />.
        </Text>
        <Text>
          For the first iteration, the input <InlineMath math='z' /> starts at{' '}
          <InlineMath math='0' />. In other words, <InlineMath math='z_0 = 0' />.
        </Text>
        <Text>
          But what about the other input <InlineMath math='C' />?
        </Text>
        <Text>
          <InlineMath math='C' /> represents a complex number, which can be any complex number that
          you choose. Because there is no subscript <InlineMath math='n' /> on{' '}
          <InlineMath math='C' />, it should be clear that this input stays the same for every
          iteration.
        </Text>
        <Text>
          <InlineMath math='C' /> is also the only input of the Mandelbrot equation that you can
          pick, since the input <InlineMath math='z_n' /> is just the output of the previous
          iteration.
        </Text>
        <HighlightText>
          Therefore, the output of the Mandelbrot equation only depends on its input complex number.
        </HighlightText>
        <Space h='md' />
        <Space h='md' />
        <Title order={2}>Identifying Complex Numbers within the Set</Title>
        <Text>
          Now we know enough to use the equation. Let’s calculate the first <InlineMath math='5' />{' '}
          iterations of the Mandelbrot set equation for <InlineMath math='C = 1 + 0i' />, which is
          the real number <InlineMath math='1' />:
        </Text>
        <CalcTable cValue='1' />
        <Text>
          As you can see, the output grows at an increasing rate, towards positive infinity. Outputs
          from other complex numbers may not grow directly towards positive infinity. For instance,
          here are the first <InlineMath math='5' /> iterations of <InlineMath math='C = 1 - 1i' />:
        </Text>
        <CalcTable cValue='1 - 1i' />
        <Text>
          Still, it’s clear that the outputs for these complex numbers are continuously growing,
          which is referred to as “diverging.”{' '}
        </Text>
        <Text>
          As stated before, complex numbers that diverge are not part of the Mandelbrot set.
        </Text>
        <Text>
          But not all complex numbers diverge. Here are the first <InlineMath math='5' /> iterations
          for <InlineMath math='C = -1.9 + 0i' />, rounded to the nearest hundredth:
        </Text>
        <CalcTable cValue='-1.9' />
        <Text>
          These outputs do not diverge. If you refer to the definition of the Mandelbrot set
          provided above, you’ll see that the complex number <InlineMath math='C = -1.9 + 0i' /> is
          in the set!
        </Text>
        <Space h='md' />
        <Space h='md' />
        <Title order={2}>Comparing Complex Numbers outside the Set</Title>
        <Text>
          Knowing how to classify complex numbers that diverge is the final piece of context needed
          to understand the graphic.
        </Text>
        <Text>
          Fortunately, classifying diverging complex numbers is intuitive, since it only involves
          measuring the time it takes for their outputs to diverge. And this “time to divergence”
          for a complex number is defined by its escape iteration.
        </Text>
        <InfoAlert>
          The escape iteration of a complex number input is the iteration where it’s known for
          certain that the output has diverged.
        </InfoAlert>
        <Text>
          Therefore, complex numbers with a greater escape iteration diverge after complex numbers
          with a lesser escape iteration.
        </Text>
        <Text>
          To identify the escape iteration for a complex number, we can use a known property of the
          Mandelbrot set, being that the Mandelbrot set has an escape radius of{' '}
          <InlineMath math='2' />. This means that any output that leaves the circle of radius{' '}
          <InlineMath math='2' /> around the complex plane origin will eventually diverge. So, the
          escape iteration can be further defined as the first iteration where the distance from the
          origin to the output is greater than <InlineMath math='2' />.
        </Text>
        <HighlightText>
          In short, complex numbers whose outputs diverge can be compared against each other through
          comparing their escape iterations.
        </HighlightText>
        <Space h='md' />
        <Space h='md' />
        <Title order={2}>Generating the Colorful Graphic</Title>
        <Text>Now let’s put everything together to understand the graphic.</Text>
        <Text>
          Your screen depicts the complex plane, where every pixel on the screen corresponds to a
          complex number in the plane. Zooming into the graphic adds precision to the complex
          numbers visible on screen by increasing their number of decimal places. For example,
          moving from two decimal place numbers like <InlineMath math='1.32 + 5.47i' /> to three
          decimal place numbers like <InlineMath math='1.324 + 5.471i' />.
        </Text>
        <Text>
          Each pixel’s complex number is run through the Mandelbrot set equation, where the equation
          is iterated until it reaches the specified maximum number of iterations (else the equation
          would continue iterating indefinitely).
        </Text>
        <Text>
          If the output does not diverge by the maximum iteration, then this complex number is in
          the Mandelbrot set. We color the pixel black to represent this.
        </Text>
        <Text>
          Otherwise, the complex number diverges before the maximum iteration, so we instead take
          note of its escape iteration.
        </Text>
        <Text>
          We color the pixels of diverging complex numbers based on the value of their escape
          iterations, which allows us to visualize the rate at which each complex number diverges.
        </Text>
        <Text
          sx={{
            display: 'flex',
            gap: '4px',
          }}
        >
          Check out the Settings <IconSettings /> to set the maximum iterations and create your own
          color scheme!
        </Text>
        <Space h='md' />
        <Space h='md' />
        <Title order={2}>Importance of the Set</Title>
        <Text>But why does any of this matter?</Text>
        <Text>
          If you play around with the graphic, you’ll quickly notice something unusual that occurs
          when you zoom into the perimeter of the set — the odd, bulbous shape of the Mandelbrot set
          continually reappears.
        </Text>
        <Text>This self-repeating characteristic of the set is what makes it a fractal.</Text>
        <InfoAlert>
          A fractal is a geometric shape that exhibits self-similarity at various scales.
        </InfoAlert>
        <Text>
          But despite its repetition, the area included in the set at various scales is wildly
          unpredictable. This is because the Mandelbrot set is a chaotic system, as defined by Chaos
          theory.
        </Text>
        <InfoAlert>
          Chaos theory is the study of the dynamics and underlying patterns of complex systems that
          are highly sensitive to initial conditions.
        </InfoAlert>
        <Text>
          The Mandelbrot set is governed by Chaos theory because it exhibits seemingly random
          behavior despite being the result of a deterministic equation. The set is highly sensitive
          to its initial condition, as minute changes to the input complex number correspond to
          extreme differences in the output.
        </Text>
        <Text>
          These applications of the Mandelbrot set have allowed it to impact a wide variety of
          fields. Its fractal geometry has driven innovation in computer graphics and visualization
          technologies, while its complex dynamics have inspired exploration at the intersection of
          mathematics and physics.
        </Text>
        <Text>It’s also just fun to look at.</Text>
        <Space h='md' />
      </Stack>
    </Modal>
  );
};

export default AboutModal;
