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
    <link rel="stylesheet" href="${process.env.BASE_PATH}/public/kw-auth-style.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="${process.env.BASE_PATH}/public/kw-authscripts.js" defer></script>
    
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
        <form id="app-lg-form" method="POST" action="${process.env.BASE_PATH}/api/authorize/consent">
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
                <button  onclick="javascript:void(0)" id="reg_submit_btn" type="submit"  class="login-button">
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


</body>
</html>`

}


module.exports=RegisterPage;


