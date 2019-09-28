/**
 * File:        helper.js
 * Author:      ////////
 * Created On:  09/09/2019
 * Description: /////////////////// 
**/

function createLineBreak(htmlDOMParent)
{
    /**
     * @summary
     * Function to create a line break via JavaScript
     * 
     * @author
     * Anonymous
     * 
     * @param htmlDOMParent
     * The HTML DOM parent element under which the menu will be created
     */

    var breakLine = document.createElement("BR");
    document.getElementById(htmlDOMParent).appendChild(breakLine);
}

function createButton(buttonId, buttonValue, htmlDOMParent) {
    /**
     * @summary
     * Function to create button through JavaScript
     * 
     * @author
     * Anonymous
     * 
     * @param buttonId
     * The id of button to bind
     * 
     * @param buttonValue
     * The name/value of button to display
     * 
     * @param htmlDOMParent
     * The HTML DOM parent element under which the button will be created
     */

    LOGDEBUG("createButton().", "createButton() called.");

    createLineBreak(htmlDOMParent);

    var button = document.createElement("INPUT");
    button.type = "button";
    button.id = buttonId;
    button.value = buttonValue;
    document.getElementById(htmlDOMParent).appendChild(button);
}

function addText(text, htmlDOMParent)
{
    /**
     * @summary
     * Function to fetch value of any DOM element (if it is defined). Else returns 'undefined'
     * 
     * @author
     * Anonymous
     * 
     * @param text
     * The id of DOM element
     * @param htmlDOMParent
     */

    createLineBreak(htmlDOMParent);
    document.getElementById(htmlDOMParent).innerHTML += text;
}

function inputNumberBox(numberBoxId, htmlDOMParent)
{
    /**
     * @summary
     * Function to fetch dimension number from HTML and call function to make new fields which take vector values
     * 
     * @author
     * Anonymous
     * 
     * @param numberBoxId
     * The id of number box
     * @param htmlDOMParent
     * 
     * @returns
     * The DOM element for customization
     */

    createLineBreak(htmlDOMParent);
    var numberBoxInput = document.createElement("INPUT");
    
    // If numberBoxInput object is returned by reference then it must set the following 2 properties as constant.
    // Figure out how to do that.
    numberBoxInput.type = "number";
    numberBoxInput.id = numberBoxId;
    document.getElementById(htmlDOMParent).appendChild(numberBoxInput);

    return numberBoxInput;
}

function getElement(domId)
{
    /**
     * @summary
     * Function to fetch value of any DOM element (if it is defined). Else returns 'undefined'
     * 
     * @author
     * Anonymous
     * 
     * @param domId
     * The id of DOM element
     * 
     * @returns
     * The DOM element
     */

    return document.getElementById(domId);
}

function getValue(domId)
{
    /**
     * @summary
     * Function to fetch value of any DOM element (if it is defined). Else returns 'undefined'
     * 
     * @author
     * Anonymous
     * 
     * @param domId
     * The id of DOM element
     * 
     * @returns
     * The value of DOM element
     */

    return document.getElementById(domId).value;
}

function createCanvas(domId, width, height)
{
    LOGDEBUG("createCanvas().", "createCanvas() called.");
    
    var canvas = document.createElement("CANVAS");
    canvas.id = domId;
    canvas.width = width;
    canvas.height = height;
    document.body.appendChild(canvas);
} 

function clearElement(elementId)
{
    document.getElementById(elementId).innerHTML = '';
}