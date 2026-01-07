# My Happy Little School - Site Web

Site vitrine moderne pour My Happy Little School, école de cours d'anglais ludiques pour enfants à Bois-Colombes.

## Structure du projet

```
My Happy Little School Conquete du Monde/
├── index.html          # Page principale
├── css/
│   ├── style.css       # Styles principaux
│   ├── animations.css  # Animations et transitions
│   └── responsive.css  # Styles responsive (mobile/tablet)
├── js/
│   └── main.js         # JavaScript (menu, carrousel, scroll)
├── assets/
│   ├── images/
│   │   ├── logo.jpg    # Logo de l'école
│   │   └── gallery/    # Photos des activités
│   └── icons/          # Icônes personnalisées
└── references/         # Fichiers de référence (ne pas déployer)
```

## Technologies utilisées

- **HTML5** - Structure sémantique
- **CSS3** - Styles modernes avec variables CSS
- **JavaScript** - Vanilla JS (pas de framework)
- **AOS.js** - Animations au scroll
- **Google Fonts** - Syne + Questrial

## Comment visualiser le site

### Option 1 : Ouvrir directement
Double-cliquez sur `index.html` pour ouvrir dans votre navigateur.

### Option 2 : Serveur local (recommandé)
```bash
# Avec Python
python -m http.server 8000

# Avec Node.js (si vous avez npx)
npx serve

# Avec VS Code
# Installez l'extension "Live Server" et cliquez sur "Go Live"
```

Puis ouvrez http://localhost:8000

## Déploiement gratuit

### GitHub Pages
1. Créez un repo GitHub
2. Poussez le code
3. Allez dans Settings > Pages
4. Sélectionnez "main" branch
5. Votre site sera sur `https://username.github.io/repo-name`

### Netlify
1. Allez sur [netlify.com](https://netlify.com)
2. Glissez-déposez le dossier du projet
3. Votre site est en ligne !

### Vercel
1. Allez sur [vercel.com](https://vercel.com)
2. Importez depuis GitHub ou uploadez
3. Déploiement automatique

## Personnalisation

### Intégrer Calendly
Dans `index.html`, remplacez le placeholder par :
```html
<div class="calendly-inline-widget"
     data-url="https://calendly.com/VOTRE-LIEN"
     style="min-width:320px;height:630px;">
</div>
<script src="https://assets.calendly.com/assets/external/widget.js" async></script>
```

### Modifier les couleurs
Éditez les variables CSS dans `css/style.css` :
```css
:root {
    --color-primary: #1717F2;    /* Bleu vif */
    --color-secondary: #FFADFF;  /* Rose */
    --color-tertiary: #19D595;   /* Cyan */
    --color-accent: #FFCB05;     /* Jaune */
}
```

### Ajouter des photos
Placez vos images dans `assets/images/gallery/` et mettez à jour les références dans `index.html`.

## Checklist avant mise en ligne

- [ ] Remplacer le logo par une version haute résolution si disponible
- [ ] Ajouter de vraies photos d'Alexia et des ateliers
- [ ] Configurer Calendly et intégrer le widget
- [ ] Vérifier l'email de contact
- [ ] Tester sur mobile et différents navigateurs
- [ ] Ajouter Google Analytics (optionnel)
- [ ] Créer les pages Mentions légales et Politique de confidentialité

## Contact

My Happy Little School
75, rue des Bourguignons
92270 Bois-Colombes

Site actuel : [my-happy-little-school.com](https://www.my-happy-little-school.com)
Instagram : [@my_happy_little_school](https://instagram.com/my_happy_little_school)

---

Créé avec amour par Claude - "Yes you can!" ⭐