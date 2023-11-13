import rehypeKatex from 'rehype-katex'
import rehypeStringify from 'rehype-stringify'
import remarkMath from 'remark-math'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import {read, write} from 'to-vfile'
import {unified} from 'unified'
import remarkGfm from 'remark-gfm'
import fs from 'fs';
import path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INPUT_FILE = 'input.md';
const OUTPUT_FILE = 'output.txt';
const outputPath = path.join(__dirname, OUTPUT_FILE);
const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype)
    .use(rehypeKatex)
    .use(rehypeStringify)
    .process(await read(INPUT_FILE))

console.log(String(file));

fs.writeFile(outputPath, String(file), err => {
    if (err) {
        console.error(err);
    }
    // file written successfully
})

// Save the result to a file in the same directory
await write({ path: OUTPUT_FILE, contents: file });
