const http = require('http');
const fs = require('fs');
const server = http.createServer((req,res)=>{
    const url = req.url;
    if(url ==='/'){
        res.setHeader('Content-Type','text/html');
        res.end(
            `<form action="/message" method ="post">
             
            <label>Name</label>
            <input type="text" name ="Username"/>
            <button type="submit">Add</button>
            </form>
            `
        )
    }else if(url ==='/message'){
        // if(url ==='/message'){
        //     console.log('message url hit')
        //     res.end(`<h1>Hello from mesaage</h1>`)
        // }
        res.setHeader('Content-Type','text/html');
         let dataChunk =[];
         req.on('data',(chunks)=>{
            console.log(chunks);
            dataChunk.push(chunks);
         })
         req.on('end',()=>{
            let buffer = Buffer.concat(dataChunk);
            console.log(buffer);
            let formData = buffer.toString();
            console.log(formData);

            const formValue = formData.split('=')[1];
            fs.writeFile('formValues.txt',formValue,(err)=>{
                res.statusCode=302;
                res.setHeader('Location','/')
                res.end()
            })
         })

    }
})
server.listen(3000,()=>{
    console.log('Server is running');
})