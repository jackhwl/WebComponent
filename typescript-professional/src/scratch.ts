// @ts-expect-error
const num1: number = 5 //'hello';
// @ts-ignore
const num2: number = 5 //'hello';

function somethingRisky() {}

function isError(err: any): err is Error {
    return err instanceof Error;
}

function assertIsError(err: any): asserts err is Error {
    if (!(err instanceof Error)) throw new Error(`Not an error: ${err}`);
}
try {
    somethingRisky();
} catch( err: unknown) {
    assertIsError(err);
    // if (isError(err) {
    //     console.log(err.stack);
    // } else {
        console.log(err);
     // }
}