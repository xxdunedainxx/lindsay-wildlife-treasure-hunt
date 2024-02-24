* EC2 with Amazon Linux AMI (will need docker / docker-compose installed via deployment setup)
* ALB - 
  ** update security groups to allow https inbound / outbound traffic 
* Domain for ALB
* SSL cert requested by CA - request ACM cert
  ** approve ACM cert via dns
 * Point ALB to AWS target group, ex https://us-west-2.console.aws.amazon.com/ec2/home?region=us-west-2#TargetGroup:targetGroupArn=arn:aws:elasticloadbalancing:us-west-2:389658285858:targetgroup/LindsayAppTargets/b8ad7e269f68db9d