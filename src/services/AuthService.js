import axios from 'axios';
const baseUrl = process.env.REACT_APP_BASE_URL;
const userDetails = JSON.parse(localStorage.getItem('userDetails'));
// export function signUp(email, password,schoolName)
//  {
//     //axios call
//     const userName =email.split('@')[0]; //Get username from email address
//     const ipaddress= "127.0.0.1";

//     const postData = {
//           email:email,
//           password:password,
//           username:userName,
//           ipaddress:ipaddress,
//           name:schoolName,
//           returnSecureToken: true,
       
//     };

//            return axios.post(`${baseUrl}register/`, postData);
//         }

export function login(email, password) {
    const postData = {
        username:email,
        password:password,
        returnSecureToken: true,
    };

    return axios.post(`${baseUrl}login/`, postData);
}

export function uploader(file, path, userID,createdBy) {
    
    var headers   = {'Content-Type': 'multipart/form-data', 'Authorization':'Token ' + `${userDetails.token}`};
    const postData = {
        file:file,
        userID:userDetails.userID,
        createdBy:createdBy,
        returnSecureToken: true,
    };

    return axios.post(`${baseUrl}${path}/`, postData,{headers});
}

export function saveServices(userData, path) {
    
    var headers   = {'Content-Type': 'multipart/form-data','Authorization':'Token ' + `${userDetails.token}`};

    return axios.post(`${baseUrl}${path}/`, userData,{headers});
}

export function getServices(path) {
    return axios.get(`${baseUrl}${path}`);
}

// export function getformatSuccess(Response) 
// {
//     switch (Response.message) 
//     {
//         case 'FETCH_SUCCESS':
//               swal("Alert", "Upload Successfully", "success",{ button: "Success",});
//               break;
//         case 'SAVED_SUCCESS':
//                 swal("Alert", "Record Saved Successfully", "success",{ button: "Success",});
//                 break;
//         case 'ALREADY_EXIST':
//                     swal("Alert", Response.error, "warning",{ button: "Warning",});
//                     break;
//         case 'COMPARE_ERROR':
//                         swal("Alert", Response.error, "warning",{ button: "Warning",});
//                         break;
//         case 'NOT_FOUND':
//                     swal("Alert", Response.error, "warning",{ button: "Warning",});
//                     break;
//         case 'NOT_ACTIVATED':
//                 swal("Alert", Response.error, "warning",{ button: "Warning",});
//                 break;
//         case 'SERVER_ERORR':
//                     swal("Alert", Response.error, "error",{ button: "Server Error",});
//                     break;    
                                
//         default:
//             return '';
//     }
// }


// export function formatSuccess(Response) 
// {
    
//     switch (Response.message) 
//     {
//         case 'UPLOAD_SUCCESS':
//               swal("Alert", "Upload Successfully", "success",{ button: "Success",});
//               break;
//         case 'SAVED_SUCCESS':
//                 swal("Alert", "Record Saved Successfully", "success",{ button: "Success",});
//                 break;
//         case 'ALREADY_EXIST':
//                     swal("Alert", Response.error, "warning",{ button: "Warning",});
//                     break;
//         case 'NOT_FOUND':
//                     swal("Alert", Response.error, "warning",{ button: "Warning",});
//                     break;
//         case 'NOT_ACTIVATED':
//                swal("Alert", Response.error, "warning",{ button: "Warning",});
//                break;
//         case 'SERVER_ERORR':
//                     swal("Alert",Response.error , "error",{ button: "Server Error",});
//                     break;    
                                
//         default:
//             return '';
//     }
// }

// export function formatError(errorResponse) 
// {
//     console.log(errorResponse.message);
//     switch (errorResponse.message) 
//     {
//         case 'EMAIL_EXISTS':            
//             swal("Oops", "Email already exists", "error");
//             break;
//         case 'EMAIL_NOT_FOUND':
//            swal("Oops", "Email not found", "error",{ button: "Try Again!",});
//            break;
//         case 'INVALID_PASSWORD':
//             swal("Oops", "Invalid Crediential", "error",{ button: "Try Again!",});
//             break;
//         // case 'USER_DISABLED':
//         //     return 'User Disabled';
//         //     break;
//         case 'NOT_ACTIVATED':
//                 swal("Alert", errorResponse.error, "error",{ button: "Warning",});
//                 break;
//         case 'UPLOAD_SUCCESS':
//               swal("Oops", "Upload Successfully", "success",{ button: "Success",});
//               break;

//         default:
//             return '';
//     }
// }




export function saveTokenInLocalStorage(tokenDetails) {
    //console.log("Saving toke" + tokenDetails.token);
    tokenDetails.expireDate = new Date(
        new Date().getTime() + tokenDetails.expiresIn * 1000,
    );
    localStorage.setItem('userDetails', JSON.stringify(tokenDetails));
}

// export function runLogoutTimer(dispatch, timer, navigate) {
//     setTimeout(() => {
//         //dispatch(Logout(history));
//         dispatch(Logout(navigate));
//     }, timer);
// }

// export function checkAutoLogin(dispatch, navigate) {
  
//     const tokenDetailsString = localStorage.getItem('userDetails');
//     let tokenDetails = '';
//     if (!tokenDetailsString) {
//         dispatch(Logout(navigate));
// 		return;
//     }

//     tokenDetails = JSON.parse(tokenDetailsString);
//     let expireDate = new Date(tokenDetails.expireDate);
//     let todaysDate = new Date();

//     if (todaysDate > expireDate) {
//         dispatch(Logout(navigate));
//         return;
//     }
		
//     dispatch(loginConfirmedAction(tokenDetails));
	
//     const timer = expireDate.getTime() - todaysDate.getTime();
//     runLogoutTimer(dispatch, timer, navigate);
// }

export function isLogin() {
    const tokenDetailsString = localStorage.getItem('userDetails');

    if (tokenDetailsString) {
        return true;
    }else{
        return false;
    }
}

