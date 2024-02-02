var BaseURL = "http://api.login2explore.com:5577";
var IML = "/api/iml";
var IRL = "/api/irl";
var schoolDB = "School-DB";
var studentRel = "Student-Enrolment-Info";
var TOKEN = "90931763|-31949307841834406|90962950";


$("#rollno").focus();


function SAVE_REC(jsonObj)
{
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem("recno", lvData.rec_no);
}

function GET_ROLL_NO()
{
    var rollno = $("#rollno").val();
    var jsonStr = { 
              rollno: rollno
    };
    
    return JSON.stringify(jsonStr);
}

function FILL_FIELDS(jsonObj)
{
    SAVE_REC(jsonObj);
    var record = JSON.parse(jsonObj.data).record;
    console.log(record);
    $("#rollno").val(record.rollno);
    $("#fullname").val(record.fullname);
    $("#classin").val(record.classin);
    $("#address").val(record.address);
    $("#dob").val(record.dob);
    $("#enrolldate").val(record.enrolldate);
    
}

function RESET()
{
    $("#rollno").val("");
    $("#fullname").val("");
    $("#classin").val("");
    $("#address").val("");
    $("#dob").val("");
    $("#enrolldate").val("");
    $("#rollno").prop("disabled",false);
    $("#save").prop("disabled",true);
    $("#update").prop("disabled",true);
    $("#reset").prop("disabled",true);
    
    $("#rollno").focus();
    
    
    
}

function SAVE_STUDENT()
{
    var jsonStrObj = VALIDATE_THE_FIELDS();
    if(jsonStrObj === " ")
    {
        return "";
    }
    
    var putRequest = createPUTRequest(TOKEN,jsonStrObj,schoolDB, studentRel);
       alert(putRequest);
    jQuery.ajaxSetup({async : false});
    
    var resJosObj = executeCommandAtGivenBaseUrl(putRequest,BaseURL,IML);
     alert(JSON.stringify(resJosObj));
    jQuery.ajaxSetup({async : true});
    resetData();
    
    $("#rollno").focus();
    
    
}

function VALIDATE_THE_FIELDS()
{
    
    var rollno, fullname, classin, address, dob, enrolldate;
    
    rollno = $("#rollno").val();
    fullname =  $("#fullname").val();
    classin = $("#classin").val();
    address = $("#address").val();
    dob = $("#dob").val();
    enrolldate = $("#enrolldate").val();
    
    if(rollno.trim === " ")
    {
        alert("Roll Number is missing");
        $("#rollno").focus();
        return " ";
    }
    
    if(fullname.trim === "")
    {
        alert("Full Name is missing");
        $("#fullname").focus();
        return " ";
    }
    
    if(classin.trim === "")
    {
        alert("Class is missing");
        $("#classin").focus();
        return " ";
    }
    
    if(address.trim === "")
    {
        alert("Address is missing");
        $("#address").focus();
        return " ";
    }
    
    if(dob === " ")
    {
        alert("Date of Birth is missing");
        $("#dob").focus();
        return " ";
    }
    
    if(enrolldate === " ")
    {
        alert("Date of Enrollnment is missing");
        $("#enrolldate").focus();
        return " ";
    }
    
    var jsonStrObj = {
        
        rollno: rollno,
        fullname: fullname,
        classin: classin,
        address: address,
        dob: dob,
        enrolldate: enrolldate
    };
        return JSON.stringify(jsonStrObj);
    }
    
    function UPDATE_STUDENT()
    {
        $("#update").prop("disabled",true);
        var jsonUpdate = VALIDATE_THE_FIELDS();
        
        var updateRequest = createUPDATERecordRequest(TOKEN,jsonUpdate,schoolDB, studentRel,localStorage.getItem("recno"));
        
         jQuery.ajaxSetup({async: false});
         
         var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest,BaseURL,IML);
         
         jQuery.ajaxSetup({async: true});
         
         console.log(resJsonObj);
         resetData();
         $("#rollno").focus();
         
         
    }
    
    function GET_INFO()
    {
        var studrollJsonObj= GET_ROLL_NO();
        var getRequest = createGET_BY_KEYRequest(TOKEN,schoolDB,studentRel,studrollJsonObj,false,false);
        jQuery.ajaxSetup({async : false});
        
        var resJsonObj = executeCommandAtGivenBaseUrl(getRequest,BaseURL,IRL);
        
        jQuery.ajaxSetup({async: true});

        console.log(resJsonObj.status)
        
            
         if(resJsonObj.status === 200)
        {
            $("#rollno").prop("disabled",true);
             FILL_FIELDS(resJsonObj);
            
             $("#update").prop("disabled",false);
            
            $("#reset").prop("disabled",false);

            $("#fullname").focus();  
        }   
        else{
            
                $("#save").prop("disabled",false);
                
                $("#reset").prop("disabled",false);
    
                $("#fullname").focus();
            
        }
    }
    
    