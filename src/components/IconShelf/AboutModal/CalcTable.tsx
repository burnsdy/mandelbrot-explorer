import { Table } from '@mantine/core';
import { InlineMath } from 'react-katex';
import { SampleCalc, sampleCalc } from '../../../utils/sampleCalculations';

interface CalcTableProps {
  cValue: string;
}

const CalcTable = ({ cValue }: CalcTableProps) => {
  const calcTableHeader = (
    <tr>
      <th>Iteration</th>
      <th>Equation</th>
      <th>Output</th>
    </tr>
  );
  const getCalcTableBody = (c: keyof SampleCalc) => {
    let input = '0',
      nextInput = '0';
    return sampleCalc[c].map((output, i) => {
      input = nextInput;
      nextInput = output;
      return (
        <tr key={i}>
          <td>{<InlineMath math={`n = ${i}`} />}</td>
          <td>{<InlineMath math={`z_${i + 1} = (${input})^2 + ${c}`} />}</td>
          <td>{<InlineMath math={`z_${i + 1} = ${output}`} />}</td>
        </tr>
      );
    });
  };

  return (
    <Table>
      <thead>{calcTableHeader}</thead>
      <tbody>{getCalcTableBody(cValue)}</tbody>
    </Table>
  );
};

export default CalcTable;
