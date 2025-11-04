const sbtn = document.getElementById('submit_btn');
    const msg =  document.getElementById('message')
    
    async function execute_login_user() {
        try {
            
            
            const unamefield =  document.getElementById('username');
            const  pwdfield =  document.getElementById('password');
            let username;
            let password;
            if(unamefield) {
                console.log(unamefield.value)
                username =  unamefield.value;
            }
            if(pwdfield) {
                password =  pwdfield.value;
            }
            const client_inp =  document.getElementById('client_id');
            const resp_inp =  document.getElementById('response_id');
            const scope_inp =  document.getElementById('scope');
            const redir_inp =  document.getElementById('redirect_uri');
            const code_inp = document.getElementById('code_challenge');
            const state_inp = document.getElementById('state');
            const offline_access_inp = document.getElementById('offline_access');
            const nonce_inp = document.getElementById('nonce');
            const challenge_methode = document.getElementById('challenge_method');
            const client_id =  client_inp?.value;
            const response_type =  resp_inp?.value;
            const scope =  scope_inp?.value;
            const redirect_uri = redir_inp?.value;
            const code_challenge =  code_inp?.value;
            const code_challenge_method =  challenge_method?.value;
            const state =  state_inp?.value;
            const nonce = nonce_inp?.value;
            const offline_access = offline_access_inp?.value === 'yes' ? true : false;
            const formdata = {username, password, client_id, response_type, scope, redirect_uri, code_challenge, code_challenge_method, state, nonce, offline_access};
            console.log(offline_access_inp?.value)
            console.log(formdata);
            const API="/api/authorize/login";
            const res = await  fetch(API, {method: "POST",  body: JSON.stringify(formdata), headers: {"content-type": "application/json"}});
            if(!res.ok) {
               throw new Error('Could not log you in.');
            }
            unamefield.value = '';
            pwdfield.value = '';
            const d =  await res.json();        
            
                
                const login_id_inp =  document.getElementById('loginid');
                if(login_id_inp) {
                    login_id_inp.value = d.id;
                }
                if(d.id) {
                    const lgform = document.getElementById('lg-form');
                    if(lgform) {
                    const tfac =  document.getElementById('factor');
                    
                
                    if(tfac) {
                        lgform.style.display = 'none';
                        
                        tfac.style.display =  'flex'
                    }
                    }
                }
                
                
                // console.log(data);
                
           

        } catch(ex) {
            console.log(ex);
            msg.innerHTML = 'Could not log you in. Please try again';
            
        }
    }
    if(sbtn) {
        sbtn.onclick = (e) => {
            
            e.preventDefault();
            execute_login_user();
        }
    }
    const codebtn =  document.getElementById('code_btn');
    if(codebtn) {
        
        codebtn.onclick = (e) => {
            
            e.preventDefault();
            TwoFactor();
        }
    }

const TwoFactor = async () => {
     const tinp = document.getElementById('tfa-message'); 
        try {
           if(tinp) {
              tinp.innerHTML = '';
           }
            const API = '/api/authorize/twofactor';
            const authcode_inp =  document.getElementById('authcode');
            const resp_inp =  document.getElementById('response_id');
            const scope_inp =  document.getElementById('scope');
            const client_inp =  document.getElementById('client_id');
            const redir_inp =  document.getElementById('redirect_uri');
            const code_inp = document.getElementById('code_challenge');
            const nonce_inp = document.getElementById('nonce');
            const state_inp = document.getElementById('state');
            const login_id_inp =  document.getElementById('loginid');
            const challenge_methode = document.getElementById('challenge_method');
            const offline_access_inp = document.getElementById('offline_access');
            const client_id =  client_inp?.value;
            const response_type =  resp_inp?.value;
            const scope =  scope_inp?.value;
            const redirect_uri = redir_inp?.value;
            const code_challenge =  code_inp?.value;
            const code_challenge_method =  challenge_method?.value;
            const nonce = nonce_inp?.value;
            const state =  state_inp?.value;
            const authcode =  authcode_inp.value;
            const loginid = login_id_inp?.value;
            const offline_access =  offline_access_inp?.value === 'yes' ? true : false;
            const data = {authcode, client_id, scope, redirect_uri, code_challenge, code_challenge_method, state, loginid, nonce, offline_access}
            authcode_inp.value = '';
            
        
            const res = await fetch(API, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                'Content-Type': 'application/json'
                }
            });

            if(!res.ok) {
                throw new Error('Incorrect code');
            }
        console.log(res);
           const tfac =   document.getElementById('factor');
           if(tfac) {
              tfac.style.display = 'none'
           }
          
          
            
           
            if(res.redirected) {
                window.location.href =  res.url;
            } else {

                const data =  await res.json();
                if(data.consentrequired) {
                const cst =  document.getElementById('consent-section');
                cst.style.display = 'flex'
                }
                
            }
            

            
        } catch(ex) {
           
            if(tinp) {
               tinp.innerHTML = ex.message;
            }
        }
    }


    const get_consent = async(accepted) => {
       try {
        const API = '/api/authorize/consent';
       
        const resp_inp =  document.getElementById('response_id');
        const scope_inp =  document.getElementById('scope');
        const client_inp =  document.getElementById('client_id');
        const redir_inp =  document.getElementById('redirect_uri');
        const code_inp = document.getElementById('code_challenge');
        const nonce_inp = document.getElementById('nonce');
        const state_inp = document.getElementById('state');
        const login_id_inp =  document.getElementById('loginid');
        const challenge_methode = document.getElementById('challenge_method');
        const offline_access_inp = document.getElementById('offline_access');
        const client_id =  client_inp?.value;
        const response_type =  resp_inp?.value;
        const scope =  scope_inp?.value;
        const redirect_uri = redir_inp?.value;
        const code_challenge =  code_inp?.value;
        const code_challenge_method =  challenge_method?.value;
        const nonce = nonce_inp?.value;
        const state =  state_inp?.value;
       
        const loginid = login_id_inp?.value;
        const offline_access =  offline_access_inp?.value === 'yes' ? true : false;
        const data = {client_id,redirect_uri, accepted, code_challenge, code_challenge_method, state, loginid, nonce, offline_access}
       
         const acc =  document.getElementById("accepted");
         if(acc) {
            
             acc.value =  accepted;
         }
         const lgf =  document.getElementById("app-lg-form");

         /*const res = await fetch(API, {
                method: 'POST',
                redirect: 'follow',
                body: new URLSearchParams(data),
                headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
        if(!res.ok) {
            throw new Error('Domething went wrong.')
            
        } 
        if(res.redirected) {
            window.location.href =  res.url;
        }*/
       if(lgf) {
          const cst =  document.getElementById('consent-section');
          cst.style.display = 'none'
     
         lgf.elements.accepted.value = accepted;
         lgf.submit();
       }
        
    } catch(ex) {
        msg.innerHtml = "Something Went Wrong"; 
        console.log(ex);
    }
    }

    window.addEventListener("pageshow" , () => {
           const lgform = document.getElementById('lg-form');
           const tfac =  document.getElementById('factor');
          
           
           if(tfac && tfac.style.display === 'block') {
           
               window.location.reload();
           }
           if(lgform) {
           
               lgform.style.display =  'flex';
           }
        }
);

const register_page = () => {
   const loc = window.location.href+'&promt=create';
   console.log(loc);
   window.location.href = loc;
}

const request_new_code = async() => {
    const tfainp =  document.getElementById('tfa-message');
    try {
        const API =  '/api/authorize/resendcode';
        const lgidinp = document.getElementById('loginid');
        let sessionid;
        if(lgidinp) {
            sessionid =  lgidinp.value;
        }
        const data = {sessionid}
        const res =  await fetch(API, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        if(!res.ok) {
          throw new Error('Could not get code');
        }
        const dt =  await res.json();
        console.log(dt);
        if(dt.codesent) {
            
           tfainp.innerHTML = "Code sent"
        }
    } catch(ex) {
         tfainp.innerHTML = ex.message;
    }
}


const cstabtn =  document.getElementById('accept-consent');
const cstrbtn = document.getElementById('reject-consent');
const rsbtn =  document.getElementById('resend_btn');
const reset_btn =  document.getElementById('reset_btn');
const cancel_reset_btn =  document.getElementById('cancel_reset_btn');
if(cstabtn) {
cstabtn.onclick = (e) => {
    e.preventDefault();
    
    get_consent(true);    
    }
}
if(cstrbtn) {
    cstrbtn.onclick = (e) => {
    
    e.preventDefault();
    
    get_consent(false);    
    }
}

const reg_link =  document.getElementById('register-link');
if(reg_link) {
  

   reg_link.onclick = () => {
    
      register_page();
    }
}

if(rsbtn) {
   rsbtn.onclick = (e) => {
       e.preventDefault();
       request_new_code();
    }
}



if(reset_btn) {
    reset_btn.onclick = (e) => {
        
        e.preventDefault();
        submit_reset_password();
        
    }
}

if(cancel_reset_btn) {
    cancel_reset_btn.onclick = (e) => {
      
        e.preventDefault();
        //create a client for local admin
        window.location.href = '/'
    }
}




const rg_sbtn = document.getElementById('reg_submit_btn');
    

    const toogle_visibilityOn = () => {
          
           const  pwdfield =  document.getElementById('password');
            const  onf =  document.getElementById('show-passwd');
            const  off =  document.getElementById('hide-passwd');
            onf.style.display='none';
            off.style.display='block';
            pwdfield.type =  'text';
        }
    const toogle_visibilityOff = () => {
           
           const  pwdfield =  document.getElementById('password');
           const  onf =  document.getElementById('show-passwd');
            const  off =  document.getElementById('hide-passwd');
             off.style.display='none';
             onf.style.display='block';
           
           pwdfield.type =  'password';
        }

    async function execute_register_user() {
        try {
            
            
            const unamefield =  document.getElementById('username');
            const  pwdfield =  document.getElementById('password');
            const telfield = document.getElementById('telephone');
            const emailfield =  document.getElementById('email');
            const fnamefield =  document.getElementById('firstname');
            const lnamefield =  document.getElementById('lastname');
            let username;
            let password;
            let telephone;
            let email;
            if(unamefield) {
                console.log(unamefield.value)
                username =  unamefield.value;
            }
            if(pwdfield) {
                password =  pwdfield.value;
            }
            if(telfield) {
               telephone =  telfield.value;
            }
            
            if(emailfield) {
              email =  emailfield.value;
            }
            if(fnamefield) {
               firstname =  fnamefield.value;
            }
            if(lnamefield) {
               lastname =  lnamefield.value;
            }
            const client_inp =  document.getElementById('client_id');
            const resp_inp =  document.getElementById('response_id');
            const scope_inp =  document.getElementById('scope');
            const redir_inp =  document.getElementById('redirect_uri');
            const code_inp = document.getElementById('code_challenge');
            const state_inp = document.getElementById('state');
            const offline_access_inp = document.getElementById('offline_access');
            const nonce_inp = document.getElementById('nonce');
            const challenge_methode = document.getElementById('challenge_method');
            const client_id =  client_inp?.value;
            const response_type =  resp_inp?.value;
            const scope =  scope_inp?.value;
            const redirect_uri = redir_inp?.value;
            const code_challenge =  code_inp?.value;
            const code_challenge_method =  challenge_method?.value;
            const state =  state_inp?.value;
            const nonce = nonce_inp?.value;
            const offline_access = offline_access_inp?.value === 'yes' ? true : false;
            const formdata = {username, password, client_id, response_type, scope, redirect_uri, code_challenge, code_challenge_method, state, nonce, offline_access, email, firstname, lastname, telephone};
            console.log(offline_access_inp?.value)
            console.log(formdata);
            const API="/api/authorize/register";
            const res = await  fetch(API, {method: "POST",  body: JSON.stringify(formdata), headers: {"content-type": "application/json"}});
            if(!res.ok) {
               throw new Error('Could not log you in.');
            }
            unamefield.value = '';
            pwdfield.value = '';
            emailfield.value = '';
            if(telfield) {
               telfield.value = '';
            }
            const d =  await res.json();        
            
                
                const login_id_inp =  document.getElementById('loginid');
                if(login_id_inp) {
                    login_id_inp.value = d.id;
                }
                if(d.id) {
                    const lgform = document.getElementById('lg-form');
                    if(lgform) {
                    const tfac =  document.getElementById('factor');
                    
                
                    if(tfac) {
                        lgform.style.display = 'none';
                        
                        tfac.style.display =  'flex'
                    }
                    }
                }
                
                
                // console.log(data);
                
           

        } catch(ex) {
            console.log(ex);
            msg.innerHTML = 'Something went wrong. Please try again';
            
        }
    }
    
    if(rg_sbtn) {
        rg_sbtn.onclick = (e) => {
          
            e.preventDefault();
            execute_register_user();
        }
  }

  const submit_reset_password = async () => {
    try {
      
        const emailinp =  document.getElementById('email');
       
        const email =  emailinp.value;
        const API = '/api/authorize/resetpasswordlink';
        const res =  await fetch(API, {
            body: JSON.stringify({email}),
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            }
        });

        if(!res.ok) {
            throw new Error('could not reset');
        }
        const appressetpwd =  document.getElementById('app-reset-pwd');
        if(appressetpwd) {
            appressetpwd.style.display =  'none';
        }
        const reset_msg =  document.getElementById('reset-message');
        if(reset_msg) {
            reset_msg.style.display = 'block';
        }

        


    } catch(ex) {
        console.log(ex);
        msg.innerHTML = 'Could not complete this action';
    }
  }


  document.addEventListener('DOMContentLoaded', () => {
    const sid =  document.getElementById('sid');
    const reset_code =  document.getElementById('resetcode')
    const params = new URLSearchParams(window.location.search);
    if(sid) {
        sid.value = params.get('sid');
    }
    if(reset_code) {
        reset_code.value =  params.get('resetcode');
    }
  })


