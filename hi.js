
function stripComments (inputText) {

    var lines = inputText.split(/\r?\n/gm);

    var outputText = [];
    lines.forEach(
        (line) => {
            let aline = line.split('');
            let outline = [];

            let inq = 0;
            let c, cp = null;
            let hasc = false;

            for (let i=0; i<aline.length; i+=1) {

                c = aline[i];
                if (c === '"' && cp && cp !== '\\') {
                    inq += 1;
                }

                if (c === '/' && cp) {
                    if (cp === '/') {
                        if (inq % 2 === 0) {
                            hasc = true;
                            break;
                        }
                    }
                }
                outline.push(c);
                cp = c;
            }

            if (hasc) {
                outputText.push(outline.slice(0,outline.length-1).join(''));
            }
            else {
                outputText.push(outline.join(''));
            }
        });

    return outputText.join('\n');
}

function test () {

    var input = `
    {
    // some // comment here!
    "key1": "value1",
    "urls": ["https://example.com"] // another "LJL" comment
    }
    `;

    console.log('--INPUT-----------------------------------');
    console.log(input);
    console.log('--OUTPUT----------------------------------');
    console.log(JSON.stringify(JSON.parse(stripComments(input)),null,4));
}

test();
