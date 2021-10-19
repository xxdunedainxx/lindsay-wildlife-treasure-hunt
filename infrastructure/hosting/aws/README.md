* EC2 with Amazon Linux AMI (will need docker / docker-compose installed via deployment setup)
* ALB - 
  ** update security groups to allow https inbound / outbound traffic 
* Domain for ALB
* SSL cert requested by CA - request ACM cert
  ** approve ACM cert via dns


deploy script gets stuck on .configure npm cache file (possibly due to locking??)