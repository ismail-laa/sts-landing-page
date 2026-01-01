import './style.css'

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Multi-step Form Logic
    const leadForm = document.getElementById('lead-form');
    if (leadForm) {
        let currentStep = 1;
        const totalSteps = 3;
        const steps = document.querySelectorAll('.form-step');
        const progressBar = document.getElementById('progress-bar');
        const stepDots = document.querySelectorAll('.step-dot');

        // Function to update UI
        const updateStep = (step) => {
            steps.forEach(s => {
                s.classList.remove('active');
                if (parseInt(s.dataset.step) === step) {
                    s.classList.add('active');
                }
            });

            // Update progress
            const progress = (step / totalSteps) * 100;
            progressBar.style.width = `${progress}%`;

            // Update dots
            stepDots.forEach(dot => {
                const dotStep = parseInt(dot.innerText);
                if (dotStep <= step) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        };

        // Next Button Click
        document.querySelectorAll('.btn-next').forEach(btn => {
            btn.addEventListener('click', () => {
                // Validate current step
                const currentStepEl = document.querySelector(`.form-step[data-step="${currentStep}"]`);
                const inputs = currentStepEl.querySelectorAll('input, select');
                let isValid = true;

                inputs.forEach(input => {
                    if (input.hasAttribute('required') && !input.value) {
                        isValid = false;
                        input.style.borderColor = 'red';
                    } else {
                        input.style.borderColor = '#e1e1e1';
                    }
                });

                if (isValid) {
                    if (currentStep < totalSteps) {
                        currentStep++;
                        updateStep(currentStep);
                    }
                } else {
                    alert('Veuillez remplir tous les champs obligatoires.');
                }
            });
        });

        // Prev Button Click
        document.querySelectorAll('.btn-prev').forEach(btn => {
            btn.addEventListener('click', () => {
                if (currentStep > 1) {
                    currentStep--;
                    updateStep(currentStep);
                }
            });
        });

        // Form Submission
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Gather form data
            const formData = new FormData(leadForm);
            const data = Object.fromEntries(formData);

            console.log('Form Submitted:', data);

            // Simulate submission
            const submitBtn = leadForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;

            submitBtn.innerText = 'Envoi en cours...';
            submitBtn.disabled = true;

            setTimeout(() => {
                alert('Merci ! Votre demande a été reçue. Nous vous contacterons bientôt.');
                window.location.reload(); // Reset form/page
            }, 1000);
        });
    }
});
