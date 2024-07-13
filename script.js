// Variables.

const scriptDataString = ["Microsoft&reg; Windows&trade; 95", "Microsoft&reg; Plus!", "Microsoft&reg; Office&trade; 95", "Microsoft&reg; Flight Simulator&trade;", "Microsoft&reg; Arcade"];
const scriptDataNumber = [75, 50, 60, 45, 20];
const scriptTax = 0.13;

var scriptUserNameString = "User";
var scriptUserDataValue = [0, 0, 0, 0, 0];
var scriptUserDataValueSubtotal= 0;
var scriptUserDataValueTotal = 0;
var scriptUserTaxValue = 0;

// Methods and Functions.

/** Function to perform operations when the page loads. */
function onLoad() {
    document.getElementById("StyleContainer1DynamicElementButton").style.display = "none";
    document.getElementById("StyleContainer2").style.display = "none";
}

/** Function to check the data and modify the StyleContainer1 elements based on it. */
function refreshStyleContainer1(index, value) {
    if (value == 0) {
        document.getElementById(`StyleContainer1BodyTableData${index}`).innerHTML = "";
    } else {
        document.getElementById(`StyleContainer1BodyTableData${index}`).innerHTML = "×&nbsp;" + value;
    }
    let isDataEmpty = true;
    for (let index = 0; index < scriptUserDataValue.length; index++) {
        if (scriptUserDataValue[index] != 0) {
            isDataEmpty = false;
            break;
        }
    }
    if (isDataEmpty == true) {
        document.getElementById("StyleContainer1DynamicElementButton").style.display = "none";
    } else {
        document.getElementById("StyleContainer1DynamicElementButton").style.display = "block";
    }
}

/** Function to set the data when user clicks on the Add to Cart button. */
function setData(index) {
    let value = window.prompt("Enter quantity (Maximum 100). To remove, enter 0:", 1);
    while (isNaN(value) || value % 1 != 0 || value < 0 || value > 100) {
        value = window.prompt("Invalid quantity. Enter quantity between 1 and 100, in whole numericals. To remove, enter 0:", 1);
    }
    value = Math.round(value);
    scriptUserDataValue[index] = scriptDataNumber[index] * value;
    refreshStyleContainer1(index, value);
}

/** Function to display the information after calculating the data. */
function displayInformation() {
    document.getElementById("StyleContainer2DynamicElement").innerHTML = "";
    let render = `
    <table id="StyleContainer2DynamicElementTable">
    <tbody>
    <tr>
    <td id="StyleContainer2DynamicElementTable" colspan="3">Name:&nbsp;<strong>${scriptUserNameString}</strong></td>
    </tr>
    `;
    let isDataEmpty = true;
    for (let index = 0; index < scriptDataString.length; index++) {
        if (scriptUserDataValue[index] != 0) {
            render += `
            <tr>
            <td id="StyleContainer2DynamicElementTable" width="256px">${scriptDataString[index]}<br>&dollar;${scriptDataNumber[index]}</td>
            <td id="StyleContainer2DynamicElementTable" width="48px" align="center">×&nbsp;${scriptUserDataValue[index] / scriptDataNumber[index]}</td>
            <td id="StyleContainer2DynamicElementTable" width="56px" align="right">&dollar;${scriptUserDataValue[index]}</td>
            </tr>
            `;
            isDataEmpty = false;
        }
    }
    if (isDataEmpty == true) {
        render += `
        <tr>
        <td id="StyleContainer2DynamicElementTable" width="256px"><em>Shopping Cart is Empty.</em></td>
        </tr>
        `;
    } else {
        render += `
        <tr>
        <td id="StyleContainer2DynamicElementTable" colspan="2">Subtotal:</td>
        <td id="StyleContainer2DynamicElementTable" align="right">&dollar;${scriptUserDataValueSubtotal}</td>
        </tr>
        <tr>
        <td id="StyleContainer2DynamicElementTable" colspan="2">GST &commat; 13&percnt;</td>
        <td id="StyleContainer2DynamicElementTable" align="right">&dollar;${scriptUserTaxValue}</td>
        </tr>
        <tr>
        <td id="StyleContainer2DynamicElementTable" colspan="2">Total:</td>
        <td id="StyleContainer2DynamicElementTable" align="right"><strong>&dollar;${scriptUserDataValueTotal}</strong></td>
        </tr>
        `;
    }
    render += `
    </tbody>
    </table>
    `;
    document.getElementById("StyleContainer2DynamicElement").innerHTML += render;
    document.getElementById("StyleContainer2").style.display = "block";
}

/** Function to calculate the data upon clicking the Purchase button. */
function calculateData() {
    scriptUserNameString = window.prompt("Enter your name:", "User");
    while (scriptUserNameString == "" || scriptUserNameString == null || scriptUserNameString.length > 16) {
        scriptUserNameString = window.prompt("Invalid name. Enter your name under 16 characters:", "User");
    }
    scriptUserDataValueSubtotal = 0;
    for (let index = 0; index < scriptDataString.length; index++) {
        if (scriptUserDataValue[index] != 0) {
            scriptUserDataValueSubtotal += scriptUserDataValue[index]; 
        }
    }
    scriptUserTaxValue = Math.round(scriptUserDataValueSubtotal * scriptTax);
    scriptUserDataValueTotal = Math.round(scriptUserDataValueSubtotal + scriptUserTaxValue);
    displayInformation();
}

/** Function to clear the data and resetting StyleContainer1 elements upon clicking the Clear button. */
function clearData() {
    scriptUserNameString = "User";
    scriptUserDataValue = [0, 0, 0, 0, 0];
    scriptUserDataValueSubtotal = 0;
    scriptUserDataValueTotal = 0;
    scriptUserTaxValue = 0;
    for (let index = 0; index < scriptDataString.length; index++) {
        document.getElementById(`StyleContainer1BodyTableData${index}`).innerHTML = "";
    }
    document.getElementById("StyleContainer1DynamicElementButton").style.display = "none";
}

/** Function to clear and hide the StyleContainer2 element. */
function closeStyleContainer2() {
    document.getElementById("StyleContainer2DynamicElement").innerHTML = "";
    document.getElementById("StyleContainer2").style.display = "none";
}