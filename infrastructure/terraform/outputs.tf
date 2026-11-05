output "cloudfront_distribution_id" {
  description = "ID of the product image CloudFront distribution."
  value       = module.cloudfront.distribution_id
}

output "cloudfront_domain_name" {
  description = "Domain name of the product image CloudFront distribution."
  value       = module.cloudfront.domain_name
}