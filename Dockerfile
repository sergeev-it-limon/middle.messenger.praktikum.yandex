#syntax=docker/dockerfile:1.2

FROM node:14.16.0 as build-stage
WORKDIR "/app"
COPY ["./package.json", "./package-lock.json", "./"]
RUN npm ci
COPY ["./", "./"]
RUN npm run build
EXPOSE 3000
CMD npm run prod