const factorPage = require('./2-factor-page');
const ConsentPage = require('./consent-page');
const LoginPage = (data) => {




    let factorPart;
    if(data.hasMultiFactor) {
        factorPart = factorPage({channel: 'email'});
    }

    let consent;
    if(data.consentrequired) {
        consent =  ConsentPage(data);
    }
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kwapo Login</title>
     <link rel="stylesheet" href="/public/kw-auth-style.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="/public/kw-authscripts.js" defer></script>
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
             <h1 class="title">Login</h1>
            <div class="input-group">
                <label for="username" class="input-label">Username</label>
                <input id="username" name="username" type="text" autocomplete="username" required class="input-field" placeholder="Enter your username">
            </div>

            <div class="input-group">
                <label for="password" class="input-label">Password</label>
                <input id="password" name="password" type="password" autocomplete="current-password" required class="input-field" placeholder="Enter your password">
            </div>

            <div style="text-align: right; display: flex; justify-content: flex-end; align-items: center; gap: 16px; margin-top: -0.75rem; margin-bottom: 1.5rem;">
                ${data.selfregistration ? '<a id="register-link" href="javascript:;" class="forgot-password">Create Account</a>': ''}
                <a href="/api/authorize/resetpassword" class="forgot-password">Forgot password?</a>
            </div>

            <div>
                <button  onclick="javascript:void(0)" id="submit_btn" type="submit"  class="login-button">
                    Sign in
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
   

    

</body>
</html>`

}


module.exports=LoginPage;


