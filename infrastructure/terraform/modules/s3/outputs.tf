output "id" {
  description = "ID of the product image bucket"
  value       = aws_s3_bucket.s3_bucket.id
}

output "arn" {
  description = "ARN of the product image bucket"
  value       = aws_s3_bucket.s3_bucket.arn
}

output "regional_domain_name" {
  description = "Regional domain name of the product image bucket"
  value       = aws_s3_bucket.s3_bucket.bucket_regional_domain_name
}