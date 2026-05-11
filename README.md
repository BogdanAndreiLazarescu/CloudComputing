# CloudComputing
# 🚗 Car Marketplace

O aplicatie web moderna pentru gestionarea anunturilor auto, dezvoltata in cadrul cursului de **Cloud Computing 2026**.

---

## 📋 Descriere

Car Marketplace permite utilizatorilor sa adauge, vizualizeze, editeze si stearga anunturi auto, sa trimita mesaje prin email si sa interactioneze cu un chatbot bazat pe inteligenta artificiala.

---

## 🚀 Tehnologii Folosite

| Tehnologie | Rol |
|---|---|
| **Next.js 16** | Framework full-stack cu App Router |
| **React 19** | Interfata utilizatorului |
| **Tailwind CSS** | Stilizare |
| **MongoDB Atlas** | Baza de date NoSQL in cloud |
| **SendGrid** | Trimitere email-uri |
| **Groq AI (LLaMA 3.1)** | Chatbot AI |
| **Vercel** | Deployment automat |
| **AWS EC2 + Docker** | Deployment pe masina virtuala |
| **Nginx** | Server web pe AWS |

---

## ✨ Functionalitati

- ✅ **CRUD complet** — adaugare, vizualizare, editare, stergere anunturi auto
- ✅ **Formular de contact** — trimitere email prin SendGrid
- ✅ **Chatbot AI** — conversatie cu modelul LLaMA 3.1 prin Groq
- ✅ **Deploy pe Vercel** — disponibil public cu HTTPS
- ✅ **Deploy pe AWS EC2** — containerizat cu Docker

---

## 📁 Structura Proiectului

```
my-app/
├── app/
│   ├── api/
│   │   ├── records/
│   │   │   ├── route.js        # GET, POST
│   │   │   └── [id]/
│   │   │       └── route.js    # GET, PUT, DELETE
│   │   ├── contact/
│   │   │   └── route.js        # POST - trimitere email
│   │   └── chat/
│   │       └── route.js        # POST - chatbot AI
│   ├── records/
│   │   ├── create/
│   │   │   └── page.jsx        # Pagina creare anunt
│   │   └── edit/
│   │       └── page.jsx        # Pagina editare anunt
│   ├── contact/
│   │   └── page.jsx            # Pagina contact
│   ├── chat/
│   │   └── page.jsx            # Pagina chatbot
│   └── page.js                 # Pagina principala
├── components/
│   ├── MainPage.jsx            # Lista anunturi
│   ├── RecordForm.jsx          # Formular anunt
│   ├── ContactForm.jsx         # Formular contact
│   ├── ChatComponent.jsx       # Interfata chatbot
│   ├── MessageBox.jsx          # Afisare mesaje chat
│   └── Spinner.jsx             # Loading spinner
├── lib/
│   ├── mongodb.js              # Conexiune MongoDB
│   └── groq.js                 # Conexiune Groq AI
├── utils/
│   ├── recordsFunctions.js     # Functii CRUD
│   ├── contactFunctions.js     # Functii contact
│   └── constants.js            # Valori default
├── Dockerfile
├── .dockerignore
└── .env                        # Variabile de mediu (nu se uploadeaza pe Git)
```

---

## ⚙️ Instalare si Rulare Locala

### 1. Cloneaza repository-ul
```bash
git clone https://github.com/BogdanAndreiLazarescu/CloudComputing.git
cd CloudComputing/my-app
```

### 2. Instaleaza dependentele
```bash
npm install
```

### 3. Configureaza variabilele de mediu
Creaza un fisier `.env` in `my-app/` cu urmatorul continut:

```dotenv
NEXT_ATLAS_URI=mongodb://username:password@cluster.mongodb.net/...
NEXT_ATLAS_DATABASE=CloudComputing
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxx
SENDGRID_FROM_EMAIL=email@example.com
SENDGRID_TO_EMAIL=email@example.com
XAI_API_KEY=gsk_xxxxxxxxxxxxxxxx
```

### 4. Porneste serverul de dezvoltare
```bash
npm run dev
```

Acceseaza aplicatia la `http://localhost:3000`

---

## 🐳 Rulare cu Docker

```bash
# Build imagine Docker
docker build -t nextjs-docker .

# Pornire container
docker run -d --restart always -p 3000:3000 nextjs-docker
```

---

## 🌐 Deploy

### Vercel
Aplicatia este disponibila la: `https://cloud-computing-snowy.vercel.app`

### AWS EC2
Aplicatia ruleaza pe o instanta EC2 t2.micro cu Ubuntu, accesibila la IP-ul Elastic asociat pe portul 3000.

---

## 📌 API Endpoints

| Method | Endpoint | Descriere |
|---|---|---|
| GET | `/api/records` | Returneaza toate anunturile |
| POST | `/api/records` | Creeaza un anunt nou |
| GET | `/api/records/[id]` | Returneaza un anunt dupa ID |
| PUT | `/api/records/[id]` | Actualizeaza un anunt |
| DELETE | `/api/records/[id]` | Sterge un anunt |
| POST | `/api/contact` | Trimite email prin SendGrid |
| POST | `/api/chat` | Interactiune cu chatbot-ul AI |

---

## 👤 Autor

**Bogdan Andrei Lazarescu** — Cloud Computing 2026
