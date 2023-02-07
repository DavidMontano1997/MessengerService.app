function cifrar(string){
    const codigo = [
    ["a","c"],
    ["c","d"],
    ["d",5],
    ["e",4],
    ["i",8],
    ["k",10],
    ["l",22],
    ["m",6],
    ["n",44],
    ["o",3],
    ["r",17],
    ["s",18],
    ["t",19],
    ["y",7],
    ["SPACE", " "] ];

    const GetrArray     = DefinirEspacios(ParseString(string)); // Organizando letras en base al orden del alfabeto
    const RespuestaDeBD = BuscandoLetrasBD(GetrArray); // Buscando letras en la base de datos cifrada
    const FraseCifrada  = EstructurandoPalabra(RespuestaDeBD); // Estructurando palabra
    
    function EstructurandoPalabra(RespuestaDeBD){
        const copy_string = string.split("");
        let otro_array = [];

        copy_string.forEach((letter) => { 
            if(letter === " "){
                letter = "SPACE";
            }

            let coinicdencia2 = RespuestaDeBD.find( code_letter => {
                if(code_letter[0] === letter) {
                    return code_letter[1];
                };
            });

            otro_array.push(coinicdencia2[1]);
            // let coinicdencia2 = nuevoArray.find( code_letter => {
            //     console.log(code_letter);

            //     if(code_letter[0] === letter) {
            //         return code_letter[1];
            //     };
            // });
        });

        return otro_array;
    };

    function BuscandoLetrasBD(array){
        const nuevoArray = [];

        array.forEach(letter => { 
            let coinicdencia =  codigo.find( code_letter => code_letter[0] === letter);
            nuevoArray.push(coinicdencia);
        });

        return nuevoArray;
    }

    function DefinirEspacios(array){
        return array.map(letter => letter === " " ? "SPACE" : letter);
    };

    function ParseString(string){
        return string.split("").sort();
    };

    return FraseCifrada.join("");
};

const erick = cifrar("erick y dylan toman tete todo los dias"); 
console.log(erick);