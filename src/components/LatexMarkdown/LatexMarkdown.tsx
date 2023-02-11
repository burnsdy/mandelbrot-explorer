import ReactMarkdown from 'react-markdown';
import RemarkMathPlugin from 'remark-math';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const _mapProps = (props: any) => ({
    ...props,
    escapeHtml: false,
    plugins: [RemarkMathPlugin],
    renderers: {
        ...props.renderers,
        math: ({ value }: any) => <BlockMath>{value}</BlockMath>,
        inlineMath: ({ value }: any) => <InlineMath>{value}</InlineMath>
    }
});

const LatexMarkdown = (props: any) => <ReactMarkdown {..._mapProps(props)} />;

export default LatexMarkdown;
