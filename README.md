# SkillHour static site

```text
develop/
  index.html
  styles.css
  app.js
  assets/skillhour.jpeg
  downloads/1.0.0/SkillHour-Setup-1.0.0.exe
  downloads/latest.json
  scripts/publish-installer.mjs
```

Open `index.html` locally. On your domain:

```text
https://YOUR_DOMAIN/
https://YOUR_DOMAIN/privacy.html
https://YOUR_DOMAIN/downloads/1.0.0/SkillHour-Setup-1.0.0.exe
```

Microsoft Partner Center → Properties → Privacy policy URL:

```text
https://YOUR_DOMAIN/privacy.html
```

Refresh the installer after a desktop build:

```powershell
node scripts/publish-installer.mjs
```
