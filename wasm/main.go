package main

import (
	"syscall/js"

	"github.com/Masterminds/semver/v3"
)

func versionToMap(version *semver.Version) map[string]any {
	return map[string]any{
		"original":   version.Original(),
		"major":      version.Major(),
		"minor":      version.Minor(),
		"patch":      version.Patch(),
		"prerelease": version.Prerelease(),
		"metadata":   version.Metadata(),
	}
}

func versionFromJsVal(version js.Value) *semver.Version {
	if version.IsUndefined() {
		return nil
	}
	return semver.New(
		uint64(version.Get("major").Int()),
		uint64(version.Get("minor").Int()),
		uint64(version.Get("patch").Int()),
		version.Get("prerelease").String(),
		version.Get("metadata").String(),
	)
}

func promisify(originalFunc func(this js.Value, args []js.Value) (any, error)) js.Func {
	return js.FuncOf(func(this js.Value, args []js.Value) any {
		handler := js.FuncOf(func(_ js.Value, innerArgs []js.Value) any {
			resolve := innerArgs[0]
			reject := innerArgs[1]

			go func() {
				result, err := originalFunc(this, args)
				if err != nil {
					errorConstructor := js.Global().Get("Error")
					errorObject := errorConstructor.New(err.Error())
					reject.Invoke(errorObject)
				} else {
					resolve.Invoke(js.ValueOf(result))
				}
			}()

			return nil
		})

		promiseConstructor := js.Global().Get("Promise")
		return promiseConstructor.New(handler)
	})
}

func parseVersionFunc(this js.Value, args []js.Value) (any, error) {
	version, err := semver.StrictNewVersion(args[0].String())
	if err != nil {
		return nil, err
	}
	return versionToMap(version), nil
}

func parseConstraintFunc(this js.Value, args []js.Value) (any, error) {
	constraint, err := semver.NewConstraint(args[0].String())
	if err != nil {
		return nil, err
	}

	return constraint.String(), nil
}

func matchVersion(this js.Value, args []js.Value) (any, error) {
	version := versionFromJsVal(args[0])
	if version == nil {
		return nil, nil
	}

	constraint, err := semver.NewConstraint(args[1].String())
	if err != nil {
		return nil, err
	}

	_, errors := constraint.Validate(version)

	errorStrings := make([]any, len(errors))
	for i, err := range errors {
		errorStrings[i] = err.Error()
	}

	return errorStrings, nil
}

func main() {
	ch := make(chan struct{}, 0)
	js.Global().Set("parseVersion", promisify(parseVersionFunc))
	js.Global().Set("parseConstraint", promisify(parseConstraintFunc))
	js.Global().Set("matchVersion", promisify(matchVersion))
	<-ch
}
