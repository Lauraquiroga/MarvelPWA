const { useState, useEffect } = require("react");

function Marvel() {
    
const [characters, setCharacters] = useState([]);
const publicApiKey = "ac8025fa5c5df6af259b9c92c9eef109";
///const privateApiKey = "0ac80e2e7dcb21a5c07aaac408b0352a92821fda";
const ts = "1";
const hash = "8ce517e87d9d8c3421ded0de0ae73003";

useEffect(()=>{
    if(!navigator.onLine){
        if(localStorage.getItem("marvel") === null) {
            setCharacters([])
        } else {
            setCharacters(localStorage.getItem("marvel").split(","));
        }
    } else {
        const URL = "https://gateway.marvel.com:443/v1/public/characters?ts="+ts+"&apikey="+publicApiKey+"&hash="+hash;
        
        fetch(URL).then(res=>res.json()).then(res=>{
            let list =[];
            const length = res.data.results.length;
            for (let i=0; i<length; i++){
                list.push(res.data.results[i].name);
            }
            setCharacters(list);
            localStorage.setItem("marvel", list);
        })
    }
}, []);

function infoCharacters(){
    let list =[];
    const length = characters.length;
    for (let i=0; i<length; i++){
        list.push(<li>{characters[i]}</li>);
    }
    return list;
}
  return (
    <div>
        <h1>Marvel Characters:</h1>
        <ul>{infoCharacters()}</ul>
    </div>
  );
}

export default Marvel;