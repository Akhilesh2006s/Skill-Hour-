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
https://www.skillhour.net/
https://www.skillhour.net/privacy
https://www.skillhour.net/downloads/1.0.0/SkillHour-Setup-1.0.0.exe
```

Microsoft Partner Center → Properties → Privacy policy URL:

```text
https://www.skillhour.net/privacy
```

Refresh the installer after a desktop build:

```powershell
node scripts/publish-installer.mjs
```
