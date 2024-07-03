# Use the official PHP image as a base image
FROM php:8-fpm
 
# Instalamos las dependencias necesarias
RUN apt-get update && apt-get install -y \
    build-essential \
    libzip-dev \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    libonig-dev \
    locales \
    zip \
    jpegoptim optipng pngquant gifsicle \
    vim \
    git \
    curl
 
# Instalamos extensiones de PHP
RUN docker-php-ext-install pdo_mysql zip exif pcntl
RUN docker-php-ext-configure gd --with-freetype --with-jpeg
RUN docker-php-ext-install gd
 
# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
 
# Set the working directory
WORKDIR /var/www/html
 
# Add Composer's global bin directory to the PATH
ENV PATH $PATH:/root/.composer/vendor/bin