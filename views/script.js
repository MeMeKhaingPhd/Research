document.addEventListener('DOMContentLoaded', () => {
    const certificatesMenuLink = document.getElementById('certificatesMenuLink');
    const allPageSections = document.querySelectorAll('.page-section'); // If you have other sections
    const certificatesSection = document.getElementById('certificatesSection');
    const certificateList = document.getElementById('certificateList');

    const showAddImageCertFormBtn = document.getElementById('showAddImageCertFormBtn');
    const showAddPdfCertFormBtn = document.getElementById('showAddPdfCertFormBtn');

    const addImageCertificateFormContainer = document.getElementById('addImageCertificateFormContainer');
    const addPdfCertificateFormContainer = document.getElementById('addPdfCertificateFormContainer');

    const newImageCertificateForm = document.getElementById('newImageCertificateForm');
    const newPdfCertificateForm = document.getElementById('newPdfCertificateForm');

    const cancelButtons = document.querySelectorAll('.cancelBtn');

    // --- Navigation ---
    certificatesMenuLink.addEventListener('click', (e) => {
        e.preventDefault();
        // Hide all other major page sections if you have them
        allPageSections.forEach(section => {
            if (section.id !== 'certificatesSection') { // Keep certificatesSection if it's already one of them
                 section.style.display = 'none';
            }
        });
        certificatesSection.style.display = 'block';
        addImageCertificateFormContainer.style.display = 'none'; // Hide forms initially
        addPdfCertificateFormContainer.style.display = 'none';
        document.querySelectorAll('nav ul li a').forEach(link => link.classList.remove('active'));
        certificatesMenuLink.classList.add('active');

        // Potentially load existing certificates if using localStorage or server
        // loadCertificatesFromStorage();
    });

    // --- Show/Hide Forms ---
    function hideAllCertForms() {
        addImageCertificateFormContainer.style.display = 'none';
        addPdfCertificateFormContainer.style.display = 'none';
    }

    showAddImageCertFormBtn.addEventListener('click', () => {
        hideAllCertForms();
        addImageCertificateFormContainer.style.display = 'block';
    });

    showAddPdfCertFormBtn.addEventListener('click', () => {
        hideAllCertForms();
        addPdfCertificateFormContainer.style.display = 'block';
    });

    cancelButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.closest('.form-container').style.display = 'none';
            button.closest('form').reset();
        });
    });

    // --- Handle Form Submissions ---
    newImageCertificateForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const title = this.imgCertTitle.value;
        const issuer = this.imgCertIssuer.value;
        const date = this.imgCertDate.value;
        const file = this.certImageFile.files[0];
        const verificationLink = this.imgCertLink.value;

        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const certData = {
                    type: 'image',
                    title,
                    issuer,
                    date,
                    fileURL: event.target.result, // This is a base64 data URL for the image
                    fileName: file.name,
                    verificationLink
                };
                displayCertificate(certData);
                // saveCertificateToStorage(certData); // For localStorage
                // TODO: Future: uploadToServer(file, { title, issuer, date, type: 'image', verificationLink });
            }
            reader.readAsDataURL(file); // Read image as Data URL
        }
        this.reset();
        hideAllCertForms();
    });

    newPdfCertificateForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const title = this.pdfCertTitle.value;
        const issuer = this.pdfCertIssuer.value;
        const date = this.pdfCertDate.value;
        const file = this.certPdfFile.files[0];
        const verificationLink = this.pdfCertLink.value;

        if (file) {
            // For PDFs, we'll use URL.createObjectURL for direct linking
            // Storing the actual file object for potential upload later is also an option
            const fileURL = URL.createObjectURL(file);
            const certData = {
                type: 'pdf',
                title,
                issuer,
                date,
                fileURL: fileURL, // This is a blob URL
                fileName: file.name,
                verificationLink
                // originalFile: file // Optional: keep original file object if you plan to upload
            };
            displayCertificate(certData);
            // saveCertificateToStorage(certData); // For localStorage
            // TODO: Future: uploadToServer(file, { title, issuer, date, type: 'pdf', verificationLink });
        }
        this.reset();
        hideAllCertForms();
    });

    // --- Display Certificate ---
    function displayCertificate(certData) {
        const item = document.createElement('div');
        item.classList.add('certificate-item');

        let previewHTML = '';
        if (certData.type === 'image') {
            previewHTML = `<img src="${certData.fileURL}" alt="${certData.title}">`;
        } else if (certData.type === 'pdf') {
            // You can use a PDF icon here
            previewHTML = `<span class="pdf-icon" title="${certData.fileName}"></span>`;
        }

        item.innerHTML = `
            <div class="cert-preview">
                ${previewHTML}
            </div>
            <h4>${certData.title}</h4>
            <p><strong>Issuer:</strong> ${certData.issuer}</p>
            <p><strong>Date:</strong> ${certData.date}</p>
            <div class="cert-links">
                ${certData.type === 'pdf' ? `<a href="${certData.fileURL}" target="_blank" title="Open ${certData.fileName}">View PDF</a>` : ''}
                ${certData.type === 'image' ? `<a href="${certData.fileURL}" target="_blank" title="View Full Image">View Image</a>` : ''}
                ${certData.verificationLink ? `<a href="${certData.verificationLink}" target="_blank" class="verification-link">Verify</a>` : ''}
            </div>
        `;
        certificateList.appendChild(item);

        // Important for PDF blob URLs:
        // If you are NOT storing these blob URLs (e.g. in localStorage for reload)
        // and they are only for immediate viewing, you might consider revoking them
        // when the element is removed or page unloads to free resources.
        // For this example, we'll keep it simple. If using localStorage, you'd need to
        // re-create blob URLs from stored File objects on load, or store base64 for PDFs too (larger).
    }

    // --- Placeholder for server upload logic ---
    // async function uploadToServer(file, metadata) {
    //     const formData = new FormData();
    //     formData.append('certificateFile', file);
    //     formData.append('title', metadata.title);
    //     formData.append('issuer', metadata.issuer);
    //     formData.append('date', metadata.date);
    //     formData.append('type', metadata.type);
    //     if (metadata.verificationLink) {
    //         formData.append('verificationLink', metadata.verificationLink);
    //     }
    //
    //     try {
    //         const response = await fetch('/api/upload-certificate', { // Example endpoint
    //             method: 'POST',
    //             body: formData
    //             // Add headers if needed, e.g., for authentication
    //         });
    //         if (response.ok) {
    //             const result = await response.json();
    //             console.log('Upload successful:', result);
    //             // Update UI, maybe with server-provided URL or ID
    //             // displayCertificate({ ...metadata, fileURL: result.filePathOnServer });
    //         } else {
    //             console.error('Upload failed:', response.statusText);
    //             alert('Upload failed. Please try again.');
    //         }
    //     } catch (error) {
    //         console.error('Error uploading:', error);
    //         alert('Error uploading. Please check console.');
    //     }
    // }

    // --- Optional: Basic LocalStorage for persistence (Simple example) ---
    // This would require more robust handling for File objects if you want to truly persist them
    // or re-create them from stored data. For simplicity, this example primarily deals with URLs.
    // See previous examples for localStorage if you want to add it.
    // Storing actual File objects in localStorage is tricky. Usually, you store metadata
    // and for images, base64 data. For PDFs, you'd typically re-prompt or use server storage.
});