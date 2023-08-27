import { QueryOptions } from '@tanstack/react-query';

export function getParseConstraintQuery(constraintString: string): QueryOptions<string, Error> {
    return {
        queryKey: ['parseConstraint', constraintString],
        queryFn: async (): Promise<string> => {
            return parseConstraint(constraintString);
        },
        retry: false,
    };
}

export function getParseVersionQuery(versionString: string): QueryOptions<Version, Error> {
    return {
        queryKey: ['parseVersion', versionString],
        queryFn: async (): Promise<Version> => {
            return parseVersion(versionString);
        },
        retry: false,
    };
}

export function getMatchVersionQuery(version: Version, constraintString: string): QueryOptions<string[], Error> {
    return {
        queryKey: ['matchVersion', version, constraintString],
        queryFn: async (): Promise<string[]> => {
            return matchVersion(version, constraintString);
        },
        retry: false,
    };
}
