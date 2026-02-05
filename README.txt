* Estructura del proyecto
matchflow/
│
├── backend/
│   ├── db.json               # Base de datos simulada por json-server
│   ├── server.js             # Configuración personalizada de json-server si es necesario
│   └── README.md             # Instrucciones de inicio del json-server
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   │
│   ├── src/
│   │   ├── api/              # Funciones para consumir json-server con fetch
│   │   │   ├── candidates.js
│   │   │   ├── companies.js
│   │   │   ├── jobs.js
│   │   │   └── matches.js
│   │   │
│   │   ├── components/       # Componentes reutilizables
│   │   │   ├── CandidateCard.js
│   │   │   ├── JobCard.js
│   │   │   ├── MatchCard.js
│   │   │   └── ReservationModal.js
│   │   │
│   │   ├── pages/            # Páginas por rol y funcionalidad
│   │   │   ├── CandidateDashboard.js
│   │   │   ├── CompanyDashboard.js
│   │   │   ├── CandidateProfile.js
│   │   │   ├── JobManagement.js
│   │   │   └── MatchManagement.js
│   │   │
│   │   ├── utils/            # Funciones de ayuda (cache, cookies, validaciones)
│   │   │   ├── cache.js
│   │   │   ├── auth.js
│   │   │   └── reservation.js
│   │   │
│   │   ├── App.js
│   │   ├── index.js
│   │   └── routes.js
│   │
│   └── package.json
│
├── .gitignore
├── README.md                 # Documentación general del proyecto
└── LICENSE
