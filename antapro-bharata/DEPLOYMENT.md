# 🚀 DEPLOYMENT GUIDE - ANTAPRO BHARATA

## 📋 Overview

Panduan lengkap untuk deploy landing page Antapro Bharata ke production.

**Estimated Time:** 2-3 jam  
**Difficulty:** Beginner to Intermediate  
**Prerequisites:** Domain, Hosting, FTP/cPanel access

---

## 📦 Files yang Perlu Di-Upload

```
/
├── index.html          (Landing page utama - 900+ lines)
├── styles.css          (External stylesheet - optional)
├── script.js           (External JavaScript - optional)
└── img/               (Folder gambar)
    ├── product.webp
    ├── bpom-certificate.webp
    ├── halal-certificate.webp
    ├── testimonial-ahmad.webp
    ├── testimonial-maria.webp
    ├── testimonial-budi.webp
    └── og-image.jpg
```

**Note:** File `index.html` saat ini masih menggunakan inline CSS. Untuk performance optimal, bisa dipindahkan ke external `styles.css`.

---

## 🔧 STEP 1: Persiapan Assets

### 1.1 Buat Folder Gambar

```bash
mkdir img
cd img
```

### 1.2 Siapkan Gambar Produk

**Spesifikasi:**
- Format: WebP (fallback JPEG)
- Ukuran: 500x600px (portrait)
- File size: < 100KB
- Quality: 80-85%

**Tools untuk Compress:**
- TinyPNG: https://tinypng.com/
- Squoosh: https://squoosh.app/
- Online WebP Converter: https://cloudconvert.com/

**Cara Convert ke WebP:**
```bash
# Jika punya ImageMagick
convert product.jpg -quality 85 product.webp

# Atau gunakan online tools
```

### 1.3 Siapkan Sertifikat Legalitas

**BPOM Certificate:**
- Scan asli dalam HD
- Crop clean (no background)
- Convert to WebP
- Size: 150x150px minimum

**Halal Certificate:**
- Same as BPOM

### 1.4 Siapkan Foto Testimoni

**Spesifikasi:**
- Format: WebP
- Ukuran: 60x60px (circle crop)
- 3 testimoni minimum

---

## 🌐 STEP 2: Setup Domain & Hosting

### 2.1 Domain Setup

**Jika Belum Punya Domain:**
1. Beli domain di:
   - Niagahoster
   - Rumahweb
   - Namecheap
   - GoDaddy

2. Rekomendasi nama domain:
   - antaprobharata.com ✅
   - antaprobharata.id
   - antaprobharata.co.id

**Jika Sudah Punya Domain:**
1. Login ke domain registrar
2. Point DNS ke hosting

### 2.2 Hosting Setup

**Rekomendasi Hosting:**
- **Budget:** Niagahoster (Rp 20.000/bulan)
- **Performance:** Cloudways (Rp 150.000/bulan)
- **Enterprise:** AWS S3 + CloudFront

**Minimum Requirements:**
- PHP 7.4+ (optional, untuk static HTML tidak perlu)
- SSL Certificate (MUST HAVE)
- Disk Space: 500MB minimum
- Bandwidth: Unlimited atau 10GB/month

### 2.3 SSL Certificate Installation

**Jika Menggunakan cPanel:**
1. Login cPanel
2. Go to: **SSL/TLS Status**
3. Click: **Run AutoSSL**
4. Wait 5-10 minutes

**Verify SSL:**
1. Open: https://www.ssllabs.com/ssltest/
2. Enter your domain
3. Grade should be A or A+

---

## 📤 STEP 3: Upload Files

### Method 1: FTP Upload (Recommended)

**Tools:**
- FileZilla (Free): https://filezilla-project.org/
- WinSCP (Windows)
- Cyberduck (Mac)

**Steps:**
1. Open FileZilla
2. Connect dengan credentials dari hosting
   - Host: ftp.yourdomain.com
   - Username: (dari hosting)
   - Password: (dari hosting)
   - Port: 21

3. Navigate ke folder: `/public_html/` atau `/www/`

4. Upload files:
   - index.html → root folder
   - img/ folder → drag entire folder

5. Set permissions:
   - index.html: 644
   - img/ folder: 755
   - Images: 644

### Method 2: cPanel File Manager

**Steps:**
1. Login cPanel
2. Click: **File Manager**
3. Navigate to: `/public_html/`
4. Click: **Upload**
5. Drag & drop:
   - index.html
   - img/ folder (create first, then upload images)

### Method 3: Git Deploy (Advanced)

```bash
# Init git repo
git init
git add .
git commit -m "Initial commit"

# Push to hosting (jika support Git)
git remote add origin your-hosting-git-url
git push origin main
```

---

## 🔄 STEP 4: Update Placeholders

### 4.1 Replace Domain URLs

**Open index.html dan replace:**

```bash
# Find & Replace
Find: https://www.antaprobharata.com/
Replace: https://yourdomain.com/
```

**Locations to update:**
- Line ~13: Canonical URL
- Line ~17-18: OG tags
- Line ~24: Twitter card

### 4.2 Update Image Paths

**Check all image sources:**

```html
<!-- Make sure paths are correct -->
<img src="img/product.webp" alt="..." />
<img src="img/bpom-certificate.webp" alt="..." />
<img src="img/halal-certificate.webp" alt="..." />
```

### 4.3 Test All WhatsApp Links

**Open browser, test these links:**
1. Hero CTA button
2. Product section CTA
3. Pricing buttons (1 botol, 2 botol)
4. Floating WhatsApp button
5. Sticky header button

**Verify WhatsApp opens with correct message.**

---

## 📊 STEP 5: Install Tracking Codes

### 5.1 Google Analytics 4

**Get Tracking Code:**
1. Go to: https://analytics.google.com/
2. Create property: "Antapro Bharata"
3. Copy tracking code

**Install:**
Add before `</head>` in index.html:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### 5.2 Google Tag Manager (Optional)

**Setup:**
1. Create GTM account
2. Get container code
3. Add to `<head>` and after `<body>`

### 5.3 Facebook Pixel (Optional)

```html
<!-- Facebook Pixel Code -->
<script>
!function(f,b,e,v,n,t,s){...}
</script>
```

---

## ✅ STEP 6: Testing & Validation

### 6.1 Visual Testing

**Open website di:**
- Desktop Chrome
- Desktop Firefox
- Mobile Chrome (Android)
- Mobile Safari (iOS)

**Check:**
- [ ] Layout tidak pecah
- [ ] Gambar semua load
- [ ] Text readable
- [ ] Colors correct

### 6.2 Functional Testing

**Test setiap element:**
- [ ] Sticky header muncul saat scroll
- [ ] FAQ accordion buka/tutup
- [ ] Smooth scroll ke section
- [ ] WhatsApp links berfungsi
- [ ] Floating WA button visible

### 6.3 Performance Testing

**Test di PageSpeed Insights:**
1. Go to: https://pagespeed.web.dev/
2. Enter your URL
3. Click: Analyze

**Target Scores:**
- Mobile: >95
- Desktop: >98

**If score low, optimize:**
- Compress images more
- Enable Gzip compression
- Add caching headers

### 6.4 SEO Validation

**HTML Validation:**
- Go to: https://validator.w3.org/
- Enter URL
- Fix any errors

**Rich Results Test:**
- Go to: https://search.google.com/test/rich-results
- Enter URL
- Check Product, FAQ, Organization schema

---

## 📱 STEP 7: Google Search Console Setup

### 7.1 Add Property

1. Go to: https://search.google.com/search-console/
2. Click: **Add Property**
3. Choose: **URL prefix**
4. Enter: https://yourdomain.com/

### 7.2 Verify Ownership

**Method 1: HTML File Upload**
- Download verification file
- Upload to root folder
- Click verify

**Method 2: HTML Tag**
- Copy meta tag
- Add to `<head>`
- Click verify

### 7.3 Submit Sitemap

**Create sitemap.xml:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourdomain.com/</loc>
    <lastmod>2026-06-26</lastmod>
    <priority>1.0</priority>
  </url>
</urlset>
```

**Submit:**
1. Upload sitemap.xml to root
2. In GSC, go to: **Sitemaps**
3. Enter: sitemap.xml
4. Click: Submit

---

## 🚀 STEP 8: Launch Checklist

### Final Checks Before Going Live

- [ ] SSL active (HTTPS works)
- [ ] All images loading
- [ ] All links working
- [ ] WhatsApp numbers correct
- [ ] Google Analytics tracking
- [ ] Mobile responsive
- [ ] PageSpeed score >90
- [ ] No console errors
- [ ] Privacy Policy page ready
- [ ] Terms page ready

### Go Live!

✅ Website is now LIVE and ready for Google Ads traffic!

---

## 📈 POST-LAUNCH (Week 1)

### Day 1
- [ ] Monitor Google Analytics realtime
- [ ] Check server uptime
- [ ] Test from different devices
- [ ] Respond to first WhatsApp inquiries

### Day 2-3
- [ ] Review bounce rate
- [ ] Check avg. time on page
- [ ] Monitor conversion rate

### Day 7
- [ ] Full week analytics review
- [ ] Identify improvement areas
- [ ] Plan A/B tests

---

## 🐛 Troubleshooting

### Issue: Images not loading
**Solution:**
- Check file paths (case-sensitive)
- Verify file permissions (644)
- Check MIME types

### Issue: WhatsApp links not working
**Solution:**
- Verify number format: 6282225930191
- Check URL encoding
- Test on different devices

### Issue: Slow loading
**Solution:**
- Compress images more
- Enable Gzip on server
- Use CDN

### Issue: SSL not working
**Solution:**
- Wait 24h for propagation
- Re-run AutoSSL
- Contact hosting support

---

**🎉 Deployment Complete!**

Landing page siap menerima traffic dari Google Ads.

**Next:** Setup Google Ads Campaign (lihat README.md section Scaling Campaign)
