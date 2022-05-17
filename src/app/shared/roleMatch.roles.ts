export function roleMatch(allowedRoles):boolean{
    var isMatch:boolean=false;


    
  var payload= "";

  if(localStorage.getItem('token')!=null)
  {
payload=JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));

  allowedRoles.forEach(element => {
       if(payload.hasOwnProperty(element))
        {

            isMatch=true;
            return false;
        }     
  });    




  }



    return isMatch;
  }


    
  /* 
  var payload=JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
   var UserRole=payload.role;
   
    
    allowedRoles.forEach(element => {
        if(UserRole==element)
        {
isMatch=true;
return false
        }
    });
    return isMatch;*/





  