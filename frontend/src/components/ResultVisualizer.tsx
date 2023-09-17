import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Notice from './Notice';

function ResultVisualizer({ constraint, reasons }: { constraint: string; reasons: string[] }) {
    const constraintElements = constraint.split('||').map((constraintElement) => constraintElement.trim());
    const failureReasons = constraintElements.map((element, index) => [element, reasons[index] || '']);

    return (
        <div className="mt-4 w-full rounded-lg bg-zinc-900 p-4">
            <h3 className="text-l pb-2 font-bold">Result</h3>

            {reasons.length === 0 ? (
                <>
                    <div className="mt-2 flex flex-row items-center rounded-md bg-green-900">
                        <CheckIcon className="h-8 w-8" />
                        <p>Version matches constraint</p>
                    </div>
                    {constraintElements.length > 1 && (
                        <Notice>
                            Per-element failure information is unavailable if any element of your constraint matches the
                            version.
                        </Notice>
                    )}
                </>
            ) : (
                <div className="mt-2 flex flex-row items-center rounded-md bg-red-900">
                    <XMarkIcon className="h-8 w-8" />
                    <p>Version does not match constraint</p>
                </div>
            )}

            {constraintElements.length === reasons.length ? (
                <div className="mt-2 inline-grid w-full grid-cols-[minmax(min-content,_25%)_auto] rounded-xl border-2 border-zinc-600">
                    {failureReasons.map(([element, reason]) => (
                        <>
                            <div className="border-b-2 border-r-2 border-zinc-600 p-2 font-bold [&:nth-last-child(2)]:border-b-0">
                                {element}
                            </div>
                            <div className="overflow-scroll border-b-2 border-zinc-600 p-2 last:border-b-0">
                                {reason ? (
                                    <code>{reason}</code>
                                ) : (
                                    <p className="italic">
                                        At least one constraint element matches the specified version.
                                    </p>
                                )}
                            </div>
                        </>
                    ))}
                </div>
            ) : (
                reasons.length !== 0 && (
                    <div>
                        <ul className="mt-2 list-inside list-disc">
                            {reasons.map((reason) => (
                                <li>
                                    <code>{reason}</code>
                                </li>
                            ))}
                        </ul>
                        <Notice>
                            semver returned incomplete failure information. The failure reason(s) cannot be associated
                            with the particular constraint elements that caused it.
                        </Notice>
                    </div>
                )
            )}
        </div>
    );
}

export default ResultVisualizer;
