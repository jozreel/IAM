const factorPage = require('./2-factor-page');
const ConsentPage = require('./consent-page');
const RegisterPage = (data) => {


    

    let factorPart;
    if(data.hasMultiFactor) {
        factorPart = factorPage({channel: 'email'});
    }

    let consent;
    if(data.consentrequired) {
        consent =  ConsentPage(data);
    }
    const telephone_input =  ` <div class="input-group">
                <label for="password-repeat" class="input-label">Telephone</label>
                <input id="telephone" name="telephone" type="telephone" autocomplete="telephone" required class="input-field" placeholder="Enter your phone number">
            </div>`;
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kwapo Registration</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        :root {
            --olive-green: #3f6212;
            --dark-background: #1a202c;
            --white-opacity-10: rgba(255, 255, 255, 0.1);
            --white-opacity-5: rgba(255, 255, 255, 0.05);
            --white-opacity-20: rgba(255, 255, 255, 0.2);
            --white-opacity-30: rgba(255, 255, 255, 0.3);
            --placeholder-color: #d1d5db;
        }

        body {
            font-family: 'Inter', sans-serif;
            background-color: var(--dark-background);
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            color: #ffffff;
            margin: 0;
            box-sizing: border-box;
            /* Radial gradient for a modern feel */
            background-image: radial-gradient(at 27% 92%, hsla(88, 60%, 78%, 0.1) 0px, transparent 50%), radial-gradient(at 89% 10%, hsla(88, 60%, 78%, 0.1) 0px, transparent 50%), radial-gradient(at 50% 50%, hsla(110, 60%, 70%, 0.2) 0px, transparent 50%);
            padding: 1rem;
        }

        .login-container {
            background-color: var(--white-opacity-5);
            backdrop-filter: blur(16px);
            border: 1px solid var(--white-opacity-20);
            padding: 2rem;
            border-radius: 1.5rem;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            width: 100%;
            max-width: 32rem;
        }

        .logo-section {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 1.5rem;
        }

        .logo-circle {
            width: 6rem;
            height: 6rem;
            background-color: var(--olive-green);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1rem;
        }

        .logo-icon {
            width: 3rem;
            height: 3rem;
        }

        .title {
            font-size: 1.875rem;
            font-weight: 700;
            letter-spacing: -0.025em;
            text-align: center;
        }

        .form-section {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }

        .input-group {
            margin-bottom: 1.5rem;
        }

        .input-label {
            display: block;
            font-size: 0.875rem;
            font-weight: 500;
            color: #e5e7eb;
            text-align: center; /* Centering the label text */
        }
        .consent-card {
           display: flex;
           align-items: center;
           gap: 1.5rem;
        }
        
        consent-card svg {
           width: 6rem;
           height: 5rem;
        }

        .input-field {
            display: block;
            width: 100%;
            padding: 0.5rem 1rem;
            margin-top: 0.25rem;
            background-color: var(--white-opacity-10);
            border: 1px solid var(--white-opacity-30);
            border-radius: 9999px;
            color: #ffffff;
            transition: all 0.3s ease;
            text-align: center; /* Centering the input text */
            box-sizing: border-box;
        }
        
        .input-field::placeholder {
            color: var(--placeholder-color);
        }

        .input-field:focus {
            outline: none;
            box-shadow: 0 0 0 2px #34d399, 0 0 0 4px rgba(52, 211, 153, 0.5); /* Use a more subtle focus ring */
        }

        .forgot-password {
            font-size: 0.875rem;
            font-weight: 500;
            color: #4ade80;
            text-decoration: none;
            transition: color 0.3s ease;
        }

        .forgot-password:hover {
            color: #86efac;
        }

        .login-button {
            width: 100%;
            display: flex;
            justify-content: center;
            padding: 0.5rem 1rem;
            border: 1px solid transparent;
            border-radius: 9999px;
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
            font-size: 0.875rem;
            font-weight: 500;
            color: #ffffff;
            cursor: pointer;
            background-color: var(--olive-green);
            transition: background-color 0.3s ease;
        }

        .login-button:hover {
            background-color: #4d7c0f;
        }
        
        .login-button:focus {
            outline: none;
            box-shadow: 0 0 0 2px #34d399, 0 0 0 4px rgba(52, 211, 153, 0.5);
        }

        .message {
            text-align: center;
        }

    </style>
</head>
<body>

    <!-- Login Container with Glassmorphism Effect -->
    <div class="login-container">

        <!-- Logo Section -->
        <div class="logo-section">
            <!-- Logo Circle with Olive Green -->
            <div class="logo-circle">
                <!-- SVG Vector of a Simple Frog -->
                <img style="width: 6rem; height: 6rem; background: transparent;" src="/public/kwapo-logo.png" />
            </div>
           
        </div>

        <!-- Form Section -->
        <form id="app-lg-form" method="POST" action="/api/authorize/consent">
         <div  class="form-section" id="lg-form">
             <h1 class="title">Register User</h1>
            <div class="input-group">
                <label for="username" class="input-label">Username</label>
                <input id="username" name="username" type="text" autocomplete="username" required class="input-field" placeholder="Enter your username">
            </div>

             <div class="input-group">
                <label for="email" class="input-label">Email</label>
                <input id="email" name="email" type="text" autocomplete="email" required class="input-field" placeholder="Enter your email">
            </div>
            ${data.showphone ? telephone_input : ''}
            <div style="display: flex; align-items: center; gap: 8px;">
            <div class="input-group">
                <label for="firstname" class="input-label">First Name</label>
                 <input id="firstname" name="firstname" type="text" autocomplete="firstname" required class="input-field" placeholder="Enter your first name">
            </div>
            <div class="input-group">
                <label for="lastname" class="input-label">Last Name</label>
                 <input id="lastname" name="lastname" type="text" autocomplete="lastname" required class="input-field" placeholder="Enter your Last name">
            </div>
            </div>
            <div class="input-group">
                <label for="password" class="input-label">Password</label>
                <div style="position: relative;">
                <input style="padding-right: 32px;" id="password" name="password" type="password" autocomplete="current-password" required class="input-field" placeholder="Enter your password">
                <svg onclick="toogle_visibilityOn()" id="show-passwd" style="cursor: pointer; position: absolute; right: 8px; top: 8px;" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/></svg>
                <svg onclick="toogle_visibilityOff()" id="hide-passwd" style="display: none; cursor: pointer;  position: absolute; right: 8px; top: 8px;" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z"/></svg>
                </div>
            </div>
            

            <div>
                <button  onclick="javascript:void(0)" id="submit_btn" type="submit"  class="login-button">
                    Register User
                </button>
            </div>
            <div>
                <p id="message" class="message"></p>
            </div>
                
            <div id="req_params">
                <input name="client_id" type="hidden" id="client_id" value=${data.client_id} />
                <input name="response_type" type="hidden" id="response_id" value=${data.response_type} />
                <input name="scope" type="hidden" id="scope" value=${data.scope} />
                <input name="redirect_uri" type="hidden" id="redirect_uri" value=${data.redirect_uri} />
                <input name="code_challenge" type="hidden" id="code_challenge" value=${data.code_challenge} />
                <input name="code_challenge_method" type="hidden" id="challenge_method" value=${data.code_challenge_method} />
                <input name="state" type="hidden" id="state" value=${data.state} />
                <input name="nonce" type="hidden" id="nonce" value=${data.nonce} />
                <input name="offline_access" type="hidden" id="offline_access" value= ${data.offline_access ? 'yes':'no'} />
                <input name="accepted" type="hidden" id="accepted"  />
                <input name="loginid" type="hidden" id="loginid"  />
            </div>
            </div>
              ${factorPart}
             ${consent || ''}
        </form>
      
    </div>
   

     <script type="text/javascript">
    const sbtn = document.getElementById('submit_btn');
    const msg =  document.getElementById('message')
    

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
            const API="http://localhost:3992/api/authorize/register";
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
    sbtn.onclick = (e) => {
    
        e.preventDefault();
        execute_register_user();
    }
    const codebtn =  document.getElementById('code_btn');
    if(codebtn) {
        
        codebtn.onclick = (e) => {
            
            e.preventDefault();
            TwoFactor();
        }
    }


const TwoFactor = async () => {
        try {
            const API = 'http://localhost:3992/api/authorize/twofactor';
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
                console.log('Incorrect code');
                throw new Error('could not authenticate')
            }
        
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
            msg.innerHTML = 'Could not authenticate. Please try again';
            console.log(ex, 'error'); 
        }
    }


    const get_consent = async(accepted) => {
       try {
        const API = 'http://localhost:3992/api/authorize/consent';
       
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
          
           console.log(tfac.style)
           if(tfac && tfac.style.display === 'block') {
           
               window.location.reload();
           }
           if(lgform) {
           
               lgform.style.display =  'flex';
           }
        }
);

const cstabtn =  document.getElementById('accept-consent');
const cstrbtn = document.getElementById('reject-consent');
cstabtn.onclick = (e) => {
   e.preventDefault();
 
   get_consent(true);    
}

cstrbtn.onclick = (e) => {
   
   e.preventDefault();
  
   get_consent(false);    
}
    
 </script>

</body>
</html>`

}


module.exports=RegisterPage;


