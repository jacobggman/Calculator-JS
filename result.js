result = safeCalculate(valueAsStr);
  if (result.error)
  {
    display.value = result.error;
    valueAsStr = "";
  }
  else 
  {
    valueAsStr = result.result;
    updateView();
  }
}

class Result {
  #result
  #error
  #checkError

  constructor(result=undefined, error=undefined) {
    this.#result = result;
    this.#error = error;
    if (result && error)
    {
      throw Error("Can't have error and result together");
    }
    this.#checkError = false;
  }
  
  get error() {
    this.#checkError = true;
    return this.#error;
  }

  get result() {
    if (!this.#checkError)
    {
      throw Error("Didn't check the error")
    }
    if (!this.#error)
    {
      throw Error("Try to get result of error")
    }
    return this.#result;
  }
}

function safeCalculate(equation) {
  try {
    return Result(calculate(equation).toString());
  } catch (error) {
    if (error instanceof DivByZeroException)
    {
      return Result(error="Div by zero error");
    }
    else if (error instanceof CulcParseException || error instanceof TokenParseException )
    {
      return Result(error="Format error");
    }
    else if (error instanceof InfinityException)
    {
      return Result(error="Infinity");
    }
    console.error(error);
    return Result(error="Unexpected error");
  }
}