// ==============================================
// NahdiScript IDE Demo
// ==============================================

const codeElement = document.getElementById("typing-code");
const outputElement = document.getElementById("typing-output");
const lineNumbers = document.getElementById("line-numbers");
const fileName = document.querySelector(".file-name");

const examples = [

{
file:"hello.ns",

code:
`let name = "Nahdi"

fn hello() {

    print(name)

}

hello()`,

output:"Nahdi"
},

{
file:"variables.ns",

code:
`let language = "NahdiScript"

print(language)`,

output:"NahdiScript"
},

{
file:"functions.ns",

code:
`fn welcome() {

    print("Welcome")

}

welcome()`,

output:"Welcome"
},

{
file:"conditions.ns",

code:
`let age = 18

if age >= 18 {

    print("Adult")

}`,

output:"Adult"
},

{
file:"loops.ns",

code:
`let i = 1

while i <= 5 {

    print(i)

    i = i + 1

}`,

output:
`1
2
3
4
5`
}

];

let currentExample = 0;

function sleep(ms){

    return new Promise(resolve=>setTimeout(resolve,ms));

}

function updateLines(text){

    const total = text.split("\n").length;

    let numbers = "";

    for(let i=1;i<=total;i++){

        numbers += i + "\n";

    }

    lineNumbers.textContent = numbers;

}

async function startTyping(){

    while(true){

        const ex = examples[currentExample];

        fileName.textContent = ex.file;

        codeElement.textContent = "";

        outputElement.textContent = "";

        updateLines(ex.code);

        for(const char of ex.code){

            const current = codeElement.textContent + char;

codeElement.textContent = current;

codeElement.innerHTML = highlight(current);

            await sleep(28);

        }

        await sleep(500);

        for(const char of ex.output){

            outputElement.textContent += char;

            await sleep(35);

        }

        await sleep(2500);

        currentExample++;

        if(currentExample >= examples.length){

            currentExample = 0;

        }

    }

}

window.onload = ()=>{

    startTyping();

};
// ==============================================
// NahdiScript Syntax Highlight
// ==============================================

function escapeHTML(text){

    return text
        .replace(/&/g,"&amp;")
        .replace(/</g,"&lt;")
        .replace(/>/g,"&gt;");

}

function highlight(code){

    let html = escapeHTML(code);

    // Keywords
    html = html.replace(
        /\b(let|const|fn|if|else|while|return|true|false)\b/g,
        '<span class="kw">$1</span>'
    );

    // print
    html = html.replace(
        /\b(print)\b/g,
        '<span class="func">$1</span>'
    );

    // Numbers
    html = html.replace(
        /\b(\d+)\b/g,
        '<span class="num">$1</span>'
    );

    // Strings
    html = html.replace(
        /"([^"]*)"/g,
        '<span class="str">"$1"</span>'
    );

    return html;

}
