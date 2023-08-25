package main

import (
	"fmt"
	"syscall/js"
)

func helloWorld() js.Func {
	return js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		fmt.Println("Hello World")
		return nil
	})
}

func main() {
	ch := make(chan struct{}, 0)
	js.Global().Set("helloWorld", helloWorld())
	<-ch
}
