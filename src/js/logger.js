/**
 * File:        logger.js
 * Author:      ////////
 * Created On:  07/09/2019
 * Description: /////////////////// 
**/

function LOGDEBUG(logTitle, logMessage)
{
    console.log("[!]DEBUG.\t" + logTitle + " " + logMessage);
}

function LOGINFO(logTitle, logMessage)
{
    console.log("[!]INFO.\t" + logTitle + " " + logMessage);
}

function LOGSUCCESS(logTitle, logMessage)
{
    console.log("[+]SUCCESS.\t" + logTitle + " " + logMessage);
}

function LOGERROR(logTitle, logMessage)
{
    console.log("[-]ERROR.\t" + logTitle + " " + logMessage);
}