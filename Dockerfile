# Build this image by running this command `docker build -t weather-react-app .`
# Then you can start a container using `docker run --name weather-react-app --rm -d -p 4000:4000 weather-react-app`
# Finally, to stop the app, run `docker container stop weather-react-app` 
FROM node:12-alpine
RUN mkdir -p /code/web
WORKDIR /code/web/
COPY package.json ./
RUN npm install --ignore-scripts
RUN npm rebuild node-sass --force 
RUN npm install node-sass
COPY . .
RUN npm run build
RUN npm run build:ssr
EXPOSE 4000
CMD ["npm", "run", "start:ssr"]