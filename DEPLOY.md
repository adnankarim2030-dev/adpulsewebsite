# AdPulse IMC website — Hostinger upload

Plain static site (HTML/CSS/JS). No Node, PHP or database needed.

1. Backup: hPanel → Files → Backups (or download current public_html).
2. From your CURRENT site, keep/copy: `/logo.png`, the whole `/images/brands/` folder (client logos) and the whole `/images/about/` folder (team, CEO and Chairman photos).
3. hPanel → File Manager → public_html → Upload this zip → Extract.
   Make sure `index.html`, `.htaccess`, `assets/`, `services/` … sit directly inside public_html (not inside an extra folder).
4. Enable SSL for adpulse.pk in hPanel (the .htaccess forces https).
5. Open https://adpulse.pk and test: menu, service pages, blog, contact form (opens WhatsApp).
6. If you still see the old site: hPanel → Cache Manager → Purge, then hard-refresh the browser.

Edit before going live: homepage stats (search `data-count` in index.html).
