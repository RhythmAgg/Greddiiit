FROM node:19.4.0

# Install Dependencies
COPY package*.json ./

RUN npm install --silent

# Copy app source code
COPY . .

EXPOSE 3500
# Exports

CMD ["npm","start"]