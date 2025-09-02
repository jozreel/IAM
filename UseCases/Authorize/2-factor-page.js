const TwoFactorPage = (data) => {
        return `<html>
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
                 <div class="login-form">
                    <form>
                    
                     <div class="glass">
                     <div class="top">
                    <svg width="52" height="52" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><defs><style>.cls-1{fill:#606161;}</style></defs><title/><g data-name="Layer 7" id="Layer_7"><path class="cls-1" d="M19.75,15.67a6,6,0,1,0-7.51,0A11,11,0,0,0,5,26v1H27V26A11,11,0,0,0,19.75,15.67ZM12,11a4,4,0,1,1,4,4A4,4,0,0,1,12,11ZM7.06,25a9,9,0,0,1,17.89,0Z"/></g></svg>
                    </div>
                      <div class="header">
                      <h1>2 Factor Auth</h1>
                      <p>Please enter the code received by ${data?.channel} </h1>
                      </div>
                      <div class="form-field">
                        <label>Username</label>
                        <input type="text" required name="code" id="code">
                      </div>
                      <div class="form-button">
                        <button onclick="javascript:void()" class="glass" id="code_btn" type="submit">SUBMIT CODE</button>
                        <button onclick="javascript:void()" class="glass" id="resend_btn" type="submit">REESEND CODE</button>
                      </div>
                      <div>
                        <p id="message" class="message"></p>
                      </div>
                      </div>

                    </form>

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
                           const formdata = {username, password};
                           console.log(formdata);
                           const API="http://localhost:3392/api/authorize/login";
                           const res = fetch(API, {method: "POST",  body: JSON.stringify(formdata), headers: {"content-type": "application/json"}}).then(r => r.json());
                           res.then(d => {
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
                 </script>
               </body>

           </html>
        `
    
}

module.exports = TwoFactorPage;