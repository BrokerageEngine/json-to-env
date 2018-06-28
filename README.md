# json-to-env
> Convert json to key-value environment pairs

Note, this is my own fork to match our `.env` file formats. Find the original at [ralucas/json-to-env](https://github.com/ralucas/json-to-env).

## Install

```sh
$ npm install --save json-to-env
```

## Usage

Or run it from this directory:

```sh
$ node index.js <inputfile.json> <outputfile.config> <options>
```

## How it works
Given an json input file it will output a text file of your naming, e.g.

input example:

```
{
"test1": "a test",
"testTheTest": "another test",
"nested": {
  "test3": "hello",
  "a_new_one": "goodbye"  
}
```

output:
```
TEST1=a test
TEST_THE_TEST=another test
NESTED_TEST3=hello
NESTED_A_NEW_ONE=goodbye
```

## License

Unlicense © [R.A. Lucas](ralucas.github.io)
