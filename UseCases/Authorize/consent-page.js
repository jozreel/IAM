const consentTypes = require("../../Entities/Application/consent-types");

const ConsentPage = (data) => {
    console.log(data);
    return `<div class="form-section"  id="consent-section" style="display: none;">
           <div class="text-center mb-8">
                <p class="text-whitw-600 text-lg">
                    <span class="font-semibold text-white-800">${data.appname || 'This application'}</span> needs your permission to access information from your account.
                </p>
           </div>

      ${getConsentSection(data.consentrequired)}
     
        
        <div class="text-center text-sm text-white-500 mb-6">
            <p>
            By clicking 'Allow', you agree to our
            <a href="#" class="text-indigo-600 hover:text-indigo-500 font-medium underline">Terms of Service</a> and
            <a href="#" class="text-indigo-600 hover:text-indigo-500 font-medium underline">Privacy Policy</a>.
        </p>
        </div>

        <div class="form-button" style="display: flex; align items: cemter; gap: .75rem;">
        <button id="reject-consent" type="button" onclick = "javascript:void(0)" class="login-button transition-colors">
            Cancel
        </button>
        <button type="button" id="accept-consent"  onclick = "javascript:void(0)" class="login-button transition-colors">
            Allow
        </button>
    </div>
    </div>
    </div>`
    
} 
 
const getSvg = (type) => {
    switch (type) {
        case "email":
            return  `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>`
        case "profile":
            return ` <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>`
        case "phone":
            return `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="h-6 w-6" height="24px" viewBox="0 -960 960 960" width="24px" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M280-40q-33 0-56.5-23.5T200-120v-720q0-33 23.5-56.5T280-920h400q33 0 56.5 23.5T760-840v124q18 7 29 22t11 34v80q0 19-11 34t-29 22v404q0 33-23.5 56.5T680-40H280Zm0-80h400v-720H280v720Zm0 0v-720 720Zm200-600q17 0 28.5-11.5T520-760q0-17-11.5-28.5T480-800q-17 0-28.5 11.5T440-760q0 17 11.5 28.5T480-720Z"/>
            </svg>`;
        default:
            return ''
    }   
}

const getConsentSection = (consents) => {
    let csts ='';
    for (let c of consents) {
        csts += '<div class="space-y-6 mb-8"><div class="flex items-center space-x-4 bg-gray-50 p-4 rounded-xl"><div class="flex-shrink-0 w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center shadow-lg">'+getSvg(c)+'</div><div><h3 class="text-lg font-semibold text-gray-900">'+consentTypes[c].name+'</h3><p class="text-sm text-gray-500">'+consentTypes[c].desc+'</p></div> </div>'
    }
    return csts;
}

module.exports = ConsentPage;