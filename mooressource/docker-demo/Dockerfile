#Always use 18 pretty much
FROM node:18

#Set the directory, needs to be set once..?
WORKDIR /usr/src/app

#Copy package files and install dependencies
COPY package*.json ./
RUN npm install

#Rest of the code
COPY . . 

#Expose localhost
EXPOSE 3000

#USed to run app
CMD ["npm", "start"]
