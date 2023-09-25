const express = require('express');
const bodyParser = require('body-parser');
const fs=require('fs');
const { exec } = require('child_process');
const cors=require('cors');
const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.json());

app.post('/run', (req, res) => {
  const code = req.body.code
  const lang=req.body.mode;
 if(lang=='text/x-java')
 {
    const compilecmd='javac Main.java';
    const runcmd='java Main';
    fs.writeFileSync('Main.java',code);
    exec(compilecmd,(compileError) =>
    {
        if(compileError)
        {
            const errmsg=compileError.message || compileError.toString();
            res.json(`Compilation error: ${errmsg}`);
        }
        else{
            exec(runcmd,(runtimeerr,output) => {
                fs.unlinkSync('Main.java');
                 fs.unlinkSync('Main.class');
                if(runtimeerr)
                    {
                        res.json(runtimeerr)
                    }
                    else{
                        res.json(output)
                    }
            }
            )
        }
    })

 }
 else if(lang=='text/typescript'){
    try{
           fs.writeFileSync('temp.ts', code);
           exec('tsc temp.ts',(runtimeerr,output)=>
           {
    if(runtimeerr)
        {
            res.json(runtimeerr);
        }
           exec('node temp.js',(runtimrerr,output)=>
           {
            console.log(output)
            res.json(output);
            fs.unlinkSync('temp.ts');
            fs.unlinkSync('temp.js');
           });
        });
        }
        catch(e)
        {
            res.json(e.toString());
        }
    }
else{
    try{
    fs.writeFileSync('i.js', code);
    exec('node i.js',(runtimeerr,output)=>
    {
        if(runtimeerr)
        {
            res.json(runtimeerr);
        }

        res.json(output);
        fs.unlinkSync('i.js');
    });
    }
    catch(e)
    {
        res.json(e.toString());
    }

}}).listen(3000);
