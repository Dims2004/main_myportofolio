// ===== CONTACT FORM VALIDATION =====
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;

    // ===== INITIALIZE EMAILJS =====
    // Public Key yang BENAR: T7KymbwHlU7ms1uZJ
    emailjs.init('T7KymbwHlU7ms1uZJ');
    console.log('✅ EmailJS initialized with public key');

    // ===== FORM SUBMIT HANDLER =====
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
            submitBtn.disabled = true;
            
            try {
                await sendFormData();
                showNotification('success', '✅ Pesan berhasil dikirim!');
                contactForm.reset();
            } catch (error) {
                console.error('Error sending email:', error);
                let errorMessage = 'Gagal mengirim pesan. ';
                if (error.text) {
                    errorMessage += 'Error: ' + error.text;
                } else if (error.message) {
                    errorMessage += 'Error: ' + error.message;
                } else {
                    errorMessage += 'Silakan coba lagi.';
                }
                showNotification('error', '❌ ' + errorMessage);
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        }
    });

    // ===== VALIDATION FUNCTION =====
    function validateForm() {
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');
        
        let isValid = true;
        clearErrors();
        
        if (!name.value.trim()) {
            showError(name, 'Nama harus diisi');
            isValid = false;
        } else if (name.value.trim().length < 2) {
            showError(name, 'Nama minimal 2 karakter');
            isValid = false;
        }
        
        if (!email.value.trim()) {
            showError(email, 'Email harus diisi');
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            showError(email, 'Format email tidak valid');
            isValid = false;
        }
        
        if (!subject.value.trim()) {
            showError(subject, 'Subjek harus diisi');
            isValid = false;
        } else if (subject.value.trim().length < 3) {
            showError(subject, 'Subjek minimal 3 karakter');
            isValid = false;
        }
        
        if (!message.value.trim()) {
            showError(message, 'Pesan harus diisi');
            isValid = false;
        } else if (message.value.trim().length < 10) {
            showError(message, 'Pesan minimal 10 karakter');
            isValid = false;
        }
        
        return isValid;
    }

    // ===== EMAIL VALIDATION =====
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // ===== SHOW ERROR =====
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.cssText = `
            color: #dc3545;
            font-size: 14px;
            margin-top: 5px;
            animation: fadeInUp 0.3s ease;
        `;
        errorDiv.textContent = message;
        input.style.borderColor = '#dc3545';
        formGroup.appendChild(errorDiv);
    }

    // ===== CLEAR ERRORS =====
    function clearErrors() {
        document.querySelectorAll('.error-message').forEach(error => error.remove());
        contactForm.querySelectorAll('input, textarea').forEach(input => {
            input.style.borderColor = '#e9ecef';
        });
    }

    // ===== REAL-TIME VALIDATION =====
    contactForm.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('blur', () => {
            const errorMsg = input.closest('.form-group')?.querySelector('.error-message');
            if (errorMsg) {
                errorMsg.remove();
                input.style.borderColor = '#e9ecef';
            }
            if (input.id === 'email' && input.value.trim()) {
                if (!isValidEmail(input.value)) {
                    showError(input, 'Format email tidak valid');
                }
            }
        });
        
        input.addEventListener('input', () => {
            const errorMsg = input.closest('.form-group')?.querySelector('.error-message');
            if (errorMsg) {
                errorMsg.remove();
                input.style.borderColor = '#e9ecef';
            }
            if (input.tagName === 'TEXTAREA') {
                input.style.height = 'auto';
                input.style.height = input.scrollHeight + 'px';
            }
        });
    });

    // ===== SEND FORM DATA WITH EMAILJS =====
    async function sendFormData() {
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        console.log('📤 Sending email with EmailJS...');
        console.log('📝 Form data:', {
            name: data.name,
            email: data.email,
            subject: data.subject,
            message_length: data.message ? data.message.length : 0
        });
        
const templateParams = {
    name: data.name || 'Tidak ada nama',
    email: data.email || 'Tidak ada email',
    reply_to: data.email,
    subject: data.subject || 'Tidak ada subjek',
    message: data.message || 'Tidak ada pesan'
};
        
        console.log('📧 Template params:', templateParams);
        console.log('🔑 Service ID: service_qkedmkp');  // ✅ BENAR
        console.log('📄 Template ID: template_imoc8it');
        
        try {
            const response = await emailjs.send(
                'service_qkedmkp',   // ✅ BENAR: service_qkedmkp (p di akhir)
                'template_imoc8it',  // Template ID
                templateParams
            );
            
            console.log('✅ Email sent successfully!', response);
            console.log('📨 Response status:', response.status);
            console.log('📨 Response text:', response.text);
            
            return response;
        } catch (error) {
            console.error('❌ Email sending failed!');
            console.error('Error details:', error);
            console.error('Error status:', error.status);
            console.error('Error text:', error.text);
            throw error;
        }
    }

    // ===== NOTIFICATION SYSTEM =====
    function showNotification(type, message) {
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 30px;
            padding: 15px 25px;
            border-radius: 8px;
            color: white;
            font-weight: 600;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            animation: slideInRight 0.5s ease;
            z-index: 9999;
            max-width: 450px;
            font-size: 14px;
            line-height: 1.5;
        `;
        
        if (type === 'success') {
            notification.style.background = '#28a745';
            notification.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
        } else {
            notification.style.background = '#dc3545';
            notification.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
        }
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideInRight 0.5s ease reverse';
            setTimeout(() => notification.remove(), 500);
        }, 5000);
    }

    // ===== KEYBOARD SUPPORT =====
    contactForm.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            clearErrors();
        }
    });

    // ===== AUTOCOMPLETE SUGGESTIONS =====
    const subjectInput = document.getElementById('subject');
    if (subjectInput) {
        const suggestions = ['Pertanyaan tentang proyek', 'Kerjasama', 'Informasi lebih lanjut', 'Kritik & saran'];
        const datalist = document.createElement('datalist');
        datalist.id = 'subjectSuggestions';
        suggestions.forEach(suggestion => {
            const option = document.createElement('option');
            option.value = suggestion;
            datalist.appendChild(option);
        });
        subjectInput.setAttribute('list', 'subjectSuggestions');
        document.body.appendChild(datalist);
    }
    
    console.log('✅ Contact page initialized successfully!');
    console.log('📧 EmailJS Configuration:');
    console.log('   Public Key: T7KymbwHlU7ms1uZJ');
    console.log('   Service ID: service_qkedmkp');
    console.log('   Template ID: template_imoc8it');
});