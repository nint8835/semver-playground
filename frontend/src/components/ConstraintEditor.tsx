import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useQuery } from '@tanstack/react-query';
import { useDeferredValue } from 'react';
import { getParseConstraintQuery } from '../queries/queries';
import Editor from './Editor';
import Notice from './Notice';

function ConstraintEditor(props: { constraintString: string; setConstraintString: (val: string) => void }) {
    const { constraintString, setConstraintString } = props;
    const deferredConstraintString = useDeferredValue(constraintString);
    const constraintQuery = useDeferredValue(useQuery(getParseConstraintQuery(constraintString)));

    return (
        <Editor setEditorValue={setConstraintString} editorValue={constraintString} title="Version constraint">
            {constraintQuery.isFetched && (
                <>
                    <div
                        className={`mt-2 flex flex-row items-center rounded-md transition-all ${
                            constraintQuery.isSuccess ? 'bg-green-900' : 'bg-red-900'
                        }`}
                    >
                        {constraintQuery.isSuccess ? (
                            <>
                                <CheckIcon className="h-8 w-8" />
                                <p>Constraint valid</p>
                            </>
                        ) : (
                            <>
                                <XMarkIcon className="h-8 w-8" />
                                <p>Constraint invalid</p>
                            </>
                        )}
                    </div>
                    {constraintQuery.isSuccess && constraintQuery.data !== deferredConstraintString && (
                        <>
                            <h3 className="mt-2 font-bold">Normalized constraint</h3>
                            <code className="mt-2 inline-block rounded-md bg-zinc-900 p-1">{constraintQuery.data}</code>
                            <Notice>
                                The constraint you entered produced a different value after parsing. This normalized
                                value is what will be used when comparing versions against the constraint.
                            </Notice>
                        </>
                    )}
                </>
            )}
        </Editor>
    );
}

export default ConstraintEditor;
