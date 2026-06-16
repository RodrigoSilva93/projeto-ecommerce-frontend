# **Projeto Final - Linguagens de Apresentação e Estruturação de Conteúdo**

### Projeto desenvolvido como trabalho final da disciplina Linguagens de Apresentação e Estruturação de Conteúdo do curso da UTFPR - Câmpus Pato Branco (UTFPR-PB).
  
### **👥 Integrantes**
Rodrigo dos Santos Silva  
Newton Filipe Nied
 
### **📖 Sobre o Projeto**
O sistema foi construído utilizando React para a interface, componentes do Shadcn/UI com Base UI e estilização através do Tailwind CSS.
 
### **🚀 Tecnologias Utilizadas**
- React
- JavaScript
- Shadcn/UI (Base UI)
- Tailwind CSS
- Vite

### **Links Oficiais**
- React: https://react.dev/
- JavaScript: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript
- Shadcn/UI: https://ui.shadcn.com/
- Tailwind CSS: https://tailwindcss.com/
- Vite: https://vitejs.dev/

### **📦 Pré-requisitos**
Antes de executar o projeto, instale:
> ### [Node.js](https://nodejs.org/)

Verifique a instalação:
```
node --version
npm --version
```

### **⚙️ Instalação do Projeto**
Clone o repositório:

`git clone <URL_DO_REPOSITORIO>`

Entre na pasta:

`cd nome-do-projeto`

Instale as dependências:

`npm install`

Execute o projeto:

`npm run dev`

A aplicação estará disponível em:  
http://localhost:5173

### **🛠️ Criação de um Projeto React com Vite**
Caso deseje recriar o projeto do zero:

`npm create vite@latest`

Escolha:

> Framework: React
> Variant: JavaScript

Instale as dependências:

`npm install`

Execute:

`npm run dev`

### **🎨 Instalação do Tailwind CSS**
Instale o Tailwind:
`npm install tailwindcss @tailwindcss/vite`

Configure o plugin no arquivo vite.config.js:
```
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
```

Importe o Tailwind em seu CSS principal:
`@import "tailwindcss";`

### **🧩 Instalação do Shadcn/UI**

Inicialize o Shadcn:
`npx shadcn@latest init`

Adicione componentes:
`npx shadcn@latest add button`

Exemplo:
```
npx shadcn@latest add card
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
```

### **📂 Estrutura do Projeto**
public/  
└── data/  
src/  
├── assets/  
├── components/  
├── pages/  
├── services/  
├── hooks/  
├── App.jsx  
└── main.jsx

## 🔧 Solução de Problemas
> [!WARNING]
> Erro ao instalar dependências

Caso ocorram erros relacionados ao:
> package.json  
> package-lock.json  
> node_modules  

Remova as dependências e reinstale:

### Linux / macOS  
```
rm -rf node_modules
rm package-lock.json

npm install
```

### Windows PowerShell
```
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json

npm install
```

> [!WARNING]
> Erro "Cannot find module"

Tente limpar o cache do npm:
```
npm cache clean --force
npm install
```

> [!WARNING]
> Erro relacionado ao Shadcn/UI

Reinstale os componentes:

`npx shadcn@latest init`

ou

`npx shadcn@latest add button`

### **📄 Licença**

Projeto desenvolvido exclusivamente para fins acadêmicos na disciplina de Linguagens de Apresentação e Estruturação de Conteúdo da UTFPR-PB.