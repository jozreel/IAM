const TwoFactorPage = (data) => {
        return `<form id="factor" class="form-section" style="display:none;">
                    
                     
                      <div class="header">
                      <h1 style="text-align: center;" class="title">Two-Factor Authentication</h1>
                      <p style="text-align: center;">Please enter the one time code received by ${data?.channel} </h1>
                      </div>
                      <div class="input-group"">
                        <input type="text" required name="code" id="authcode" autocomplete="off" required class="input-field" placeholder="Enter code">
                      </div>
                      <div class="form-button" style="display: flex; align items: cemter; gap: .75rem;">
                        <button onclick="javascript:void(0)" class="login-button" id="code_btn" type="submit">Submit Code</button>
                        <button onclick="javascript:void(0)" class="login-button" id="resend_btn" type="submit">Resend Code</button>
                        <input type="hidden" id="loginid"  />
                        </div>
                      <div>
                        <p id="message" class="message"></p>
                      </div>
                     

                    </form>

                 </div>

        `
    
}

module.exports = TwoFactorPage;