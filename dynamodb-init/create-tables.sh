echo "Creating tables in DynamoDB Local..."

aws dynamodb create-table \
    --table-name Customers \
    --attribute-definitions AttributeName=id,AttributeType=S \
    --key-schema AttributeName=id,KeyType=HASH \
    --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 \
    --endpoint-url http://localhost:8000

if [ $? -eq 0 ]; then
  echo "Tables created successfully!"
else
  echo "Failed to create tables."
fi
