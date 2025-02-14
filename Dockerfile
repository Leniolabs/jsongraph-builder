# Base image for building applications
FROM node:22-alpine AS base

#start build ui
FROM base AS ui-builder

ARG VITE_OPENAI_API_KEY

ENV VITE_OPENAI_API_KEY=${VITE_OPENAI_API_KEY}

WORKDIR /app

COPY ./package*.json ./
RUN npm install

COPY . .

RUN npm run build


#creating nginx server
FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY ./nginx/nginx.conf /etc/nginx/conf.d/

#service builder is the name of the tool, its used to build the forms
COPY --from=ui-builder /app/dist /app

EXPOSE 80
