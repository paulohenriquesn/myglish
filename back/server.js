const fs = require('fs');
const express = require('express');
const cors = require('cors')


const fileDictionary = fs.readFileSync('./dictionary.json');
const DictionaryFileParse = JSON.parse(fileDictionary);

function searchWord(word,json){
    console.log("Request...");
    if(word)
    {
        if(word in json){
            return json[word] ? json[word] : {} ;
        }
    }
}

const server = express();
server.use(cors())
server.use(express.json());
server.listen(8000,() => {console.log("Ok")});


server.get('/word/:word',(req,res) => res.json(searchWord(req.params.word,DictionaryFileParse)));
