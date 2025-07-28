FROM node:20-alpine 

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ENV NODE_ENV=development
ENV VITE_APP_API_URL=https://pokeapi.co/api/v2

EXPOSE 5173

CMD ["npm", "run", "dev"]