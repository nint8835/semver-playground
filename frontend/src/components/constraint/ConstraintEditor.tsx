import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useQuery } from '@tanstack/react-query';
import { useDeferredValue } from 'react';
import { getParseConstraintQuery } from '../../queries/queries';
import Editor from '../Editor';

function ConstraintEditor(props: { constraintString: string; setConstraintString: (val: string) => void }) {
    const { constraintString, setConstraintString } = props;
    const constraintQuery = useDeferredValue(useQuery(getParseConstraintQuery(constraintString)));

    return (
        <Editor setEditorValue={setConstraintString} editorValue={constraintString} title="Version constraint">
            {constraintQuery.isFetched && (
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
            )}
        </Editor>
    );
}

export default ConstraintEditor;
