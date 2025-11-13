#!/bin/bash

# Script to add LocalBusiness schema to all location pages

# Array of location slugs
locations=(
  "augsburg" "bobingen" "ulm" "neu-ulm" "memmingen" "landsberg"
  "koenigsbrunn" "gersthofen" "neusaess" "stadtbergen" "schwabmuenchen"
  "friedberg" "aichach" "kaufbeuren" "mindelheim" "bad-woerishofen"
  "ottobeuren" "gutenzell-huerbel" "blaustein" "laupheim" "erbach"
  "guenzburg" "krumbach" "bad-wurzach" "leutkirch"
)

for location in "${locations[@]}"; do
  file="src/app/standorte/$location/page.tsx"

  if [ ! -f "$file" ]; then
    echo "File not found: $file"
    continue
  fi

  echo "Processing $location..."

  # Check if import already exists
  if grep -q "LocationPageSchema" "$file"; then
    echo "  Schema already added to $location, skipping..."
    continue
  fi

  # Add import after the last import statement
  sed -i '' '/^import.*from.*lucide-react";$/a\
import { LocationPageSchema } from "@/components/schema/local-business-schema";\
import { locationData } from "@/lib/location-data";
' "$file"

  # Add schema component after "export default function"
  sed -i '' '/^export default function.*() {$/a\
\  const locationSlug = "'"$location"'";\
\  const data = locationData[locationSlug];\
\
\  return (\
\    <>\
\      {/* Schema.org LocalBusiness Structured Data */}\
\      <LocationPageSchema\
\        cityName={data.cityName}\
\        postalCode={data.postalCode}\
\        region={data.region}\
\        latitude={data.latitude}\
\        longitude={data.longitude}\
\        serviceCities={data.serviceCities}\
\      />
' "$file"

  # Replace "return (" with just newline after the schema
  sed -i '' 's/^export default function.*() {$/&\
/; s/^\  return ($//' "$file"

  echo "  ✓ Added schema to $location"
done

echo "Done! Schema added to all location pages."
