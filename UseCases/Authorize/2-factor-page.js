const TwoFactorPage = (data) => {
        return `
                 <div class="login-form" id="two-factor">
                    <form style="height: 340px;">
                    
                     <div class="glass">
                     <div class="top">
                    <svg width="52" height="52" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><defs><style>.cls-1{fill:#606161;}</style></defs><title/><g data-name="Layer 7" id="Layer_7"><path class="cls-1" d="M19.75,15.67a6,6,0,1,0-7.51,0A11,11,0,0,0,5,26v1H27V26A11,11,0,0,0,19.75,15.67ZM12,11a4,4,0,1,1,4,4A4,4,0,0,1,12,11ZM7.06,25a9,9,0,0,1,17.89,0Z"/></g></svg>
                    </div>
                      <div class="header">
                      <h1>2 Factor Auth</h1>
                      <p>Please enter the code received by ${data?.channel} </h1>
                      </div>
                      <div class="form-field">
                        <input type="text" required name="code" id="authcode">
                      </div>
                      <div class="form-button" style="display: flex; align items: cemter; gap: .75rem;">
                        <button onclick="javascript:void()" class="glass" id="code_btn" type="submit">SUBMIT CODE</button>
                        <button onclick="javascript:void()" class="glass" id="resend_btn" type="submit">REESEND CODE</button>
                      </div>
                      <div>
                        <p id="message" class="message"></p>
                      </div>
                      </div>

                    </form>

                 </div>

        `
    
}

module.exports = TwoFactorPage;