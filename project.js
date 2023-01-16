console.log('This is JS Part of Our Project');
// Hide The Parameter Box initially : -
const parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = 'none';
// Initialize No. of Parameter : -
let addedParamCount = 1;
// Utility Function : -
// 1. Utility Function to get DOM element from string : -
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}
const paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'none';
    document.getElementById('parametersBox').style.display = 'block';
})
const jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
    document.getElementById('parametersBox').style.display = 'none';
    document.getElementById('requestJsonBox').style.display = 'block';
})
let addParam = document.getElementById('addParam');
addParam.addEventListener('click', () => {
    addedParamCount += 1;
    let params = document.getElementById('params');
    let string = `<div class="form-row">
                    <label for="URL" class="col-sm-2 col-form-label">Parameter${addedParamCount}</label>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterKey${addedParamCount}"
                            placeholder="Enter Your Parameter${addedParamCount} key">
                    </div>
                    <br>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterValue${addedParamCount}"
                            placeholder="Enter Your Parameter${addedParamCount} value">
                    </div>
                    <br>
                     <button class="btn btn-primary deleteParam" >Delete Parameter</button>
                </div>`
    // convert the element string to DOM node : -
    let paramElement = getElementFromString(string);
    // console.log(paramElement);
    params.appendChild(paramElement);
    // Adding an eventListner to remove the parameter on clicking delete Parameter: -
    let deleteParam = document.getElementsByClassName('deleteParam');
    for (item of deleteParam) {
        item.addEventListener('click', (e) => {
            // TODO : add a confirmation button box to confirm a parameter deletion
            e.target.parentElement.remove();
        })
    }
})
// If User Click on Submit Button : -
let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    // Show Please Wait in the response box 
    // document.getElementById('responseJsonText').value = "Please Wait for a moment";
    document.getElementById('responsePrism').innerHTML = "Please Wait for a moment";
    // Fetch all the values user has entered
    let url = document.getElementById('url').value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;
    // Log all the values in the console for debugging
    // console.log('URL is ',url);
    // console.log('request Type',requestType);
    // console.log('content Type',contentType);
    // If the user has used some parameter instead of json, collect all the parameter in an object
    // console.log(addedParamCount);
    if (contentType == 'params') {
        data = {};
        for (let i = 0; i < addedParamCount; i++) {
            // console.log('for loop first line');
            // console.log(document.getElementById('parameterKey'+(i+1)));
            // console.log(document.getElementById('parameterValue'+(i+1)));
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value;
                console.log(data);
            }
        }
        data = JSON.stringify(data);
    }
    else {
        data = document.getElementById('requestJsonText').value;
    }
    console.log('URL is ', url);
    console.log('request Type', requestType);
    console.log('content Type', contentType);
    console.log('Data', data);
    // When request type is GET then fetch API to  a post request
    if(requestType == 'GET'){
        fetch(url,{
            method:'GET',
        })
        .then(response=> response.text())
        .then((text) =>{
            // document.getElementById('responseJsonText').value = text;
            document.getElementById('responsePrism').innerHTML = text;
            Prism.highlightAll();
        });
    }
    else{
        fetch(url,{
            method:'POST',
            body:data,
            headers:{
                "content-type":"application/json; charset=UTF-8"
            }
        })
        .then(response=> response.text())
        .then((text) =>{
            // document.getElementById('responseJsonText').value = text;
            document.getElementById('responsePrism').innerHTML = text;
            Prism.highlightAll();
        });
    }
})