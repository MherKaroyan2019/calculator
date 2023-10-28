function calc (){
    let val = document.getElementById("value").value;

    let err = "Write correct";

    let valRemove = val.split("");

    let brackets = [];

    let splcieArea;
    
    for(let i = 0; i < valRemove.length; i++){
        if(valRemove[i] == "("){
            brackets[0] = i;
        }else if(valRemove[i] == ")"){
            brackets[1] = i;
        }

        if(brackets[0] != undefined && brackets[1] != undefined){
            splcieArea = valRemove.splice(brackets[0],brackets[1] - brackets[0] + 1)

            let areaValue = calcArea(splcieArea.slice(1,splcieArea.length-1).join(""))[0]

            if(areaValue == err){
                return err
            }else {
                valRemove.splice(brackets[0], 0, areaValue)
                brackets = [];
                i = -1;
            }
        }
    }

    if((brackets[0] == undefined && brackets[1] != undefined) || (brackets[1] == undefined && brackets[0] != undefined)){
        return err;
    }else if(calcArea(valRemove.join("")) == err){
        val = err;
    }else{
        val = +calcArea(valRemove.join(""))
    }





    document.getElementById("result").innerHTML = val;
}

function calcArea(area){
    let areas = area.split("");

    let value = "";

    let values = [];

    console.log()

    for(let i = 0; i < areas.length; i++){
        if(areas[i] != " " && isNaN(+(value + areas[i])) == false){
            value += areas[i];
            if(areas[i + 1] == " " || isNaN(+(value + areas[i + 1])) == true){
                console.log(value, 99988988880)
                values.push(value);
                value = "";
            }
        }else if(isNaN(+areas[i]) == true && areas[i] != " "){
            if(areas[i] == "+" || areas[i] == "-" || areas[i] == "/" || areas[i] == "*"){
                values.push(areas[i]);
            }else {
                value += areas[i];
                if((areas[i + 1] == "+" || areas[i + 1] == "-" || areas[i + 1] == "/" || areas[i + 1] == "*") || (isNaN(+areas[i + 1]) == false || i == areas.length - 1)){
                    values.push(value);
                    value = "";
                }
            }
        }
    }

    for(let i = 0; i < values.length; i++){
        if(values[i] == "-" || values[i] == "minus"){
            if(isNaN(+values[i-1]) == true && isNaN(+values[i+1]) == false){
                values[i] = "-" + values[i+1]
                values.splice(i + 1, 1)
            }
        }
    }

    console.log(values)

    if(findErr(values) == true){
        return "Write correct";
    }

    for(let i = 0; i < values.length; i++){
        if(values[i] == "multiply" || values[i] == "*"){
            values[i - 1] = +values[i-1] * +values[i+1];
            values.splice(i, 2);
            i = i - 1;
        }else if(values[i] == "divide" || values[i] == "/" || values[i] == ":"){
            values[i - 1] = +values[i-1] / +values[i+1];
            values.splice(i, 2);
            i = i - 1;
        }
    }

    for(let i = 0; i < values.length; i++){
        if(values[i] == "plus" || values[i] == "+"){

            values[i - 1] = +values[i-1] + +values[i+1];
            values.splice(i, 2);
            i = i - 1;
        }else if(values[i] == "minus" || values[i] == "-"){
            values[i - 1] = +values[i-1] - +values[i+1];
            values.splice(i, 2);
            i = i - 1;
        }
    }

    console.log(values)


    return values;

}

function findErr(arr){
    let values = arr;

    let isError = false;

    for(let i = 0; i < values.length; i++){
        if(isNaN(+values[i]) == false){
            if(isNaN(+values[i-1]) == false || isNaN(+values[i+1]) == false){
                isError = true;
            }
        }else if(values[i] == "+" || values[i] == "-" || values[i] == "/" || values[i] == "*" || values[i] == "multiply" || values[i] == "divide" || values[i] == "plus" || values[i] == "minus"){
            if(isNaN(+values[i - 1]) == true || isNaN(+values[i + 1]) == true){
                isError = true;
            }
        }else{
            isError = true;
        }
    }

    return isError;
}
