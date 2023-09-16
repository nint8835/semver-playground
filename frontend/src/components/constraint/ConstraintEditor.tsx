import { useQuery } from '@tanstack/react-query';
import { getParseConstraintQuery } from '../../queries/queries';

import Editor from '../Editor';

function ConstraintEditor(props: { constraintString: string; setConstraintString: (val: string) => void }) {
    const { constraintString, setConstraintString } = props;
    const constraintQuery = useQuery(getParseConstraintQuery(constraintString));

    return (
        <Editor setEditorValue={setConstraintString} editorValue={constraintString} title="Version constraint">
            <pre
                className={`mt-2 w-full whitespace-break-spaces rounded-md p-1 ${
                    { error: 'bg-red-900', loading: 'hidden', success: 'bg-blue-900' }[constraintQuery.status]
                }`}
            >
                {constraintQuery.error?.message}
                {constraintQuery.data && JSON.stringify(constraintQuery.data, null, 2)}
            </pre>
        </Editor>
    );
}

export default ConstraintEditor;
