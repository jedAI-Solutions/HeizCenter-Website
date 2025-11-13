#!/bin/bash

# Script to add BreadcrumbSchema to all location pages

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

  # Check if breadcrumb already added
  if grep -q "BreadcrumbSchema" "$file"; then
    echo "  Breadcrumb already added to $location, skipping..."
    continue
  fi

  # Add import for BreadcrumbSchema after locationData import
  sed -i '' '/import { locationData } from "@\/lib\/location-data";$/a\
import { BreadcrumbSchema } from "@/components/schema/breadcrumb-schema";
' "$file"

  # Get the city name for breadcrumb (capitalize first letter of each word)
  cityName=$(echo "$location" | sed 's/-/ /g' | sed 's/\b\(.\)/\u\1/g')

  # Add BreadcrumbSchema component after "return (" and before LocationPageSchema
  sed -i '' '/^  return ($/,/^      {\/\* Schema.org LocalBusiness Structured Data \*\/}$/{
    /^      {\/\* Schema.org LocalBusiness Structured Data \*\/}$/i\
      {/* Schema.org Breadcrumb Structured Data */}\
      <BreadcrumbSchema\
        items={[\
          { name: "Startseite", url: "" },\
          { name: "Standorte", url: "/standorte" },\
          { name: "'"$cityName"'", url: "/standorte/'"$location"'" },\
        ]}\
      />
  }' "$file"

  echo "  ✓ Added breadcrumb to $location"
done

echo "Done! Breadcrumb schema added to all location pages."
