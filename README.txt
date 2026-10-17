AK SECURITY FORCE PVT. LTD. WEBSITE

Files:
- index.html: generated website page; open this file to view the site
- index.template.html: page shell and section include locations
- header.html, hero.html, commitments.html, services.html, approach.html, about.html, leadership.html, licenses.html, contact.html, footer.html, whatsapp.html: separate HTML parts, all in this same folder
- build.js: combines the HTML parts into index.html
- vercel.json: configures Vercel to publish only the generated site and required assets from dist/
- styles.css: black, white and red responsive design
- script.js: mobile navigation, current year and demo form feedback
- logo.jpeg: logo image supplied by you
- certificate-incorporation-redacted.png and private-security-license-redacted.png: certificate images displayed in the licenses section with sensitive details redacted

To edit and preview:
1. Extract the ZIP file.
2. Keep all files together in the same folder.
3. Edit the relevant HTML part.
4. Run `node build.js` from this folder to regenerate index.html and prepare dist/.
5. Open index.html in your browser.

Important: The contact form is front-end only. It does not send enquiries. Connect it to your preferred form provider or backend before publishing. Replace the sample contact form with your real business phone/email details as needed.

Security and deployment:
- The public static page does not use URL query parameters to generate or modify its content. URL fragments are used only for in-page navigation. Visitors can change their own address bar, but that does not edit the published website.
- A Content Security Policy and referrer policy are included in the page. Security headers such as HSTS, X-Content-Type-Options, frame protections and Permissions-Policy must be configured by the hosting provider; HTML alone cannot enforce them.
- Protect the GitHub repository with restricted write access and branch protection. Never put passwords, API keys or private data in the public site.
- The contact form is a front-end demo, not a secure submission endpoint. Use a trusted form service or a server-side backend with validation, spam protection and HTTPS before accepting enquiries.
- Vercel deploys only dist/, which contains the homepage and assets it needs. Section source files and the build template are not deployed as public routes. `/index.html` redirects to `/`; required CSS, JavaScript and image assets remain directly requestable so the homepage can load.
