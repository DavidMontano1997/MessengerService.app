import ROUTE from "./modules/route.js";

document.addEventListener("DOMContentLoaded", Main);

function Main(){

    window.addEventListener("hashchange", (e) => {
        const hash = window.location.hash;
        const view = hash.split("/")[1];
        console.log(view);
        
        if(views in ROUTE){
            // fetch(ROUTE.views)
            // .then((Response) => Response.ok ? Response.text() : console.error(Response.statusText))
            // .then((html) => {
            //     document.querySelector(".col-content-section").innerHTML = html;
            // })
            console.log(ROUTE.view);
        } else {
            console.log("error");
        }
    
    });


       
        

    // console.log(ROUTE);
};