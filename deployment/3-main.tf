terraform {
  backend "s3" {
    bucket  = "sns-app-terraform-state" # Your unique AWS S3 bucket
    key     = "develop/snsapp.tfstate"  # create a sub-folder called develop
    region  = var.aws_region            # Your AWS region
    encrypt = true
  }
}

locals {
  prefix = "${var.prefix}-${terraform.workspace}"

  common_tags = {
    Environment = terraform.workspace
    Project     = var.project
    ManagedBy   = "Terraform"
    Owner       = "sohrab hossain" # Your fullname
  }
}
