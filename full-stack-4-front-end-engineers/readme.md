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
