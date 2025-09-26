const PasswordChangeSuccessPage = (data) => {
    return `<!DOCTYPE html>
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
     <p>${data.message}</p>      
   </div1>

   </body>
   </html>
   `
}

module.exports = PasswordChangeSuccessPage;
