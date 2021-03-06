## get ubuntu image
* docker pull ubuntu
* docker run -it ubuntu
* cat /etc/issue  
*   Ubuntu 18.04.4 LTS \n \l

## Server Setup
* Update software
  * Update software： apt update
  * Upgrade software： apt upgrade
  * install ping: apt-get install iputils-ping
  * install ip: apt install -y iproute2
  * convert container to image: docker commit 6bc3ef wenlinux
  * docker attach a453efc
  * Add new user:  adduser $USERNAME
    * adduser jack
    * su jack
    * exit back to root
  * Add user to "sudo" group
    * usermod -aG sudo jackhwl
    * copy ssh pub key to ~/.ssh/authorized_keys
  * Add ssh
    * apt-get install ssh
    * service ssh start
* Create a new user
* Make that user a super user
* Enable login for new user
* disable root login
* Install nginx
  * apt install nginx
  * service nginx start
  * show nginx configuration
  * /etc/nginx/sites-available/default
  * vi /var/www/html/index.html

 * docker run -d -p 8084:80 -p 22:22 -it  wenlinux2
 * docker attach a55
* Install Nodejs and npm
  * sudo apt install nodejs npm
* Install Git
  * sudo apt install git

* Change ownership of the www directory to the current user
  * sudo chown -R $USER:$USER /var/www
  * mkdir /var/www/app
  * cd /var/www/app && git init

* domain -> IP -> Nginx -> Express
  * mkdir -p ui/js ui/html ui/css
  * touch app.js
  * npm init
  * npm i express --save
  <code>
    location / {
      proxy_pass URL_TO_PROXY_TO
    }
  </code>
  * sudo vi /etc/nginx/sites-available/default
  * sudo service nginx reload
  * node app.js
* Process Manager
  * Install PM2: sudo npm i -g pm2
  * Start PM2: pm2 start app.js
  * Setup auto restart: pm2 startup

## Bash Basics
* find all log files in /var/log
* find /var/log/nginx -type f -name "*.log"
* grep -i 'jack' /var/www
* zgrep FILE search inside gzip file

## Nginx Config Basics
## Security
* read Auth.log check ip in MaxMind
* install unattended upgrades
* sudo apt install unattended-upgrades
* install nmap
* sudo apt install nmap
* nmap 192.168.1.107
* nmap -sV 192.168.1.170
* explainshell.com
* Download setup script from nodesource
* curl -sL https://deb.nodesource.com/setup_10.x -o nodesource_setup.sh
* Run Script: sudo bash nodesource_setup.sh
* Install nodejs: sudo apt install nodejs
* Update outdated package sudo npm update -g
## HTTPS
* service ssh start
* cd /var/www/app && pm2 start app.js
* service nginx start
## Containers Basics
* Containers & Microservices
  * Lightweight
  * Portable
  * Easier for development
  * Easier to manage
  * Faster startup
  * Decouple application from infrastructre
* Docker & Orchestration:
  * docker
  * Amazon ECS
  * Apache Mesos
  * CoreOS rkt
  * Orchestration:
    * Docker Swarm
    * Amazon EKS
    * Apache Mesos
    * AKS
* Load Balancers
  * Scheduling Algorithms
  * Round Robin
  * IP Hashing
  * Random Choice
  * Least Connections
  * Least Load
  * top, htop, f5-> tree mode
  * https://docs.nginx.com/nginx/admin-guide/load-balancer/http-load-balancer/
* Deployment
  * ANSIBLE
  * VAGRANT
  * puppet
## Saving Data
* Files & Databases Overview
* Databases:
  * relational
    * SQL
    * Tables
    * Related data
    * Strict structure
  * non-relational
    * NoSQL
    * Data agnostic
    * Loose structure
  * Redis
  * WebSockets
   