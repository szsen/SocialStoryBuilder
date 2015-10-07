FROM node:0.12
COPY ssbuilder-web .
RUN npm install
EXPOSE 3000
CMD ["node", "/bin/www"]