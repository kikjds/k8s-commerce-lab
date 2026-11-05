module "s3" {
  source      = "./modules/s3"
  bucket_name = var.bucket_name
}

module "cloudfront" {
  source = "./modules/cloudfront"

  bucket_id                   = module.s3.id
  bucket_arn                  = module.s3.arn
  bucket_regional_domain_name = module.s3.regional_domain_name
}