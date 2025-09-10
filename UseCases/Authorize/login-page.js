const factorPage = require('./2-factor-page');
const LoginPage = (data) => {




    let factorPart;
    if(data.hasMultiFactor) {
        factorPart = factorPage({channel: 'email'});
    }
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Froggy Login</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    
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
            max-width: 24rem;
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
        <form class="form-section" id="lg-form">
             <h1 class="title">Login</h1>
            <div class="input-group">
                <label for="username" class="input-label">Username</label>
                <input id="username" name="username" type="text" autocomplete="username" required class="input-field" placeholder="Enter your username">
            </div>

            <div class="input-group">
                <label for="password" class="input-label">Password</label>
                <input id="password" name="password" type="password" autocomplete="current-password" required class="input-field" placeholder="Enter your password">
            </div>

            <div style="text-align: right; margin-top: -0.75rem; margin-bottom: 1.5rem;">
                <a href="#" class="forgot-password">Forgot password?</a>
            </div>

            <div>
                <button  onclick="javascript:void()" id="submit_btn" type="submit"  class="login-button">
                    Sign in
                </button>
            </div>
            <div>
                <p id="message" class="message"></p>
            </div>
                
            <div id="req_params">
                <input type="hidden" id="client_id" value=${data.client_id} />
                <input type="hidden" id="response_id" value=${data.response_type} />
                <input type="hidden" id="scope" value=${data.scope} />
                <input type="hidden" id="redirect_uri" value=${data.redirect_uri} />
                <input type="hidden" id="code_challenge" value=${data.code_challenge} />
                <input type="hidden" id="challenge_method" value=${data.code_challenge_method} />
                <input type="hidden" id="state" value=${data.state} />
            </div>
        </form>
        ${factorPart}
    </div>
   

     <script type="text/javascript">
    const sbtn = document.getElementById('submit_btn');
    const msg =  document.getElementById('message')
    console.log(sbtn);
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
            const challenge_methode = document.getElementById('challenge_method');
            const client_id =  client_inp?.value;
            const response_type =  resp_inp?.value;
            const scope =  scope_inp?.value;
            const redirect_uri = redir_inp?.value;
            const code_challenge =  code_inp?.value;
            const code_challenge_method =  challenge_method?.value;
            const state =  state_inp?.value;
            const formdata = {username, password, client_id, response_type, scope, redirect_uri, code_challenge, code_challenge_method, state};
            console.log(formdata);
            const API="http://localhost:3992/api/authorize/login";
            const res = await  fetch(API, {method: "POST",  body: JSON.stringify(formdata), headers: {"content-type": "application/json"}});
            if(!res.ok) {
               throw new Error('Could not log you in.');
            }
            unamefield.value = '';
            pwdfield.value = '';
            const d =  await res.json();        
            
                console.log(d);
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
    sbtn.onclick = (e) => {
        
        e.preventDefault();
        execute_login_user();
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
            const state_inp = document.getElementById('state');
                const login_id_inp =  document.getElementById('loginid');
            const challenge_methode = document.getElementById('challenge_method');
            const client_id =  client_inp?.value;
            const response_type =  resp_inp?.value;
            const scope =  scope_inp?.value;
            const redirect_uri = redir_inp?.value;
            const code_challenge =  code_inp?.value;
            const code_challenge_method =  challenge_method?.value;
            const state =  state_inp?.value;
            const authcode =  authcode_inp.value;
            const loginid = login_id_inp?.value;
            const data = {authcode, client_id, scope, redirect_uri, code_challenge, code_challenge_method, state, loginid}
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
            }
        console.log(res);
           const tfac =   document.getElementById('factor');
           if(tfac) {
           tfac.style.display = 'none'
           }
           
            if(res.redirected) {
                window.location =  res.url;
            }
            

            
        } catch(ex) {
            console.log(ex, 'error'); 
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

    
    
 </script>

</body>
</html>`

}


module.exports=LoginPage;


