const factorPage = require('./2-factor-page');
const LoginPage = (data) => {




    let factorPart;
    if(data.hasMultiFactor) {
        factorPart = factorPage({channel: 'email'});
    }
     return `
           <html>
               <head>
               <title>Kwapo OAuth Login</title>
               <link rel="stylesheet"href="https://fonts.googleapis.com/css?family=Google+Sans:400,500|Roboto:400,400italic,500,500italic,700,700italic|Roboto+Mono:400,500,700&display=swap">
               <style type="text/css">
               @media(min-width: 1200px) {
                   body {
                       margin: 0;
                       padding: 0;
                       font-family: Roboto;
                   }
                   .login-form {
                       width: 100%;
                       display: flex;
                       height: 100%; 
                       height: 100vh;
                       background: rgb(63,94,251);
                       background: radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%);
                       color: #222;
                   }
                   .glass {
                       background: rgba(255, 255, 255, 0.3);
                       backdrop-filter: blur(5px);
                       display: block;
                       height: 100%;
                       width: 100%;
                       border-radius: 20px;
                       padding: 16px;
                       box-sizing: border-box;
                       border: 1px solid rgba(255,255,255, 0.4);
                   }

                   .login-form form {
                       position: relative;
                       margin: auto;
                       width: 400px;
                       height: 500px;
                       border-radius: 20px;
                       
                       background: rgba(255, 255, 255, 0.01);
                   }
                   .form-field {
                       text-align: center;
                   }
                   .form-field label {
                       display: block;
                       margin-bottom: 16px;
                   }
                   .form-field input {
                       width: 100%;
                       text-align: center;
                       font-size: 16px;
                       padding: 12px 16px;
                       border: 1px solid #e0e0e0;
                       border-radius: 5px;
                       margin-bottom: 16px;
                   }
                   .form-button {
                       text-align: center;
                       height: 48px;
                      
                      
                   }
                   .form-button button {
                    border-radius: 20px;
                    box-sizing: border-box;
                    cursor: pointer;
                   }
                   .header {
                       text-align: center;
                   }
                   .message {
                       text-align: center;
                   }
                   .top {
                       text-align: center;
                       
                   }
               }
                 
               </style>
               </head>
               <body>
                 <div class="login-form" id="lg-form">
                    <form>
                    
                     <div class="glass">
                     <div class="top">
                    <svg width="52" height="52" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><defs><style>.cls-1{fill:#606161;}</style></defs><title/><g data-name="Layer 7" id="Layer_7"><path class="cls-1" d="M19.75,15.67a6,6,0,1,0-7.51,0A11,11,0,0,0,5,26v1H27V26A11,11,0,0,0,19.75,15.67ZM12,11a4,4,0,1,1,4,4A4,4,0,0,1,12,11ZM7.06,25a9,9,0,0,1,17.89,0Z"/></g></svg>
                    </div>
                      <div class="header">
                      <h1>Kwapo Autentications</h1>
                      <p>Please login to use kwapo services</h1>
                      </div>
                      <div class="form-field">
                        <label>Username</label>
                        <input type="text" required name="username" id="username">
                      </div>
                      <div class="form-field">
                        <label>Password</label>
                        <input required type="password" name="username" id="password">
                      </div>
                      <div class="form-button">
                        <button onclick="javascript:void()" class="glass" id="submit_btn" type="submit">LOGIN</button>
                      </div>
                      <div>
                        <p id="message" class="message"></p>
                      </div>
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

                 </div>
                 <div id="factor" style="display: none;">
                    ${factorPart}
                 </div>

                 <script type="text/javascript">
                   const sbtn = document.getElementById('submit_btn');
                   const msg =  document.getElementById('message')
                   console.log(sbtn);
                   function execute_login_user() {
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
                           const res = fetch(API, {method: "POST",  body: JSON.stringify(formdata), headers: {"content-type": "application/json"}}).then(r => r.json());
                           res.then(d => {
                               console.log(d);
                               if(d.id) {
                                  const lgform = document.getElementById('lg-form');
                                  if(lgform) {
                                    const tfac =  document.getElementById('factor');
                                    if(tfac) {
                                        lgform.style.display = 'none';
                                       
                                        tfac.style.display =  'block'
                                    }
                                  }
                               }
                               
                               if (!res.ok) {
                                   msg.innerHTML = d ? d.message: 'Oops! There was an error while processing your request';
                               }
                               // console.log(data);
                               
                           }).catch(e => {
                               console.log(e);
                           })

                       } catch(ex) {
                           console.log(ex);
                           
                       }
                   }
                   sbtn.onclick = (e) => {
                       
                       e.preventDefault();
                       execute_login_user();
                   }
                   const codebtn =  document.getElementById('code_btn');
                   if(codebtn) {
                      coodebtn.onclick = (e) => {
                            e.preventDefault();
                            TwoFactor();
                        }
                   }
                
                const TwoFactor = async () => {
                       try {
                           const API = 'http://localhost:3992/api/authoroize/twofactor';
                           const authcode_inp =  document.getElementById('authcode');
                           const resp_inp =  document.getElementById('response_id');
                           const scope_inp =  document.getElementById('scope');
                           const client_inp =  document.getElementById('client_id');
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
                           const authcode =  authcode_inp.value;
                           const data = {authcode, client_id, scope, redirect_uri, code_challenge, code_challenge_method, state}
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

                          //migh not be needed as will be redirected to the client cb but for testing purposes
                          const resdata =  await res.json();
                          // send code for token;
                       } catch(ex) {
                           console.log(ex); 
                       }
                    }
                 </script>
               </body>

           </html>
        `

}


module.exports=LoginPage;