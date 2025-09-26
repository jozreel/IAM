const ResetPasswordPage = ({data}) => `<!DOCTYPE html>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kwapo Password Reset</title>
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
        <form id="app-reset-pwd" method="POST" action="/api/authorize/resetrequest">
         <div  class="form-section" id="lg-form">
             <h1 class="title">Password Reset</h1>
            <div class="input-group">
                <label for="username" class="input-label">Email</label>
                <input id="email" name="email" type="text" autocomplete="off" required class="input-field" placeholder="Enter your email">
            </div>

        </div>
         <div class="form-button" style="display: flex; align-items: cemter; gap: .75rem;">
            <button onclick="javascript:void(0)" class="login-button"   id="reset_btn" type="submit">Submi</button>
            <button onclick="javascript:void(0)" class="login-button" id="cancel_reset_btn" type="submit">Cancel</button>
            
        </div>
        </form>
        <div id="reset-message">
            <p style="text-align: center;">A reset email was sent. If the provided email matches an account in our system you will receive a link.</p>
        </div>
    </div>

    

    
</body>
</html>`;

module.exports = ResetPasswordPage;
